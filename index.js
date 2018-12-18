import reddit from './redditapi';

let searchBtn = document.getElementById("searchBtn");
let limit = document.getElementById("limit");
let searchDiv = document.getElementById("searchTerm");
var timer = null;

searchBtn.addEventListener("click", function(e){
    checkForTextInSearchBar();
    e.preventDefault();
    clearTimeout(timer);
    let radioSelection = document.querySelector('input[name="sortby"]:checked').value;
    let numLimit = limit.options[limit.selectedIndex].value;
    let searchTerm = searchDiv.value;

    //will only display if user has blank field in search bar and submits
    displayMessage(searchTerm, "Type something to search", "alert alert-danger");

    reddit.search(searchTerm, numLimit, radioSelection).then(results => {
        console.log(results);

        let output = "<div class='card-columns card-columns-custom'>";
        let image = "https://fh-uploads-hzscjv5a1k85do6fzz7kdmffiwhxul5bcoakysrttzf.netdna-ssl.com/582ab36d-a58b-449e-8e57-784dea3eeb09";

        for(var i = 0; i<numLimit; i++){
            if(results[i].preview){
                image = results[i].preview.images[0].source.url;
            }
            output += `<div class="card card-custom" style="width: 18rem;">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${results[i].title}</h5>
                    <p class="card-text">${shortenText(100, results[i].selftext)}</p>
                    <a href="${results[i].url}" class="btn btn-primary">Read More</a>
                </div>
            </div>`
        }

        output += "</div>";
        document.getElementById("results").innerHTML = output;
    });

}, false);

function shortenText(max, text){
    if(text.length >= max){
        return text.substr(max, text.length).indexOf(" "); 
    }else if(text.length < max || text == ""){
        return text;
    }      
}

function checkForTextInSearchBar(){
    document.getElementById("searchTerm").addEventListener('input', function(e){
        if(e.target.value != ""){
            clearTimeout(timer);
            document.getElementById("messageDiv").style.display = "none";
        }
    }, false);
}

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