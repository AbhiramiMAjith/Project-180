var coordinates = {}

$(document).ready(function(){
    getCoordinates()
    getWeather()
})

function getCoordinates(){
    var params = new URLSearchParams(document.location.search)
    
    if(params.has("source") && params.has("destination")){
        var source = params.get("source")
        var destination = params.get("destination")

        var source_latitude = source.split(";")[0]
        var source_longitude = source.split(";")[1]

        var destination_latitude = destination.split(";")[0]
        var destination_longitude = destination.split(";")[1]

        coordinates = {
            "source_latitude" : source_latitude,
            "source_longitude" : source_longitude,
            "destination_latitude" : destination_latitude,
            "destination_longitude" : destination_longitude
        }
        console.log(coordinates)
    }
    else{
        alert("seleCT CORDINATES")
        window.history.back()
    }
}

function getWeather(){
    $.ajax({
        url : `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_latitude}&lon=${coordinates.destination_longitude}&appid=8c95a8c9d13faad4a0b6d8d228e2c682`,
        type : 'get',
        success : function(response){
            let name = response.name
            let weather = response.weather[0].main

            $("#scene-container").append(
                `
                <a-entity gps-entity-place="latitude:${steps[i].maneuver.location[1]}; longitude:${steps[i].maneuver.location[0]}">
                    <a-entity>
                        <a-text height=50 value=Weather forcast is ${weather} at ${name}><a-text>
                    <a-entity>
                </a-entity>
                `
            )
        }
        
    })
}