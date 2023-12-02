document.addEventListener('DOMContentLoaded', function () {














});


/*Notifs*/
function connect_1() {
    const connect = document.getElementById("Connected_1");  //yes
    connect.style.display = "block";
    setTimeout(function () {
        connect.style.display = "none";
    }, 3000);
}
function connect_1_remove() {
    const connect = document.getElementById("Connected_1");
    connect.style.display = "none";
}



function connect_0() {
    const connect = document.getElementById("Connected_0"); //no
    connect.style.display = "block";
    setTimeout(function () {
        connect.style.display = "none";
    }, 3000);
}

function connect_0_remove() {
    const connect = document.getElementById("Connected_0");
    connect.style.display = "none";
}




function connect_3() {
    const connect = document.getElementById("Connected_3"); //failed
    connect.style.display = "block";
    setTimeout(function () {
        connect.style.display = "none";
    }, 3000);
}

function connect_3_remove() {
    const connect = document.getElementById("Connected_3");
    connect.style.display = "none";
}
/*Notifs*/




/*SideBar*/
function close_sidebar() {

    const left_bar = document.getElementById("Left_NavBar");
    const left_bar_value = window.getComputedStyle(left_bar);
    const Messaging_area = document.getElementById("Messaging_Area");
    const Disconnect_button = document.getElementById("Disconnect");
    if (left_bar_value.left === "0px") {
        left_bar.style.left = "-23%";
        Messaging_area.style.left = "2%";
        Messaging_area.style.width = "73%";
        Disconnect_button.style.left = "110%";
    } else if (left_bar_value.left !== "0px") {
        left_bar.style.left = "0px";
        Messaging_area.style.left = "25%";
        Messaging_area.style.width = "50%";
        Disconnect_button.style.left = "114%";
    }


}
/*SideBar*/



/*Settings function - open_close*/

function Open_Settings() {
    const settings_tab = document.getElementById("Settings_Tab");
    settings_tab.style.display = "block";
}



function Close_Settings() {
    const settings_tab = document.getElementById("Settings_Tab");
    settings_tab.style.display = "none";
}
/*Settings function - open_close*/




/*Getting Internet speed via image download*/
var imageAddr = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Bloemen_van_adderwortel_%28Persicaria_bistorta%2C_synoniem%2C_Polygonum_bistorta%29_06-06-2021._%28d.j.b%29.jpg";
var downloadSize = 7300000; //bytes

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("Loading the image, please wait...");
    window.setTimeout(MeasureConnectionSpeed, 1);
};

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }

    download.onerror = function (err, msg) {
        ShowProgressMessage("Invalid image, or error downloading");
    }

    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;

    function showResults() {

        const show_Speed = document.getElementById("Internet_Speed_Actual");

        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        show_Speed.textContent = "";
        show_Speed.textContent = speedMbps + " Mbps";

    }
}
/*Getting Internet speed via image download*/



/*Getting Ip address*/

