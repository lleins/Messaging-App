




/*denying connection*/


function deny_connection() {
    const connect_container = document.getElementById("Confirm_Connection");
    connect_container.style.left = "100%";
}




/*denying connection*/



/*Create Account Switch*/

function Switch_Create_Account() {

    const Loader = document.getElementById("Loader_Area");
    const bottom_links = document.getElementById("Bottom_Links_Container");
    const Top_Title_logIn = document.getElementById("SignIn_Title");
    const Top_Title_createAcc = document.getElementById("CreateAcc_Title");
    const bottom_tab = document.getElementById("Switch_Tabs");
    const Login_Container = document.getElementById("Login_Container");
    const Create_Acc_Container = document.getElementById("Create_Container");
    const Create_Acc_Text = document.getElementById("New_Raven_text");
    const Log_In_Text = document.getElementById("Login_Raven_text");

    Loader.style.display = "block";
    setTimeout(function () {
        Loader.style.display = "none";
        bottom_tab.style.top = "428px";
        Login_Container.style.display = "none";
        Create_Acc_Container.style.display = "block";
        Create_Acc_Text.style.display = "none";
        Log_In_Text.style.display = "block";
        Top_Title_logIn.style.display = "none";
        Top_Title_createAcc.style.display = "block";
        bottom_links.style.top = "540px";
    }, 3000);

}



function Switch_Log_In() {

    const Loader = document.getElementById("Loader_Area");
    const bottom_links = document.getElementById("Bottom_Links_Container");
    const Top_Title_logIn = document.getElementById("SignIn_Title");
    const Top_Title_createAcc = document.getElementById("CreateAcc_Title");
    const bottom_tab = document.getElementById("Switch_Tabs");
    const Create_Acc_Container = document.getElementById("Create_Container");
    const Login_Container = document.getElementById("Login_Container");
    const Create_Acc_Text = document.getElementById("New_Raven_text");
    const Log_In_Text = document.getElementById("Login_Raven_text");

    Loader.style.display = "block";
    setTimeout(function () {
        Loader.style.display = "none";
        bottom_tab.style.top = "358px";
        Login_Container.style.display = "block";
        Create_Acc_Container.style.display = "none";
        Create_Acc_Text.style.display = "block";
        Log_In_Text.style.display = "none";
        Top_Title_logIn.style.display = "block";
        Top_Title_createAcc.style.display = "none";
        bottom_links.style.top = "470px";
    }, 3000);

}

/*Create Account Switch*/




/*Messaging Textarea*/




/*Messaging Textarea*/

/*Notifs*/
function connect_1() {
    const connect = document.getElementById("Connected_1");  //yes
    connect.style.display = "block";
    setTimeout(function () {
        connect.style.display = "none";
    }, 2000);
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
    }, 2000);
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
    }, 2000);
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










/*Loggin In*/

function Sign_In() {
    const pass_notice_img = document.getElementById("Pass_Notice_Login_Img");
    const email_wrong = document.getElementById("Pass_Wrong_Login_Notice");

    const email_input = document.getElementById("Login_Email_Input");
    const email_input_value = email_input.value;

    const pass_input = document.getElementById("Login_pass_Input");
    const pass_input_value = pass_input.value;

    if (email_input_value === "" && pass_input_value === "") { //both empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
            pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value !== "" && pass_input_value === "") { //Password empty
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value === "" && pass_input_value !== "") { //Email empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    }
}


/*Loggin In*/





/*Creating Account*/


function Creating_Account() {
    const email_notice_img = document.getElementById("Pass_Notice_Create_Img");
    const email_exists = document.getElementById("Pass_Wrong_Create_Notice");

    const email_input = document.getElementById("Create_Email_Input");
    const email_input_value = email_input.value;

    const pass_input = document.getElementById("Create_pass_Input");
    const pass_input_value = pass_input.value;

    const Re_pass_input = document.getElementById("Create_Repass_Input");
    const Re_pass_input_value = Re_pass_input.value;

    if (email_input_value === "" && pass_input_value === "" && Re_pass_input_value === "") { //all empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        Re_pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
            pass_input.style.border = "1px solid rgb(70, 70, 70)";
            Re_pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value !== "" && pass_input_value === "" && Re_pass_input_value === "") { //Pass and Re-Pass empty
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        Re_pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            pass_input.style.border = "1px solid rgb(70, 70, 70)";
            Re_pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value === "" && pass_input_value !== "" && Re_pass_input_value === "") {//email and Re-Pass empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        Re_pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
            Re_pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value === "" && pass_input_value === "" && Re_pass_input_value !== "") { //email and pass empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
            pass_input.style.border = "1px solid rgb(70, 70, 70)";

        }, 3000);
    } else if (email_input_value === "" && pass_input_value !== "" && Re_pass_input_value !== "") { //email empty
        email_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            email_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value !== "" && pass_input_value === "" && Re_pass_input_value !== "") { //Pass empty
        pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value !== "" && pass_input_value !== "" && Re_pass_input_value === "") { //Re Pass empty
        Re_pass_input.style.border = "1px solid rgb(255, 16, 0)";
        setTimeout(function () {
            Re_pass_input.style.border = "1px solid rgb(70, 70, 70)";
        }, 3000);
    } else if (email_input_value !== "" && pass_input_value !== "" && Re_pass_input_value !== "") { //Re Pass empty

    }
}


/*Creating Account*/












