

//var socket = io.connect("http://54.88.62.27/cgserver");
//const socket = io("http://54.88.62.27/cgserver")



 


let miCanvas = document.querySelector('#board_canvas');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;

let posicion = miCanvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;

miCanvas.width = screen.width;
miCanvas.height = screen.height;

document.querySelector('#board_canvas').setAttribute("width",screen.width*0.97);
document.querySelector('#board_canvas').setAttribute("height",screen.height *0.97);

var socket = io('http://54.88.62.27', {
  path: '/cgserver/socket.io',
});




let radius = miCanvas.height*0.2
let center_x = miCanvas.width/2;
let center_y = miCanvas.height/2;

data = {
    "difficulty": "",
    "type": "", 
    "center_x":0,
    "center_y":0,
    "radius":0,
    "posX": [], 
    "posY" :[],
    "time":[],
    "height": [],
    "width": [],
    "timestamp":[]
  };


  socket.on("send", (dt) => {
    console.log("JUEGO TERMINADO");
    console.log(dt)
    data["difficulty"] = dt["difficulty"]
    data["type"] = dt["type"]
    socket.emit("data",data);
  });


  data["center_x"] = center_x;
  data["center_y"] = center_y;
  data["radius"] = radius

  started = false
  saved = false
  tolerancia = (radius/5)**2
  

function eliminar_trazo(){
  if (!started) {

  lineas = [[]]
  
  let ctx = miCanvas.getContext('2d')
    // Estilos de linea


	  ctx.clearRect(0, 0, miCanvas.width, miCanvas.height)

    ctx.beginPath()
    ctx.arc(center_x,center_y,radius,0,(Math.PI/180)*360,false);
    ctx.strokeStyle = "rgba(83, 85, 95 ,0.75)";
    ctx.lineWidth = 10;
    lineas = [[]]
    ctx.stroke()     
    setTimeout(eliminar_trazo,1000)
  }
}
eliminar_trazo()




console.log(Math.cos(60* (180 / Math.PI)));

points = {
  A: {
    x: center_x+radius, 
    y: center_y
  },
  B: {
    x: center_x+radius*Math.cos(60* (180 / Math.PI)), 
    y: center_y+radius*Math.sin(60* (180 / Math.PI))
  },
  C: {
    x: center_x-radius*Math.cos(60* (180 / Math.PI)), 
    y: center_y+radius*Math.sin(60* (180 / Math.PI))
  },
  D: {
    x: center_x-radius,
    y: center_y
  },
  E: {
    x: center_x-radius*Math.cos(60* (180 / Math.PI)), 
    y: center_y-radius*Math.sin(60* (180 / Math.PI))
  },
  F: {
    x: center_x+radius*Math.cos(60* (180 / Math.PI)), 
    y: center_y-radius*Math.sin(60* (180 / Math.PI))
  }
}
console.log(points)
point_0 = "A"
point_1 = ""
points_complete = 0
points_complete2 = 0



function empezarDibujo () {
    pintarLinea = true;
    lineas.push([]);
};
  let ctx = miCanvas.getContext('2d')
    // Estilos de linea
 
    ctx.arc(center_x,center_y,radius,0,(Math.PI/180)*360,false);
    ctx.strokeStyle = "rgba(83, 85, 95 ,0.75)";
    ctx.lineWidth = 10;
    ctx.stroke();

experimento = []

