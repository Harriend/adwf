objects = [];
status = "";
video = "";

function preload(){
    video = createVideo('video.mp4');
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function setup(){
    canvas = createCanvas(500,300);
    canvas.center();
    video.hide();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('objectsDetected').innerHTML = "Object is being detected";
}

function modelLoaded(){
    console.log('cocossd is loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
     image(video , 0 , 0 , 500 , 300)

     if(status != ""){
        objectDetector.detect(video , gotResults);
     }

     for(i = 0; i<objects.length; i++){
        document.getElementById('status').innerHTML = "Status : objects detected";
        document.getElementById('objectsDetected').innerHTML = "Number of Objects Detected :" + objects.length;

        fill('red');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].y  + 15, objects[i].x + 15 , objects[i].width , objects[i].height);
        noFill();
        stroke('red');
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
     }
     
}

function gotResults(error , results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}