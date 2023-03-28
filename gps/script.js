let placesList = {
    names:[
    "аэропорт южный", 
    "вокзал центральный", 
    "горнолыжный курорт", 
    "грузовой порт", 
    "дом бабы-яги", 
    "живописный мост", 
    "ледовая арена", 
    "маяк", 
    "озеро чистое", 
    "остров сердитый",
    "парк", 
    "причал", 
    "электродепо центральное", 
    "электродепо южное",
    ],
    point:null,
    points:[
      {x:1504, y:1358, url:"images/objs/airport.png"},
      {x:1169, y:928, url:"images/objs/railway.png"},
      {x:756, y:862, url:"images/objs/ski.png"},
      {x:698, y:529, url:"images/objs/port.png"},
      {x:1367, y:1455, url:"images/objs/bayaga.png"},
      {x:576, y:859, url:"images/objs/bridge.png"},
      {x:995, y:961, url:"images/objs/stadium.png"},
      {x:1025, y:1528, url:"images/objs/mayak.png"},
      {x:975, y:638, url:"images/objs/lake.png"},
      {x:1603, y:413, url:"images/objs/land.png"},
      {x:1020, y:899, url:"images/objs/park.png"},
      {x:1069, y:1067, url:"images/objs/prichal.png"},
      {x:949, y:965, url:"images/objs/trainc.png"},
      {x:1366, y:1481, url:"images/objs/trainy.png"}
    ],
    currPoint:-1,
    titleContent:[
      "Развернуть список",
      "Свернуть список"
    ],
    titleFirst:true,
    listClosed:true,
    list:null,
    switchList: function(){
      if(placesList.list == null){return;}
      let arw = document.getElementsByClassName("arrow");
      for(let i = 1; i < placesList.list.length; i++){
        if(placesList.listClosed && !placesList.list[i].classList.contains("map-hidden")){
          placesList.list[i].classList.toggle("map-hidden")
        }
        if(!placesList.listClosed && placesList.list[i].classList.contains("map-hidden")){
          placesList.list[i].classList.toggle("map-hidden")
        }
        placesList.list[i].classList.toggle("map-hidden");
      }
      for (let i = 0; i < arw.length; i++){
        arw[i].classList.toggle("map-hidden");
      }
      if(placesList.titleFirst){
        document.getElementById("listTitle").innerHTML = placesList.titleContent[1];
        placesList.titleFirst = false;
      }
      else{
        document.getElementById("listTitle").innerHTML = placesList.titleContent[0];
        placesList.titleFirst = true;
      }
      placesList.listClosed = !placesList.listClosed
    },
    turnListOn: function(){
      document.getElementById("mapPlacesHead").addEventListener("click", placesList.switchList);
      placesList.list = document.getElementsByClassName("map-places__card");
      placesList.point = document.getElementById("point");
      for(let i = 1; i < placesList.list.length; i++){
        placesList.list[i].addEventListener("click", placesList.toPoint, false);
        placesList.list[i].param = i - 1;
      }
    },
    toPoint: function(event){
      if(event.currentTarget.param != undefined){
        placesList.point.style = "transform: translate(" + 
      placesList.points[event.currentTarget.param].x + "px, " 
      + placesList.points[event.currentTarget.param].y + "px);" +
      "z-index:2";
      if(placesList.point.firstChild != undefined){
        document.getElementById("pointimg").src = 
        placesList.points[event.currentTarget.param].url;
      }
      if(map != null){
        map.moveToCoords([placesList.points[event.currentTarget.param].x, 
        placesList.points[event.currentTarget.param].y]);
      }
      document.getElementById("pointtext").innerHTML = placesList.names[event.currentTarget.param].toUpperCase();
      }
    },
    findPlace: function(){
      let ask = document.getElementById("search").value;
      mas = [];
      for (let i = 0; i < placesList.names.length; i++){
        if(placesList.names[i].includes(ask.toLowerCase())){
            if(placesList.list[i + 1].classList.contains("map-hidden"))
            {
              placesList.list[i + 1].classList.toggle("map-hidden");
            }
          }
          else{
            if(!placesList.list[i + 1].classList.contains("map-hidden"))
            {
              placesList.list[i + 1].classList.toggle("map-hidden");
            }
          }
      }
    },
    clearSearch: function(){
      document.getElementById("search").value = "";
    }
  }
