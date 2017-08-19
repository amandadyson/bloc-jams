window.onload = function() {

    // select first element with album-covers class name and assign it to a variable named collectionContainer
    var collectionContainer = document.getElementsByClassName('album-covers')[0];

    // assign empty string to cc's innerHTML property to clear its content to ensure we have a clean slate
    collectionContainer.innerHTML = '';

    // the for loop inserts 12 albums; += appends content to strings; each loop adds contents of the template (collectionItemTemplate) to the innerHTML of cc... generating albums on the page
    for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
};
