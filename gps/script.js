let placesList = {
  places:[
    {
        name : "аэропорт южный",
        coords : {
            x : 1504,
            y : 1358
        },
        icon : "images/objs/airport.png"
    },
    {
        "name" : "вокзал центральный",
        coords : {
            x : 1169,
            y : 928
        },
        icon : "images/objs/railway.png"
    },
    {
        "name" : "горнолыжный курорт",
        coords : {
            x : 756,
            y : 862
        },
        icon : "images/objs/ski.png"
    },
    {
        "name" : "грузовой порт",
        coords : {
            x : 698,
            y : 529
        },
        icon : "images/objs/port.png"
    },
    {
        "name" : "дом бабы-яги",
        coords : {
            x : 1367,
            y : 1455
        },
        icon : "images/objs/bayaga.png"
    },
    {
        "name" : "живописный мост",
        coords : {
            x : 576,
            y : 859
        },
        icon : "images/objs/bridge.png"
    },
    {
        "name" : "ледовая арена",
        coords : {
            x : 995,
            y : 961
        },
        icon : "images/objs/stadium.png"
    },
    {
        "name" : "маяк",
        coords : {
            x : 1025,
            y : 1528
        },
        icon : "images/objs/mayak.png"
    },
    {
        "name" : "озеро чистое",
        coords : {
            x : 975,
            y : 638
        },
        icon : "images/objs/lake.png"
    },
    {
        "name" : "остров сердитый",
        coords : {
            x : 1603,
            y : 413
        },
        icon : "images/objs/land.png"
    },
    {
        "name" : "парк",
        coords : {
            x : 1020,
            y : 899
        },
        icon : "images/objs/park.png"
    },
    {
        "name" : "причал",
        coords : {
            x : 1069,
            y : 1067
        },
        icon : "images/objs/prichal.png"
    },
    {
        "name" : "электродепо центральное",
        coords : {
            x : 949,
            y : 965
        },
        icon : "images/objs/trainc.png"
    },
    {
        "name" : "электродепо южное",
        coords : {
            x : 1366,
            y : 1481
        },
        icon : "images/objs/trainy.png"
    }
  ],
  point:null,
  titleContent:[
    "Развернуть список",
    "Свернуть список"
  ],
  listClosed:true,
  list:null,
  menu : null,
  m_points : null,
  switchList: function(){
    if(placesList.list == null){return;}
    for(let i = 1; i < placesList.list.length; i++){
      if(placesList.listClosed && !placesList.list[i].classList.contains("map-hidden")){
        placesList.list[i].classList.toggle("map-hidden");
      }
      if(!placesList.listClosed && placesList.list[i].classList.contains("map-hidden")){
        placesList.list[i].classList.toggle("map-hidden");
      }
      placesList.list[i].classList.toggle("map-hidden");
    }
    placesList.switchListTitle();
    
  },
  switchListTitle: function(){
    let arw = document.getElementsByClassName("arrow");
    for (let i = 0; i < arw.length; i++){
      arw[i].classList.toggle("map-hidden");
    }
    if(placesList.listClosed){
      document.getElementById("listTitle").innerHTML = placesList.titleContent[1];
      if(placesList.list[0].classList.contains("map-places-lsthd")){
        placesList.list[0].classList.toggle("map-places-lsthd");
      }
    }
    else{
      document.getElementById("listTitle").innerHTML = placesList.titleContent[0];
      if(!placesList.list[0].classList.contains("map-places-lsthd")){
        placesList.list[0].classList.toggle("map-places-lsthd");
      }
    }
    placesList.listClosed = !placesList.listClosed;
  },
  toPoint: function(event){
    if(event.currentTarget.param != undefined){
      let p = event.currentTarget.param;
      let off = map.scrSize[1]*0.175;
      placesList.point.style = "transform: translate(" + placesList.places[p].coords.x + "px, " + (placesList.places[p].coords.y - off) + "px);" + "z-index:2";
    if(placesList.point.firstChild != undefined){
      document.getElementById("pointimg").src = 
      placesList.places[p].icon;
    }
    if(map != null){
      map.moveToCoords([placesList.places[p].coords.x, 
      placesList.places[p].coords.y]);
    }
    document.getElementById("pointtext").innerHTML = placesList.places[p].name.toUpperCase();
    }
  },
  findPlace: function(){
    let ask = document.getElementById("search").value;
    let res = false;
    if(ask.split(' ').join('') == ''){
      return;
    }
    for (let i = 0; i < placesList.places.length; i++){
      if(placesList.places[i].name.includes(ask.toLowerCase())){
          if(placesList.list[i + 1].classList.contains("map-hidden"))
          {
            placesList.list[i + 1].classList.toggle("map-hidden");
          }
          res = true;
        }
        else{
          if(!placesList.list[i + 1].classList.contains("map-hidden"))
          {
            placesList.list[i + 1].classList.toggle("map-hidden");
          }
        }
    }
    if(res && placesList.listClosed){
      placesList.switchListTitle();
    }
    if(!res && !placesList.listClosed){
      placesList.switchListTitle();
    }
  },
  clearSearch: function(){
    document.getElementById("search").value = "";
  },
  openMenu : function(){
    if(placesList.menu != null && placesList.menu.classList.contains("map-hidden")){
      placesList.menu.classList.toggle("map-hidden");
    }
  },
  closeMenu : function(){
    if(placesList.menu != null && !placesList.menu.classList.contains("map-hidden")){
      placesList.menu.classList.toggle("map-hidden");
    }
  },
  resetPoint : function(){
    placesList.point.style = "top: 20vh; left: 10vh; z-index:-1";
  },
  turnListOn: function(){
    document.getElementById("mapPlacesHead").addEventListener("click", placesList.switchList);
    placesList.list = document.getElementsByClassName("map-places__card");
    placesList.m_points = document.getElementsByClassName("map-point-d");
    placesList.point = document.getElementById("point");
    if(placesList.point){
      placesList.point.addEventListener("click", placesList.resetPoint, false);
    }
    for(let i = 1; i < placesList.list.length; i++){
      placesList.list[i].addEventListener("click", placesList.toPoint, false);
      placesList.list[i].param = i - 1;
    }
    if(placesList.list.length - 1 == placesList.m_points.length){
      for(let i = 0; i < placesList.m_points.length; i++){
        placesList.m_points[i].addEventListener("click", placesList.toPoint, false);
        placesList.m_points[i].param = i;
      }
    }
    placesList.menu = document.querySelector(".map-body__menu-cntnt");
  }
}
let map = {
  menu:null,
  mapBg:null,
  container:null,
  lastMove:null,
  scrSize:[0,0],
  l_x: 0,
  l_y: 0,
  s_x: 0,
  s_y: 0,
  onClkOrTouchDown: function(event){
    if(event.clientX){
      map.s_x = event.clientX;
      map.s_y = event.clientY;
      if(!event.target.classList.contains("map-img")){
        return;
      }
      map.container.addEventListener("mousemove", map.move);
    }
    else if(event.targetTouches){
      map.s_x = event.targetTouches[0].clientX;
      map.s_y = event.targetTouches[0].clientY;
      if(!event.target.classList.contains("map-img")){
        return;
      }
      map.container.addEventListener("touchmove", map.move);
    }
  },
  onClkOrTouchUp: function(event){
    if(!event.target.classList.contains("map-img")){
      return;
    }
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
    map.scrSize = [map.container.clientWidth, map.container.clientHeight];
  },
  move: function (event){
    if(event.clientX){
      map.mapBg.style = "transform: translate("+ (event.clientX - map.s_x + map.l_x)+"px, " + (event.clientY - map.s_y + map.l_y)+"px);";
    }
    if(event.targetTouches){
      map.lastMove = event.targetTouches[0];
      map.mapBg.style = "transform: translate("+ (event.targetTouches[0].clientX - map.s_x + map.l_x)+"px, " +(event.targetTouches[0].clientY - map.s_y + map.l_y)+"px);";
    }
  },
  moveToCoords: function(coords){
    let delta_x = -(coords[0] - map.scrSize[0] / 2) - map.l_x;
    let delta_y = -(coords[1] - map.scrSize[1] / 2) - map.l_y;
    map.l_x = -(coords[0] - map.scrSize[0] / 2);
    map.l_y = -(coords[1] - map.scrSize[1] / 2);
    map.animate({
      duration: 200,
      timing(timeFraction) {
        return (1 - timeFraction);
      },
      draw(progress) {
        let c_x = 0;
        let c_y = 0;
        c_x = Math.max(Math.min((map.l_x - delta_x * progress), 0), -map.mapBg.clientWidth + map.scrSize[0]);
        c_y = Math.max(Math.min((map.l_y - delta_y * progress), 0), -map.mapBg.clientHeight + map.scrSize[1]);
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
    if(map.l_x < -map.mapBg.clientWidth + map.scrSize[0]){
      delta_x = -map.l_x - map.mapBg.clientWidth + map.scrSize[0];
      map.l_x = -map.mapBg.clientWidth + map.scrSize[0];
    }
    if(map.l_y > 0){
      delta_y = -map.l_y;
      map.l_y = 0;
    }
    if(map.l_y < -map.mapBg.clientHeight + map.scrSize[1]){
      delta_y = -map.l_y - map.mapBg.clientHeight + map.scrSize[1];
      map.l_y = -map.mapBg.clientHeight + map.scrSize[1];
    }
    map.animate({
      duration: 100,
      timing(timeFraction) {
        return (1 - timeFraction);
      },
      draw(progress) {
        map.mapBg.style = "transform: translate( " + (map.l_x - delta_x * progress) + "px, " + (map.l_y - delta_y * progress) + "px);";
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
    map.scrSize = [map.container.clientWidth, map.container.clientHeight];
    if(map.mapBg != null && map.scrSize != null){
      map.l_x = -1024 + map.scrSize[0] / 2;
      map.l_y = -1024 + map.scrSize[1] / 2;
      map.mapBg.style = "transform: translate( " + map.l_x + "px, " + map.l_y + "px);";
    }
    map.container.addEventListener("mousedown", map.onClkOrTouchDown);
    map.container.addEventListener("touchstart", map.onClkOrTouchDown);
    map.container.addEventListener("mouseup", map.onClkOrTouchUp);
    map.container.addEventListener("touchend", map.onClkOrTouchUp);
    window.addEventListener("resize", map.onResizing);
    map.menu = document.querySelector(".map-body__menu-cntnt");
  },
  openMenu : function(){
    if(map.menu != null && map.menu.classList.contains("map-hidden")){
      map.menu.classList.toggle("map-hidden");
    }
  },
  closeMenu : function(){
    if(map.menu != null && !map.menu.classList.contains("map-hidden")){
      map.menu.classList.toggle("map-hidden");
    }
  }
}


window.addEventListener("load", placesList.turnListOn);
window.addEventListener("load", map.Init);