let map = {
  mapBg:null,
  container:null,
  lastMove:null,
  isInAnim:false,
  phone:[0,0],
  l_x: 0,
  l_y: 0,
  s_x: 164,
  s_y: 281,
  onClkOrTouchDown: function(event){
    if(event.clientX){
      map.s_x = event.clientX;
      map.s_y = event.clientY;
      map.container.addEventListener("mousemove", map.move);
    }
    else if(event.targetTouches){
      map.s_x = event.targetTouches[0].clientX;
      map.s_y = event.targetTouches[0].clientY;
      map.container.addEventListener("touchmove", map.move);
    }
  },
  onClkOrTouchUp: function(event){
    if(event.clientX){
      map.l_x = event.clientX - map.s_x + map.l_x;
      map.l_y += event.clientY - map.s_y;
      map.container.removeEventListener("mousemove", map.move);
    }
    else if(event.targetTouches){
      if(map.lastMove != null){
        map.l_x = map.lastMove.clientX - map.s_x + map.l_x;
        map.l_y += map.lastMove.clientY - map.s_y;
        map.container.removeEventListener("touchmove", map.move);
        map.lastMove = null;
      }
    }
    // console.log("X:"+ event.clientX + " - " + map.l_x + " = " + (event.clientX - map.l_x));
    // console.log("Y:"+ event.clientY + " - " + map.l_y + " = " + (event.clientY - map.l_y));
    map.checkBorder();
    map.container.removeEventListener("mouseout", map.onOut);
  },
  finalOnClkUp:function(event){
    map.checkBorder();
    map.container.addEventListener("mouseup", map.onClkOrTouchUp);
    map.container.removeEventListener("mouseout", map.onOut);
    document.removeEventListener("mouseup", map.finalOnClkUp);
  },
  onResizing:function(){
    map.phone = [map.container.clientWidth, map.container.clientHeight];
  },
  move: function (event){
    if(event.clientX){
      map.mapBg.style = "transform: translate("+ 
      (event.clientX - map.s_x + map.l_x)+"px, " 
      + (event.clientY - map.s_y + map.l_y)+"px);";
    }
    if(event.targetTouches){
      map.lastMove = event.targetTouches[0];
      map.mapBg.style = "transform: translate("+ 
      (event.targetTouches[0].clientX - map.s_x + map.l_x)+"px, " 
      +(event.targetTouches[0].clientY - map.s_y + map.l_y)+"px);";
    }
  },
  moveToCoords: function(coords){
    let delta_x = -(coords[0] - map.phone[0] / 2) - map.l_x;
    let delta_y = -(coords[1] - map.phone[1] / 2) - map.l_y;
    map.l_x = -(coords[0] - map.phone[0] / 2);
    map.l_y = -(coords[1] - map.phone[1] / 2);
    map.animate({
      duration: 200,
      timing(timeFraction) {
        return (1 - timeFraction);
      },
      draw(progress) {
        let c_x = 0;
        let c_y = 0;
        c_x = Math.max(Math.min((map.l_x - delta_x * progress), 0), 
        -map.mapBg.clientWidth + map.phone[0]);
        c_y = Math.max(Math.min((map.l_y - delta_y * progress), 0), 
        -map.mapBg.clientHeight + map.phone[1]);
        map.mapBg.style = "transform: translate( " + c_x + "px, " + c_y + "px);";
      }
    });
  },
  checkBorder: function(){
    let delta_x = 0;
    let delta_y = 0;
    if(map.l_x > 0){
      delta_x = -map.l_x;
      map.l_x = 0;
    }
    if(map.l_x < -map.mapBg.clientWidth + map.phone[0]){
      delta_x = -map.l_x - map.mapBg.clientWidth + map.phone[0];
      map.l_x = -map.mapBg.clientWidth + map.phone[0];
    }
    if(map.l_y > 0){
      delta_y = -map.l_y;
      map.l_y = 0;
    }
    if(map.l_y < -map.mapBg.clientHeight + map.phone[1]){
      delta_y = -map.l_y - map.mapBg.clientHeight + map.phone[1];
      map.l_y = -map.mapBg.clientHeight + map.phone[1];
    }
    map.animate({
      duration: 100,
      timing(timeFraction) {
        return (1 - timeFraction);
      },
      draw(progress) {
        map.mapBg.style = "transform: translate( " + 
        (map.l_x - delta_x * progress) + "px, " + 
        (map.l_y - delta_y * progress) + "px);";
      }
    });
  },
  animate: function({duration, draw, timing}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      let progress = timing(timeFraction)

      draw(progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

    });
  },
  Init: function(){
    map.container = document.querySelector(".map-body__container");
    map.mapBg = document.querySelector(".bmap");
    map.phone = [map.container.clientWidth, map.container.clientHeight];
    if(map.mapBg != null && map.phone != null){
      map.l_x = -1024 + map.phone[0] / 2;
      map.l_y = -1024 + map.phone[1] / 2;
      map.mapBg.style = "transform: translate( " + map.l_x + "px, " + map.l_y + "px);";
    }
    map.container.addEventListener("mousedown", map.onClkOrTouchDown);
    map.container.addEventListener("touchstart", map.onClkOrTouchDown);
    map.container.addEventListener("mouseup", map.onClkOrTouchUp);
    map.container.addEventListener("touchend", map.onClkOrTouchUp);
    window.addEventListener("resize", map.onResizing);
  }
}

window.addEventListener("load", placesList.turnListOn);
window.addEventListener("load", map.Init);