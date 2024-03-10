status1 = "";
objects = [];
video = "";
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas = createCanvas(680,500);
    canvas.center();
}
function draw()
{
    image(video,0,0,680,500);
    if(status1 != "")
    {
        objectdetector.detect(video,gotResults);
        for (var i=0;i < objects.length;i++) 
        {
            document.getElementById('stat').innerHTML = "Status : Objects Detected";
            document.getElementById("len").innerHTML = "Number of objects detected : "+objects.length;

            fill('red')
            stroke('red')
            percent = floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
            noFill()
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}
function star()
{
    objectdetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById('stat').innerHTML = "Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("model has been loaded");
    status1 = true;
    video.speed(1);
    video.volume(1);
    video.loop();
}
function gotResults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results)
        objects = results;

    }
}