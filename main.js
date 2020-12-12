song="";

leftWristY="";
leftWristX="";

rightWristX="";
rightWristY="";

scorerightWrist="";
scoreleftWrist="";
function preload()
{
    song=loadSound("music.mp3");
}

function setup()
{
    canvas=createCanvas(600,600);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("modelLoaded");
}

function draw()
{
    image(video,0,0,600,600);

    fill("#4287f5");
  stroke("#42f5ef");

 if(scorerightWrist>0.2)
  {
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<= 100)
    {
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed= 0.5x";

    }

    if(rightWristY>100 && rightWristY<=200)
    {
        song.rate(1);
        document.getElementById("speed").innerHTML="Speed= 1x";
    }
  
    if(rightWristY>200 && rightWristY<=300)
    {
        song.rate(1.5);
        document.getElementById("speed").innerHTML="Speed= 1.5x";
    }

    if(rightWristY>300 && rightWristY<=400)
    {
        song.rate(2);
        document.getElementById("speed").innerHTML="Speed= 2x";
    }
  
    if(rightWristY>400 && rightWristY<=500)
    {
        song.rate(2.5);
        document.getElementById("speed").innerHTML="Speed= 2.5x";
    }
  }
  
  if (scoreleftWrist>0.2)
  {
    circle(leftWristX,leftWristY,20);

    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
    song.setVolume(volume);
  }
 }

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function gotPoses(results)
{
   if(results.length>0)
   {
       console.log(results);
       scoreleftWrist=results[0].pose.keypoints[9].score;
       console.log("scoreleftWrist="+scoreleftWrist);
       scorerightWrist = results[0].pose.keypoints[10].score;
       console.log("scorerightWrist="+scorerightWrist);

       leftWristX=results[0].pose.leftWrist.x;
       leftWristY=results[0].pose.leftWrist.y;
       console.log("leftWristX="+leftWristX +"leftWristY="+leftWristY);

       righttWristX=results[0].pose.rightWrist.x;
       rightWristY=results[0].pose.rightWrist.y;
       console.log("righttWristX="+righttWristX +"rightWristY="+rightWristY);
   }
}