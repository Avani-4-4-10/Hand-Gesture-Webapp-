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

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/QwXv8DHd-/model.json", ModelLoaded)

function ModelLoaded(){
    console.log("model loaded successfully")
}
function speak(){
    var synth=window.speechSynthesis
    var speak_data1="The first prediction is "+prediction_1
    var speak_data2="and the second predicition is "+prediction_2

    var Utterthis=new SpeechSynthesisUtterance(speak_data1 + speak_data2)
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
        prediction_2=results[1].label

        document.getElementById("result_emotion_name").innerHTML=prediction_1
        document.getElementById("result_emotion_name2").innerHTML=prediction_2
        speak()

        if(prediction_1=="Happy"){
            document.getElementById("update_Emoji").innerHTML="&#128516;"

        }
        if(prediction_1=="Sad"){
            document.getElementById("update_Emoji").innerHTML="&#128553;"
        }
        if(prediction_1=="Surprised"){
            document.getElementById("update_Emoji").innerHTML="&#128562;"
        }
        if(prediction_1=="Angry"){
            document.getElementById("update_Emoji").innerHTML="&#128544;"
        }
        if(prediction_2=="Happy"){
            document.getElementById("update_Emoji2").innerHTML="&#128516;"

        }
        if(prediction_2=="Sad"){
            document.getElementById("update_Emoji2").innerHTML="&#128553;"
        }
        if(prediction_2=="Surprised"){
            document.getElementById("update_Emoji2").innerHTML="&#128562;"
        }
        if(prediction_2=="Angry"){
            document.getElementById("update_Emoji2").innerHTML="&#128544;"
        }

    }


}
