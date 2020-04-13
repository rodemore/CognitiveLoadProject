

// ID DEL PARTICIPANTE
let participant = "p2";
//TIEMPO DE DURACIÓN DE CADA PLANTILLAS EN SEGUNDOS
seconds = 120









//
testing_n = -1
//var socket = io.connect("https://54.88.62.27/cgserver/");
//const socket = io("http://54.88.62.27/cgserver/")

var socket = io('http://54.88.62.27', {
  path: '/cgserver/socket.io',
});
/**
var socket = io('http://54.88.62.27', {
  path: '/cgserver/',
});
 */

let template_n = 0
ex_n = 1


function press(e) {
    console.log(e)
    if (e.keyCode === 13 && !e.shiftKey && testing_n==-1) {
        if (ex_n ==1){
            template_n = 0;
        }
        start()
    }
    else if (e.key == "p"){
        testing_n = 0
        testingExercises();
        document.getElementById("Body").onkeydown = press
    }
    else if (e.key =="E" && testing_n==-1){
        template_n = 0
        start()

    }
    else if (e.key == "H" && testing_n==-1){
        template_n = 1
        start()
    }
    else if (e.key == "ArrowRight" && testing_n>=0 && testing_n<3){
        testing_n +=1
        testingExercises();
    }
    else if(e.key == "ArrowRight" && testing_n ==3) {
        testing_n = -1;
        if (type == "numeric"){
            document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg"> <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta Comparaciones Numéricas</h3><div><button id="btn" onclick="start()" >Round 1</button></div></body>'
        }       
      
        else if (type == "sequences"){
            document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg"> <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta Secuencias</h3><div><button id="btn" onclick="start()" >Round 1</button></div></body>'
        }
        else if (type == "verbal"){
            document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg"> <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta Palabras</h3><div><button id="btn" onclick="start()" >Round 1</button></div></body>'
        }

    }
    else if (e.key == "ArrowLeft" && testing_n>=1 && testing_n<4){
        testing_n -=1
        testingExercises();
    }
    else if (e.key == "N"){
        if (ex_n==1){
            nextDifficulty()
            ex_n = 2;
        }
        else {
            finishGame();
        }
    }
    else if(e.key == "S"){
        send_data()
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

}

function start() {
    document.getElementById("btn").remove()
    document.getElementById("titleLabel").setAttribute("id", "number")
    startGame();
}

function updateClock(n) {
    document.getElementById('number').textContent = n;
    if (n == 0) {
        document.getElementById('number').textContent = "";
        startGame();
    } else {
        n -= 1;
        setTimeout(`updateClock(${n})`, 1000);
    }
}
function startGame() {
    document.getElementById('Body').innerHTML = `<img id = "image" src="resources/${templates[template_n]}">`;
   
    setTimeout(() => {
            document.getElementById("image").setAttribute("class","imageF") 
        }, seconds*1000);

}

function nextDifficulty(){
    if (template_n==0)
        template_n = 1
    else 
        template_n = 0
    if (type == "numeric"){
        document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg">  <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta Comparaciones Numéricas</h3><div><button id="btn" onclick="start()" >Round 2</button></div></body>'
    }
    else if (type == "sequences"){
        document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg">  <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta Secuencias</h3><div><button id="btn" onclick="start()" >Round 2</button></div></body>'
    }
    else if (type == "verbal"){
        document.getElementById('Body').innerHTML = '<body id="Body" background="resources/background/background.jpg">  <div id="flag_div"><img src="resources/flag.png" id="flag_disabled"></div><h3 id="titleLabel">Cuenta palabras</h3><div><button id="btn" onclick="start()" >Round 2</button></div></body>'
    }
    
}

function finishGame(){
    if (type == "numeric"){
        window.open("sequences.html", "_self")
    }
    else if (type == "sequences"){
        window.open("verbal.html", "_self")
    
    }
}


function testingExercises(){
    console.log("Testing")
    document.getElementById('Body').innerHTML = `<img id = "image" src="resources/${testing_exercises[testing_n]}">`;
    
}


function send_data(){
    socket.emit("send_data", {
        type: type,
        difficulty: template_n
        
    });

}


socket.on("save_data", (data) => {
    console.log("SaveData")

    filename = participant+"_"+data.type + "_" +data.difficulty +"_"+ +Date.now()+".json"
      end_time = new Date().getTime();
      var json_data = JSON.stringify(data);
    
      var element = document.createElement('a');
      
      element.style.display = 'none';
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json_data) );
    
      element.setAttribute("download", filename);
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element)
  
  
    });
    
socket.on("start_game",(data) =>{
    console.log("GAME")
     let flag = document.getElementById("flag_disabled")
     flag.setAttribute("id", "flag_actived")
});



