var newPostClicked = false;
var numDivs = 0;
var theFinalID;
var theFinalClass;

function submitPost() {
    newPostClicked = false;
    var articleName = $(".articleTitle").val();
    var paragraphInput = $(".paragraphText").val();
    var theDate1 = Date();
    var theDate2 = Date.parse();
    theFinalID = "#" + theDate2;
    $(".articleTitle").val("");
    $(".paragraphText").val("");
    var articleTitle = $("<h2>");
    var theDate = $("<h5>");
    var paragraphText = $("<p>");
    var delete1 = $('<button>');
    delete1.attr("type", "button");
    $(delete1).attr("id", theDate2);
    delete1.text("Delete Button");
    $(delete1).click(deletePost);
    $(articleTitle).html(articleName);
    $(theDate).html(theDate1);
    $(paragraphText).html(paragraphInput);
    $(articleTitle).attr("id", theDate2);
    $(theDate).attr("id", theDate2);
    $(paragraphText).attr("id", theDate2);
    $(paragraphText).attr("class", theDate2);
    var className = $(paragraphText).attr('class');
    console.log(className);
    theFinalClass = "." + theDate2;
    $("#newPost").after(delete1);
    $("#newPost").after(paragraphText);
    $("#newPost").after(theDate);
    $("#newPost").after(articleTitle);
    $(".card20").remove(); 
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

function deletePost() {
    console.log("working");
}