var forEach = function(array, callback) {  //in a for each, needs 2 arguments: one for the array and one for the callback/what to return
  //use a loop to go through all elements in the points array
  for (var i = 0; i < array.length ; i++) {
      //execute a callback for each element
      callback(array[i]); //the callback function is what we want to happen to each element in the array; utilized in landing.js
  }
};
