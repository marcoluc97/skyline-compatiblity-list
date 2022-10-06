const searchbar = document.querySelector('.searchbar')
const searchok = document.querySelector('.searchbutton')
const listcontainer = document.querySelector('.gamelistcontainer')

//var appender = '<div class="gamelistcontainer"> <div class="gamecontainer"> <p class="gametitle">PC Building Simulator</p> <p class="gamedate">15:00 5 Oct</p> <div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="ingame">status-ingame</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> <p class="labels" id="ingame">status-ingame</p> </div> </div> </div>'

function loadissues() {
    var responseObj = JSON.parse(this.responseText);
    listcontainer.innerHTML = "";
    responseObj.items.forEach(element => {
        i = 1;
        var labels = "";
        if(!element.labels[0]){
            listcontainer.innerHTML += `<div class="gamecontainer"> <a class="gametitle" href="${element.html_url}" target="_blank">${element.title}</a><div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="nothing">no-status</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> <p class="labels" id="regression">regression</p> <p class="labels" id="services">services</p> </div> </div>`
            return
        }
        element.labels.forEach(label => {
            if(!element.labels[1]){
                labels += `<p class="labels" id="nothing">none</p>`
            }
            if(label.name == "status-nothing" || label.name == "status-ingame" || label.name == "status-playable" || label.name == "status-boots"){
                return
            }
            labels += `<p class="labels" id="${label.name}">${label.name}</p>`
        })
        listcontainer.innerHTML += `<div class="gamecontainer"> <a class="gametitle" href="${element.html_url}" target="_blank">${element.title}</a><div class="gameinfocontainer"> <p class="gamestatustitle">Status:</p> <p class="gamestatus" id="${element.labels[0].name}">${element.labels[0].name}</p> </div> <div class="extralabels"> <p class="extralabelstitle">Labels:</p> ${labels} </div> </div>`
        console.log(element)
    });
}

searchok.addEventListener('click', function(e){
    if(!searchbar.value){
        return
    }else{
        var request = new XMLHttpRequest();
        request.onload = loadissues; 
        request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
        request.send()
       /*  label:status-nothing+ */
    }
})

var request = new XMLHttpRequest();
request.onload = loadissues; 
request.open('get', `https://api.github.com/search/issues?q=${searchbar.value.split(' ').join('+')}state:open+in:title+repo:skyline-emu/skyline-games-list&per_page=100`, true)
request.send()