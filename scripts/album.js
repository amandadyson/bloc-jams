// Example Album; in a real-world example we'd pull this info from a database
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// A third example album
var albumFogust = {
    title: 'Fogust',
    artist: 'San Francisco',
    label: 'Fog City',
    year: '1776',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Fogust', duration: '1:01' },
        { title: 'Carl the Fog', duration: '5:01' },
        { title: 'Fog Rolling In', duration: '3:21'},
        { title: 'Cold Summer', duration: '3:14' },
    ]
};

//createSongRow functions assigns song row template to a variable named template and returns it; function takes song number, name, length as arguments and populates the song row template accordingly
var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' // allows us to access data held in the attribute using DOM methods when the mouse leaves the table row; the song number's table cell returns to original state
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    return template;
};

//moved this to the global scope
// select all html elements required to display: title, artist, release info, image, and song list; in order to populate these with info we assign corresponding values of the album objects' properties to the html elements
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

//function that the program calls when the window loads; will utilize the object's stored info by injecting it into the template
var setCurrentAlbum = function(album) {

    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // set the value to an empty string to ensure we're working with a clean slate
    albumSongList.innerHTML = '';

    // go through all the songs and insert them into the html using the innerHTML property; the createSongRow function is called at each loop, passing in the info arguments from our album object
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};

//the parent needs to be selected so the other actions can take place; keep traversing the DOM upward until a parent with a specified class name is found
var findParentByClassName = function(element, targetClass) {
  var currentParent = element.parentElement;
  if (currentParent) {
    while (currentParent.className && currentParent.className != targetClass) {
      currentParent = currentParent.parentElement;
    }
    if (currentParent.className == targetClass) {
        return currentParent;
    } else {
      alert("No parent with that class name found.");
    }
  } else {
      alert("No parent found.");
    }
};

//always return the song item
var getSongItem = function(element) {
  //uses a switch statement to return element with the .song-item-number class
  switch(element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, 'song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-duration':
      return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
    }
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

//elements we're adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');


// album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);

songListContainer.addEventListener('mouseover', function(event) {
    // target stores the DOM element where the event occured
    // Only target individual song rows during event delegation
  if (event.target.parentElement.className === 'album-view-song-item') {
    var songItem = getSongItem(event.target);

    //only changes innerHTML of cell when element doesn't belong to currently playing song
    if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
    songItem.innerHTML = playButtonTemplate;
    }
  }
});

//loops over each table row to add event listener
for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {

      //cache song item we're leaving in a var
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      //checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't
      if (songItemNumber !== currentlyPlayingSong) {
          songItem.innerHTML = songItemNumber;
      }
    });

songRows[i].addEventListener('click', function(event) {
     clickHandler(event.target);
});

}

//gives easy access to using array index numbers
var albums = [albumPicasso, albumMarconi, albumFogust];

//sets the default value; here, it's the first one that will display on the click event; needs to be declared outside of the function so that when it increases by one that state is remembered and carries over to the next click event
var index = 1;

albumImage.addEventListener('click', function(event) {
    setCurrentAlbum(albums[index]);
    index++; //add 1 with each click to the index variable; the order of this is important
    if (index == albums.length) { //reset once we reach the end of all of the albums
      index = 0;
    }
  });
};
