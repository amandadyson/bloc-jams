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

//elements we're adding listeners to
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];

var songRows = document.getElementsByClassName('album-view-song-item');


// album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

window.onload = function() {
    setCurrentAlbum(albumPicasso);

songListContainer.addEventListener('mouseover', function(event) {
    // target stores the DOM element where the event occured
    // Only target individual song rows during event delegation
  if (event.target.parentElement.className === 'album-view-song-item') {
    // Change the content from the number to the play button's HTML
    //use the querySelector method because we only need to return a single element with the song-item-number class
    event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
  }
});

//loops over each table row to add event listener
for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
      // Selects first child element, which is the song-item-number element
      this.children[0].innerHTML = this.children[0].getAttribute('data-song-number'); //will change back to the song number using the value obtained from getting the attribute of data-song-number
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
