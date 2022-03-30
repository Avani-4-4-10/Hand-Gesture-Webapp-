prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:310,
    image_format:"png",
    png_quality:90
})
camera=document.getElementById("camera")
Webcam.attach(camera)

function take_SnapShot(){
 Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">"
 })

}
console.log("ml5.version" , ml5.version)

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-ySOKJTMx/model.json", ModelLoaded)

function ModelLoaded(){
    console.log("model loaded successfully")
}
function speak(){
    var synth=window.speechSynthesis
    var speak_data1="The prediction is "+prediction
    
    var Utterthis=new SpeechSynthesisUtterance(speak_data1)
    synth.speak(Utterthis)


}
function check(){
    img= document.getElementById("captured_image")
    classifier.classify(img , gotResult)
    
}
function gotResult(error , results){
    if (error){
        console.error(error)
    }
    else {
        console.log(results)
        prediction_1=results[0].label
        

        document.getElementById("result_gesture_name").innerHTML=prediction_1
        
        speak()

        if(prediction=="Amazing"){
            document.getElementById("update_Gesture").innerHTML="&#128076;"

        }
        if(prediction=="Victory"){
            document.getElementById("update_Gesture").innerHTML="&#9996;"
        }
        if(prediction=="Best"){
            document.getElementById("update_Gesture").innerHTML="&#128077;"
        }
       

    }


}
