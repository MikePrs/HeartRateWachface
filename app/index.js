import clock from "clock";
import document from "document";


// You must request the access_heart_rate permission in order to use this sensor
import { HeartRateSensor } from "heart-rate";

let myClock = document.getElementById("myClock");
let textHR = document.getElementById("textHR");
let iconHR = document.getElementById("iconHR");
let myDay = document.getElementById("date");



// See here: https://dev.fitbit.com/build/guides/clockfaces/#digital-clock
clock.granularity = "seconds"; // seconds, minutes, hours

let month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "NOVEMBER", "DECEMBER"];
let day=[" ","MON","TUE", "WED", "THU", "FRI", "SAT", "SUN"];


//  Slice usage: (example)
//  var str = "Hello world!"; 
//  console.log(str.slice(-2));
//  Output: d!
clock.ontick = (evt) => {
    myClock.text = ("0" + evt.date.getHours()).slice(-2) + ":" +
        ("0" + evt.date.getMinutes()).slice(-2) + ":" +
        ("0" + evt.date.getSeconds()).slice(-2);
    myDay.text = (day[evt.date.getDay()] + " "+month[evt.date.getMonth()] + " " + evt.date.getDate());
};

if (HeartRateSensor) {
    // Variables defined with const behave like let variables, except they cannot be reassigned
    const hrm = new HeartRateSensor();;
    // Declare an event handler that will be called every time a new HR value is received
    hrm.addEventListener("reading", function () {
        console.log("Current heart rate: " + hrm.heartRate);
        if (hrm.heartRate >= 60 && hrm.heartRate <= 100) {
            iconHR.href = "red.png";
        } else if (hrm.heartRate > 100) {
            iconHR.href = "black.png";
        } else {
            iconHR.href = "white.png";
        }
        textHR.text = hrm.heartRate;
    });

    // Begin monitoring the sensor
    hrm.start();
}