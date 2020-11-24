var newPostClicked = false;
var numDivs = 0;
var theFinalID;
var theFinalClass;

function submitPost() {
    console.log("working");
}

function createPost(element) {
    newPostClicked = !newPostClicked;
    if (newPostClicked == true) {
        $('<div id ="newPost" class="card20">\
        <br>\
        <input type="text" name="articleTitle" class="articleTitle" placeholder="Article Title">\
        <br>\
        <br>\
        <textarea name="paragraphText" class="paragraphText" cols="50" rows="10" placeholder="Blog Text"></textarea>\
        <br>\
        <br>\
        <button type="button" id="submitPost" onclick="submitPost()">Submit Post</button>\
        <div>').insertAfter("#submit-button"); 
    }   
    else {
        $(".card20").remove();
    }
}

function submitTitle() {
    var title = $(".blogName").val();
    $(".blogName").val(""); 
    console.log(title);
    $(".blogTitle").html(title);
}

function submitAbout() {
    var about = $(".aboutText1").val();
    $(".aboutText1").val(""); 
    console.log(about);
    $(".submitAbout").html(about);
    document.getElementById("card").style.wordWrap = "break-word";
}

function submitFollow() {
    var follow = $(".followInput").val();
    $(".followInput").val(""); 
    console.log(follow);
    $(".followText").html(follow);
}