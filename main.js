song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video , 0 , 0 , 600 , 500);

    fill("FF0000");
    stroke("FF0000");
    circle(leftWristX, leftWristY, 20);

    if(leftWristY > 0 && leftWristY <= 100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(leftWristY > 100 && leftWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(leftWristY > 200 && leftWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(leftWristY > 300 && leftWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(leftWristY > 400 && leftWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }

    
    if(scoreRightWrist > 0.2){

    circle(rightWristX, rightWristY, 20);
    inNumberRightWristY = Number(rightWristY);
    removeDecimals = floor(inNumberRightWristY);
    divide_1000 = removeDecimals/1000;
    volume = divide_1000 * 2;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);

    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = "+leftWristX + "left wrist y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("right wrist x = "+rightWristX + "right wrist y = "+rightWristY);
        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log("Score left wrist = "+scoreRightWrist);
    }
}

scoreRightWrist = 0;