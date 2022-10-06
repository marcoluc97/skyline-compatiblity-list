const searchbar = document.querySelector('.searchbar')
const searchok = document.querySelector('.searchbutton')
const listcontainer = document.querySelector('.gamelistcontainer')

var appender = '<div class="gamelistcontainer"> <div class="gamecontainer"> <p class="gametitle">PC Building Simulator</p> <p class="gamedate">15:00 5 Oct</p> <div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="ingame">status-ingame</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> <p class="labels" id="ingame">status-ingame</p> </div> </div> </div>'

function loadissues() {
    i = 1;
    var responseObj = JSON.parse(this.responseText);
    listcontainer.innerHTML = "";
    responseObj.items.forEach(element => {
        if(!element.labels[0]){
            return
        }
        listcontainer.innerHTML += `<div class="gamecontainer"> <a class="gametitle" href="${element.html_url}" target="_blank">${element.title}</a><div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="${element.labels[0].name}">${element.labels[0].name}</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> <p class="labels" id="${element.labels[0].name}">${element.labels[0].name}</p> </div> </div>`
        console.log(element)
    });
}

searchok.addEventListener('click', function(e){
    if(!searchbar.value){
        return
    }else{
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()
    }
})

var request = new XMLHttpRequest();
request.onload = loadissues; 
request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
request.send()