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

     var $row = $(template);

     var clickHandler = function() {

	var songNumber = $(this).attr('data-song-number');

	if (currentlyPlayingSong !== null) {
    		// Revert to song number for currently playing song because user started playing new song.
    		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    		currentlyPlayingCell.html(currentlyPlayingSong);
  	 }
  	  if (currentlyPlayingSong !== songNumber) {
    		// Switch from Play -> Pause button to indicate new song is playing.
    		$(this).html(pauseButtonTemplate);
    		currentlyPlayingSong = songNumber;
  	  }  else if (currentlyPlayingSong === songNumber) {
    		// Switch from Pause -> Play button to pause currently playing song.
    		$(this).html(playButtonTemplate);
    		currentlyPlayingSong = null;
  	 }
  };

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSong) {
             songNumberCell.html(playButtonTemplate);
         }
     };

     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = songNumberCell.attr('data-song-number');

         if (songNumber !== currentlyPlayingSong) {
             songNumberCell.html(songNumber);
         }
     };

     //find() method finds the element with .song-item-number class contained in whichever row is clicked
     $row.find('.song-item-number').click(clickHandler);
     //for mousing over or leaving $row
     $row.hover(onHover, offHover);
     return $row;
};

//call jQuery's text() method to replace the content of the text nodes, instead of setting firstChild.nodeValue
$albumTitle.text(album.title);
$albumArtist.text(album.artist);
$albumReleaseInfo.text(album.year + ' ' + album.label);
$albumImage.attr('src', album.albumArtUrl);

//function that the program calls when the window loads; will utilize the object's stored info by injecting it into the template
var setCurrentAlbum = function(album) {

  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumSongList.empty();

    // go through all the songs and insert them into the html using the innerHTML property; the createSongRow function is called at each loop, passing in the info arguments from our album object
  for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
    }
};

// album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
});

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
