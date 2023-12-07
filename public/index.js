


/*Control Login*/

function Control_Login() {

    const Login_Container = document.getElementById("Login_Area");
    const check_login = getJwtCookie("Login_Token");
    console.log("cookie in control: ", check_login);
    if (check_login === undefined) {

        Login_Container.style.display = "block";
    } else if (check_login !== undefined) {
        Login_Container.style.display = "none";
    }

}

Control_Login();
/*Control Login*/



/*Add New User*/

function close_new_user() {
    const add_container = document.getElementById("Search_Bar_Add");
    add_container.style.display = "none";
}
function open_new_user() {
    const add_container = document.getElementById("Search_Bar_Add");
    add_container.style.display = "block";
}
/*Add New User*/



/*denying connection*/


function deny_connection() {
    const connect_container = document.getElementById("Confirm_Connection");
    connect_container.style.left = "100%";
}



function Request_Connection() {
    const connect_container = document.getElementById("Confirm_Connection");
    connect_container.style.left = "50%";
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


/*Cookies*/

function setJwtCookie(name, jwt, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    console.log("Setting cookie:", name, jwt, expires);
    document.cookie = `${name}=${jwt}; ${expires}; path=/; SameSite=None; Secure`;
}

// Get a cookie value by name
function getJwtCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function formatDateAsZeroes() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0'); // Get day with leading zero
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
    const year = today.getFullYear().toString(); // Get full year

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}
/*Cookies*/
function getCurrentTime12Hour() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format the time as hh:mm AM/PM
    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;

    return formattedTime;
}
const currentTime12Hour = getCurrentTime12Hour();


/*Loggin In*/

function Sign_In() {

    const Login_Container = document.getElementById("Login_Area");

    const pass_notice_img = document.getElementById("Pass_Notice_Login_Img");
    const email_wrong = document.getElementById("Pass_Wrong_Login_Notice");

    const email_input = document.getElementById("Login_Email_Input");
    const email_input_value = email_input.value;

    const pass_input = document.getElementById("Login_pass_Input");
    const pass_input_value = pass_input.value;

    const Loader = document.getElementById("Loader_Area");

    const SignIn_Notif = document.getElementById("Signed_In");

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
    } else if (email_input_value !== "" && pass_input_value !== "") {

        Loader.style.display = "block";

        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email_input_value, password: pass_input_value }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("From Sign: Request sent"); //Sent to server
                    return response.json();
                } else {
                    console.log("From Sign: Request failed"); //Failed to send server
                    Loader.style.display = "none";
                    return response.json();
                }
            })
            .then(data => {
                if (data.success === 1) { //Login successful
                    console.log("Login success 1");
                    const login_token = data.token;
                    setJwtCookie("Login_Token", login_token, 1);
                    console.log("Retrieved Login_Token Login:", getJwtCookie("Login_Token"));
                    Loader.style.display = "none";
                    SignIn_Notif.style.display = "block";
                    Login_Container.style.display = "none";
                    setTimeout(function () {
                        SignIn_Notif.style.display = "none";
                    }, 4000);
                } else if (data.success === 0) { //Login failed
                    console.log("Login failed 0");
                    Loader.style.display = "none";
                    pass_notice_img.style.display = "block";
                    email_wrong.style.display = "block";
                    setTimeout(function () {
                        pass_notice_img.style.display = "none";
                        email_wrong.style.display = "none";
                    }, 4000);
                }
            })
            .catch(error => { //catch error with response
                console.log("Login failed catch error");
                Loader.style.display = "none";
                pass_notice_img.style.display = "block";
                email_wrong.style.display = "block";
                setTimeout(function () {
                    pass_notice_img.style.display = "none";
                    email_wrong.style.display = "none";
                }, 4000);
            });
    }
}


/*Loggin In*/





/*Creating Account*/


function Creating_Account() {



    const email_input = document.getElementById("Create_Email_Input");
    const email_input_value = email_input.value;

    const pass_input = document.getElementById("Create_pass_Input");
    const pass_input_value = pass_input.value;

    const Re_pass_input = document.getElementById("Create_Repass_Input");
    const Re_pass_input_value = Re_pass_input.value;

    const Loader = document.getElementById("Loader_Area");

    const failed = document.getElementById("Pass_Fail_Create_Notice");

    const error_3 = document.getElementById("Pass_Wrong_Create_Notice");
    const error_3_Img = document.getElementById("Pass_Notice_Create_Img");

    const Account_Redirect = document.getElementById("Account_Created");

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
    } else if (email_input_value !== "" && pass_input_value !== "" && Re_pass_input_value !== "") {



        const formattedDate = formatDateAsZeroes();
        Loader.style.display = "block";
        fetch('http://localhost:4000/api/create_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_create: email_input_value, password_create: pass_input_value, date_create: formattedDate }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("From Sign React: Request sent"); //Sent to express server
                    return response.json();
                } else {
                    console.log("From Sign React: Request failed"); //Failed to send
                    Loader.style.display = "none";
                    failed.style.display = "block";
                    error_3_Img.style.display = "block";
                    setTimeout(function () {
                        failed.style.display = "none";
                        error_3_Img.style.display = "none";
                    }, 4000);
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.message === 1) { //Created account successful
                    console.log("account created from Index.js");
                    Loader.style.display = "none";
                    Switch_Log_In();
                    setTimeout(function () {
                        Account_Redirect.style.display = "block";
                        setTimeout(function () {
                            Account_Redirect.style.display = "none";
                        }, 4000);
                    }, 3000);
                } else if (data.message === 0) { //Create account failed
                    Loader.style.display = "none";
                    console.log("account created -failed 0- from Index.js");
                    failed.style.display = "block";
                    error_3_Img.style.display = "block";
                    setTimeout(function () {
                        failed.style.display = "none";
                        error_3_Img.style.display = "none";
                    }, 4000);
                } else if (data.message === 3) { //Create account failed - Email already associated with another account
                    Loader.style.display = "none";
                    console.log("account created -failed 3- from Index.js");
                    error_3.style.display = "block";
                    error_3_Img.style.display = "block";
                    setTimeout(function () {
                        error_3.style.display = "none";
                        error_3_Img.style.display = "none";
                    }, 4000);
                }
            })
            .catch(error => { //catch error with response
                Loader.style.display = "none";
                failed.style.display = "block";
                error_3_Img.style.display = "block";
                setTimeout(function () {
                    failed.style.display = "none";
                    error_3_Img.style.display = "none";
                }, 4000);
                console.log("account created -failed catch error- from Index.js");
            });
    }
}


/*Creating Account*/












