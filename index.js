let searchBtn = document.getElementById("searchBtn");
let limit = document.getElementById("limit");
let searchDiv = document.getElementById("searchTerm");
var timer = null;

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    clearTimeout(timer);
    let radioSelection = document.querySelector('input[name="sortby"]:checked').value;
    let numLimit = limit.options[limit.selectedIndex].value;
    let searchTerm = searchDiv.value;

    //will only display if user has blank field in search bar and submits
    displayMessage(searchTerm, "Type something to search", "alert alert-danger");

}, false);

document.getElementById("searchTerm").addEventListener('input', function(e){
    if(e.target.value != ""){
        clearTimeout(timer);
        document.getElementById("messageDiv").style.display = "none";
    }
}, false);

function displayMessage(text, msg, className){
    let message = document.getElementById("messageDiv");
    var searchHasWords = false;
    if(text == ""){
        message.className = className;
        message.style.display = "block";
        message.innerHTML = msg;

        timer = setTimeout(function(){
            message.style.display = "none";
        }, 4000);
    }
}