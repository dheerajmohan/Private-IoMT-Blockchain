$(document).ready(function () {
    GetData();
    GetData1();
    GetData2();
    GetData3();

    // setInterval();
});

var d = new Date();
var initTime = d.getTime();

var prevValue = [39, 26, 26, 59];
var lowerLimit = [35, 20, 20, 40];
var upperLimit = [45, 30, 30, 90];
var lastTime = [initTime, initTime, initTime, initTime];

function checkValue(sensorId, sensorVal, encryptVal) {
    var flag = 0;
    var d = new Date();
    var currentTime = d.getTime();
    if (sensorVal >= (1.3 * prevValue[sensorId]) || sensorVal <= (0.7 * prevValue[sensorId])) {
        flag = 1;
        console.log("Abnormal variation"+sensorId +" "+ sensorVal+ " " + encryptVal + " " + prevValue[sensorId]);
    }
    if (sensorVal < lowerLimit[sensorId] || sensorVal > upperLimit[sensorId]) {
        flag = 1;
        console.log("Exceed limit"+sensorId +" "+ sensorVal+ " " + encryptVal + " " + prevValue[sensorId]);
    }
    if (currentTime - lastTime[sensorId] > 15000) {
        flag = 1;
        console.log("Periodic"+sensorId +" "+ sensorVal+ " " + encryptVal + " " + prevValue[sensorId]);
    }
    if (flag == 1) {
        console.log(sensorId +" "+ sensorVal+ " " + encryptVal + " " + prevValue[sensorId]);
        // App.createTask(encryptVal);
        prevValue[sensorId] = sensorVal;    
        lastTime[sensorId] = currentTime;
    }
}

function GetData() {

    var url = 'https://api.thingspeak.com/channels/895509/feeds.json?api_key=5JIVLEMREOWTV5BT&results=2';
    $.ajax
        ({
            url: url,
            type: 'GET',
            contentType: "application/json",
            //dataType: "json",
            //crossDomain: true,
            success: function (data, textStatus, xhr) {
                $.each(data, function (i, item) {
                    if (i == 'feeds') {
                        var ubound = item.length;
                        // console.log(item)
                        var sensorVal = item[0].field1;
                        $('#newTask').val(item[0].field1);
                        checkValue(0, sensorVal, sensorVal);
                    }
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //  alert(errorThrown);
            }
        });
    setTimeout(GetData, 50000);
}

function GetData1() {
    var xhttp = new XMLHttpRequest();
    var url = "http://127.0.0.1:5000";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("demo").innerHTML =
            response = JSON.parse(this.responseText);
            var value = this.responseText;
            $('#newTask4').val(response[0]);
            $('#newTask5').val(response[1]);
            var sensorVal = response[0];
            var encryptVal = response[1];
            checkValue(3, sensorVal, encryptVal);
            var enc = response[1].substring(1, 95);
            document.getElementById("encrypt").innerHTML = response[1];


        } else {

        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

    setTimeout(GetData1, 15000);

}


function GetData2() {

    var url = 'https://api.thingspeak.com/channels/897250/feeds.json?api_key=NRX4RFTX8982MPKM&results=2';
    $.ajax
        ({
            url: url,
            type: 'GET',
            contentType: "application/json",
            //dataType: "json",
            //crossDomain: true,
            success: function (data, textStatus, xhr) {
                $.each(data, function (i, item) {
                    if (i == 'feeds') {
                        var ubound = item.length;
                        //console.log("1"+data)
                        var sensorVal = item[0].field1;
                        $('#newTask2').val(item[0].field1);
                        checkValue(1, sensorVal);
                    }
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //  alert(errorThrown);
            }
        });
    setTimeout(GetData2, 10000);
}

function GetData3() {

    var url = 'https://api.thingspeak.com/channels/897260/feeds.json?api_key=6UDVKT1V3MQC6YZ4&results=2';
    $.ajax
        ({
            url: url,
            type: 'GET',
            contentType: "application/json",
            //dataType: "json",
            //crossDomain: true,
            success: function (data, textStatus, xhr) {
                $.each(data, function (i, item) {
                    if (i == 'feeds') {
                        var ubound = item.length;
                        var sensorVal = item[0].field1;
                        $('#newTask3').val(item[0].field1);
                        checkValue(2, sensorVal);
                    }
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                //  alert(errorThrown);
            }
        });

    setTimeout(GetData3, 10000);
}