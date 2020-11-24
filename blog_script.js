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