function dibujarLinea (event) {
    event.preventDefault();
    if (pintarLinea && !started) {
        let ctx = miCanvas.getContext('2d')
        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        // Color de la linea
        ctx.strokeStyle = 'rgba(86, 173, 202,0.10)';
        // Marca el nuevo punto
        let nuevaPosicionX = 0;
        let nuevaPosicionY = 0;
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }

        trazo = {
            x: nuevaPosicionX,
            y: nuevaPosicionY
        }

          if (getDistance(trazo, points["A"])<tolerancia){
            point_1 = "A"
          }
          else if(getDistance(trazo,points["B"])<tolerancia){
            point_1= "B"
          }
          else if (getDistance(trazo, points["C"])<tolerancia){
            point_1 = "C"
          }
          else if(getDistance(trazo,points["D"])<tolerancia){
            point_1 = "D"
          }
          else if (getDistance(trazo, points["E"])<tolerancia){
            point_1 = "E"
          }
          else if(getDistance(trazo,points["F"])<tolerancia){
            point_1 =  "F"
          }
          else{
            point_1 = point_0
          }
        
          if (point_0!=point_1){
            if (point_0=="A" && getDistance(trazo,points["B"])<tolerancia){
                points_complete +=1
            }
            else if (point_0=="B" && getDistance(trazo,points["C"])<tolerancia){
                points_complete +=1
            }
            else if (point_0=="C" && getDistance(trazo,points["D"])<tolerancia){
                points_complete +=1
            }
            else if (point_0=="D" && getDistance(trazo,points["E"])<tolerancia){
                points_complete +=1
            }
            else if (point_0=="E" && getDistance(trazo,points["F"])<tolerancia){
                points_complete +=1
            }
            else if (point_0=="F" && getDistance(trazo,points["A"])<tolerancia){
                points_complete +=1
            }
            else{ 
              points_complete = 0
            }
            if (point_0=="A" && getDistance(trazo,points["F"])<tolerancia){
                points_complete2 +=1
            }
            else if (point_0=="F" && getDistance(trazo,points["E"])<tolerancia){
                points_complete2 +=1
            }
            else if (point_0=="E" && getDistance(trazo,points["D"])<tolerancia){
                points_complete2 +=1
            }
            else if (point_0=="D" && getDistance(trazo,points["C"])<tolerancia){
                points_complete2 +=1
            }
            else if (point_0=="C" && getDistance(trazo,points["B"])<tolerancia){
                points_complete2 +=1
            }
            else if (point_0=="B" && getDistance(trazo,points["A"])<tolerancia){
                points_complete2 +=1
            }
            else{ 
              points_complete2 = 0
            }
            
            point_0 = point_1
            if (points_complete >15 || points_complete2>15){
              start_experiment()
            }
          }
        lineas[lineas.length - 1].push(trazo);
        // Redibuja todas las lineas guardadas
          
          ctx.beginPath();
          experimento = lineas
          lineas.forEach(function (segmento) { 
            if (segmento.length>=1){
                ctx.moveTo(segmento[0].x, segmento[0].y);
                segmento.forEach(function (punto, index) {
                    ctx.lineTo(punto.x, punto.y);
                });
            }
          });
          ctx.stroke();
    }
}
function pararDibujar () {
    pintarLinea = false;
}

miCanvas.addEventListener('mousedown', empezarDibujo, false);
miCanvas.addEventListener('mousemove', dibujarLinea, false);
miCanvas.addEventListener('mouseup', pararDibujar, false);

// Eventos pantallas táctiles
miCanvas.addEventListener('touchstart', empezarDibujo, false);
miCanvas.addEventListener('touchmove', dibujarLinea, false);



start_time = time = null;

function move_handler(event) { 
  if (start_time == null){
    start_time = time = new Date().getTime()-0.01;

  }
  // console.log(time)4
  time_1 = new Date().getTime();
  time_delta = time_1 - time 


  time = time_1
  if   ((time_1 - start_time)<2*60*1000){
    data.posX.push(event.x)
    data.posY.push(event.y)
    data.time.push(time_1 - start_time)
    data.height.push(event.height)
    data.width.push(event.width)
    data.timestamp.push(event.timeStamp)
  }
  else if(saved==false){
     save()
     saved = true
  }


}




filename = "p_ts_"+Date.now()+".json"


function save_internal() {
	data["time"][0] = 0
	end_time = new Date().getTime();
	console.log(end_time - start_time)
	console.log(data)
  
  var json_data = JSON.stringify(data);

  var element = document.createElement('a');
  
  element.style.display = 'none';
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json_data) );

  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element)
}



function getDistance(pos1, point){

  return ((pos1.x-point.x)**2 + (pos1.y-point.y)**2)
}
function start_experiment(){
  started= true
  socket.emit("start_game",true);
  console.log("hey")

  el.onpointermove = move_handler; //movimiento
  var ctx = miCanvas.getContext("2d");
	ctx.clearRect(0, 0, miCanvas.width, miCanvas.height);
  ctx.strokeStyle = "#e8eef0";
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(86, 173, 202, 0)"

}  

let el = document.querySelector('#board_canvas');





