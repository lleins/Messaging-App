//Loading Page Animation---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const loadingContainer = document.querySelector(".loading-container");
    loadingContainer.style.display = "flex"; // Show the loading page
});

window.onload = () => {
    const loadingContainer = document.querySelector(".loading-container");
    loadingContainer.style.display = "none"; // Hide the loading page
};



//Loading Page Animation---------------------------------------------------------


/*inactivity counter*/
const inactivityTimeout = 10 * 60 * 1000 // 10 minutes 10 * 60 * 1000
let inactivityTimer;

function resetInactivityTimer() {

    const Login_Cookie = getJwtCookie('Login_Token');
    if (Login_Cookie !== null) {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(logoutUser, inactivityTimeout);
    }
}

function logoutUser() {
    const Inactive_Container = document.getElementById("Inactive_Container");
    Inactive_Container.style.display = "block";
    Log_Out();
    location.reload();
    clearTimeout(inactivityTimer);
}

resetInactivityTimer();

document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);


/*inactivity counter*/


/*Log out*/

function Log_Out() {
    const Loader = document.getElementById("Loader_Area_Main");
    const username = document.getElementById("Username_Personal");

    fetch('http://localhost:4000/api/log_out', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username.textContent }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message === 1) {
                deleteCookie("Login_Token");
                Loader.style.display = "none";
                location.reload();

            } else if (data.message === 0) {
                console.log("Logout failed");
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
            location.reload();
            Loader.style.display = "none";
        });

}


/*Log out*/


function close_timeout() {
    const Inactive_Container = document.getElementById("Inactive_Container");
    Inactive_Container.style.display = "none";
}


/*Control Reload*/
window.onbeforeunload = function () {
    setJwtCookie("Reload", "1", 1);
    console.log("set cookie");
};

function Re_Write_UserID() {


    const Username = document.getElementById("Username_Personal");
    const Ip = document.getElementById("Your_IP_Actual");

    const reload_cookie = getJwtCookie("Reload");
    console.log("username from reload: ", Username.textContent);
    console.log("userid from reload: ", Ip.textContent);
    if (reload_cookie === null) {
        console.log("Cookie is null");
    } else if (reload_cookie !== null) {
        console.log("Cookie isnt null");
        fetch('http://localhost:4000/api/user_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: Username.textContent, user_id: Ip.textContent }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("From Re-Write: Request sent"); //Sent to server
                    return response.json();
                } else {
                    console.log("From Re-Write: Request failed"); //Failed to send server
                    return response.json();
                }
            })
            .then(data => {
                if (data.success === 1) { //Login successful
                    console.log("Re-Write success 1");

                    deleteCookie("Reload");
                } else if (data.success === 0) { //Login failed
                    console.log("Re-Write failed 0");

                }
            })
            .catch(error => { //catch error with response
                console.log("Re-Write failed catch error");

            });

    }


}



/*Control Reload*/




/*Cookies Container*/

function reload_window() {
    window.location.reload(true);
}


function Cookies_Show() {

    const cookie_show = document.getElementById("Cookies_Content");
    const cookie_error = document.getElementById("Cookie_Error_Container");

    cookie_show.style.display = "block";
    cookie_error.style.display = "none";

    const Cookie_Container = document.getElementById("Accept_Cookies_Container");
    const cookie = getJwtCookie("accept");

    if (cookie === null) {
        Cookie_Container.style.opacity = "1";
        Cookie_Container.style.bottom = "20px";
    } else if (cookie !== null) {

    }
}

function Cookies_Accept() {
    const cookie_show = document.getElementById("Cookies_Content");
    const cookie_error = document.getElementById("Cookie_Error_Container");

    const cookie_loader = document.getElementById("Cookie_Loader");

    cookie_loader.style.display = "block";

    const Cookie_Container = document.getElementById("Accept_Cookies_Container");
    setJwtCookie("accept", 1, 7);
    const cookie = getJwtCookie("accept");
    if (cookie === null) {
        cookie_loader.style.display = "none";
        cookie_show.style.display = "none";
        cookie_error.style.display = "block";
    } else if (cookie !== null) {
        cookie_loader.style.display = "none";
        Cookie_Container.style.transition = "1s";
        Cookie_Container.style.opacity = "0";
        Cookie_Container.style.bottom = "-500px";
    }
}

setTimeout(function () {
    Cookies_Show();
}, 5000);
/*Cookies Container*/






/*Control Login*/

function Control_Login() {

    const Login_Container = document.getElementById("Login_Area");
    const check_login = getJwtCookie("Login_Token");
    console.log("cookie in control: ", check_login);
    if (check_login === null) {
        Login_Container.style.display = "block";
    } else if (check_login !== null) {
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
    const connect_container = document.getElementById("Confirm_Remove_Friend");
    connect_container.style.display = "none";
}



function Request_Connection() {
    const connect_container = document.getElementById("Confirm_Remove_Friend");
    connect_container.style.left = "50%";
}

/*denying connection*/




/*My Account*/
const Profile_Img = document.getElementById('My_Account_Img');

const Change = document.getElementById('Change_Profile_Img');

Profile_Img.addEventListener('mouseover', function () {
    Profile_Img.style.filter = "brightness(40%)";
    Change.style.opacity = "1";
});


Profile_Img.addEventListener('mouseout', function () {
    Profile_Img.style.filter = "brightness(100%)";
    Change.style.opacity = "0";
});



Change.addEventListener('mouseover', function () {
    Profile_Img.style.filter = "brightness(40%)";
    Change.style.opacity = "1";
});


Change.addEventListener('mouseout', function () {
    Profile_Img.style.filter = "brightness(100%)";
    Change.style.opacity = "0";
});

function My_Account() {

    const username_my_account = document.getElementById('My_Account_Name');
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);


    fetch('http://localhost:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                console.log("From Account, Success token: ", data.username);
                username_my_account.textContent = data.username;
            } else if (data.success === 0) {
                // Login failed
            }
        });

}
My_Account();
/*My Account*/





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


function Friend_Request_1() {
    const connect = document.getElementById("Friend_Request_1");  //yes
    connect.style.display = "block";
    setTimeout(function () {
        connect.style.display = "none";
    }, 4000);
}
function Friend_Request_1_Remove() {
    const connect = document.getElementById("Friend_Request_1");
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
    const Ip = document.getElementById("Your_IP_Actual");
    const pass_notice_img = document.getElementById("Pass_Notice_Login_Img");
    const email_wrong = document.getElementById("Pass_Wrong_Login_Notice");

    const cookie_error = document.getElementById("Cookie_Error");
    setJwtCookie("test", "1", 1);
    const test_cookie = getJwtCookie("test");
    console.log("Test cookie 23123112313: ", test_cookie);

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

    } else if (email_input_value !== "" && pass_input_value !== "" && test_cookie === null) { //cookie error

        cookie_error.style.display = "block";
        setTimeout(function () {
            cookie_error.style.display = "none";
        }, 6000);
    } else if (email_input_value !== "" && pass_input_value !== "" && test_cookie !== null) {
        deleteCookie("test");
        Loader.style.display = "block";

        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email_input_value, password: pass_input_value, user_id: Ip.textContent }),
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
                    Loader.style.display = "none";
                    const login_token = data.token;
                    setJwtCookie("Login_Token", login_token, 1);
                    console.log("Retrieved Login_Token Login:", getJwtCookie("Login_Token"));
                    Account_Information();
                    Friends_Left_Bar();
                    resetInactivityTimer();
                    email_input.value = "";
                    pass_input.value = "";
                    console.log("User ID from text: ", Ip.textContent);

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
                console.log("Login failed catch error", error);
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

const login_cookie = getJwtCookie("Login_Token");

if (login_cookie === null) {

} else if (login_cookie !== null) {
    Account_Information();
}




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
                            email_input.value = "";
                            pass_input.value = "";
                            Re_pass_input.value = "";
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





/*Getting Email from cookie jwt*/
function Account_Information() {
    const Username = document.getElementById("Username_Personal");
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);


    fetch('http://localhost:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                console.log("From Account, Success token: ", data.username);
                Username.textContent = data.username;
            } else if (data.success === 0) {
                // Login failed
            }
        });
}

/*Getting Email from cookie jwt*/


/*Raven Cover Tab*/

function Raven_Tab() {
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "block";
}

/*Raven Cover Tab*/


/*Open Messages*/
function message_tab() {
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");



    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 1;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}
/*Open Messages*/


/*Settings function - open_close*/

function Open_Settings() {
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 1;
    friend_marker.style.opacity = 0;

    Setting_container.style.display = "block";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}


/*Settings function - open_close*/



/*Add Friend*/

function add_friend_tab() {
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 1;

    Setting_container.style.display = "none";
    friend_container.style.display = "block";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}

/*Add Friend*/

/*Logout*/

function Logout_Open_Tab() {
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 1;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "block";
    Raven_Container.style.display = "none";
}

/*Logout*/


/*Get Status of friends*/

async function friend_status(id) {
    try {
        const response = await fetch('http://localhost:4000/api/get_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: id }),
        });

        const data = await response.json();

        if (data.success === 1) {
            console.log("Here is user status:", data.status);
            return data.status;
        } else if (data.success === 0) {
            console.error('User not found or internal server error');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

/*

//how to call the function

async function getStatusAndLog() {
    const status = await friend_status("luke12");

}
*/

/*Get Status of friends*/


if (login_cookie === null) {

} else if (login_cookie !== null) {
    Friends_Left_Bar();
}



if (login_cookie === null) {

} else if (login_cookie !== null) {
    setInterval(Friends_Left_Bar, 30000);//gets called every 30s to update
}


/*Friends Left Bar*/

function Friends_Left_Bar() {

    const loader = document.getElementById('loader_friends_M');

    const friends_tab = document.getElementById('Friends_Container');
    const none_text = document.getElementById('friends_none_text_F');

    friends_tab.innerHTML = '';


    console.log("none element:", none_text);
    console.log("none text content:", none_text.textContent);

    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);


    loader.style.display = "block";

    fetch('http://localhost:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                fetch('http://localhost:4000/api/Get_Friends', {  //uses username from the cookie to check
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username }),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("From Account React: Request sent"); // Sent to the server
                            return response.json();
                        } else {
                            console.log("From Account React: Request failed"); // Failed to send to the server
                            none_text.style.display = "block";
                            loader.style.display = "none";
                            return response.json();

                        }
                    })
                    .then((data) => {
                        if (data.success === 1) { //some pending
                            none_text.style.display = "none";
                            loader.style.display = "none";
                            console.log("here is pending list: ", data.sent[0].friend);
                            data.sent.forEach(friendItem => {
                                // Create the div element
                                const friendDiv = document.createElement("div");
                                friendDiv.addEventListener('click', () => Connect_to_Chat(friendItem.friend, ""));
                                friendDiv.classList.add("added_ip");

                                // Create and set the image element
                                const imgElement = document.createElement("img");
                                imgElement.src = "Images/user.png";
                                imgElement.classList.add("user_img");
                                friendDiv.appendChild(imgElement);

                                // Create and set the p element for the user_ip
                                const userIpP = document.createElement("p");
                                userIpP.classList.add("user_ip");
                                userIpP.textContent = friendItem.friend;
                                friendDiv.appendChild(userIpP);

                                // Create and set the image element for delete_saved
                                const deleteSavedImg = document.createElement("img");
                                deleteSavedImg.src = "Images/remove.png";
                                deleteSavedImg.classList.add("delete_saved");
                                deleteSavedImg.addEventListener('click', () => Remove_Friend(userIpP.textContent));
                                friendDiv.appendChild(deleteSavedImg);

                                // Create and set the p element for Status_Text

                                async function getStatusAndLog(id) { //Checks for online status
                                    const status = await friend_status(id);

                                    if (status === 1) { //online
                                        //text online
                                        const statusTextP = document.createElement("p");
                                        statusTextP.classList.add("Status_Text");
                                        statusTextP.textContent = "Online";
                                        friendDiv.appendChild(statusTextP);

                                        //icon online
                                        const onlineIndicatorP = document.createElement("p");
                                        onlineIndicatorP.classList.add("online-indicator", "Status_Icon");
                                        friendDiv.appendChild(onlineIndicatorP);
                                    } else if (status === 0) {//offline
                                        //text offline
                                        const statusTextP = document.createElement("p");
                                        statusTextP.classList.add("Status_Text");
                                        statusTextP.textContent = "Offline";
                                        friendDiv.appendChild(statusTextP);

                                        //icon offline
                                        const onlineIndicatorP = document.createElement("p");
                                        onlineIndicatorP.classList.add("offline-indicator", "Status_Icon");
                                        friendDiv.appendChild(onlineIndicatorP);
                                    }

                                }
                                getStatusAndLog(friendItem.friend);

                                // Append the created div to the friendsContainer
                                const friendsContainer = document.getElementById("Friends_Container");
                                friendsContainer.appendChild(friendDiv);
                            });
                        } else if (data.success === 0) { //None pending
                            none_text.style.display = "block";
                            loader.style.display = "none";
                            console.log("0 in friend");
                        } else if (data.success === 3) { //server error
                            none_text.style.display = "block";
                            loader.style.display = "none";
                            console.log("3 in friend");
                        } else if (data.success === 4) { //server error
                            none_text.style.display = "block";
                            loader.style.display = "none";
                            console.log("4 in friend");
                        }
                    });
            } else if (data.success === 0) {
                // Login failed
            }
        });


}



/*Friends Left Bar*/




/*Remove Friend*/

function Remove_Friend(username) {
    const personal_username = document.getElementById("Username_Personal");
    const confirm_Remove_container = document.getElementById("Confirm_Remove_Friend");
    const confirm_Remove_username = document.getElementById("Chat_Request_actual");
    const Remove_Friend_Button = document.getElementById("Join_Chat");
    const loader = document.getElementById("Confirm_Remove_Friend_Loader");
    const error_notif = document.getElementById("Error_Remove");

    confirm_Remove_username.textContent = username;
    confirm_Remove_container.style.display = "block";

    Remove_Friend_Button.addEventListener('click', () => {
        fetch('http://localhost:4000/api/Remove_Friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: personal_username.textContent, friend: username }),
        })
            .then(response => {
                if (response.ok) {
                    console.log("From decline FR: Request sent"); //Sent to express server
                    return response.json();
                } else {
                    loader.style.display = "none";
                    error_notif.style.display = "block";
                    setTimeout(function () {
                        error_notif.style.display = "none";
                    }, 4000);
                    throw new Error('Network response was not ok');
                }
            })
            .then(data => {
                if (data.message === 1) {
                    loader.style.display = "none";
                    Friends_Left_Bar();
                    location.reload(true);
                    confirm_Remove_container.style.display = "none";
                } else if (data.message === 0) {
                    loader.style.display = "none";
                    error_notif.style.display = "block";
                    setTimeout(function () {
                        error_notif.style.display = "none";
                    }, 4000);
                } else if (data.message === 3) {
                    error_notif.style.display = "block";
                    setTimeout(function () {
                        error_notif.style.display = "none";
                    }, 4000);
                }
            })
            .catch(error => { //catch error with response
                loader.style.display = "none";
                error_notif.style.display = "block";
                setTimeout(function () {
                    error_notif.style.display = "none";
                }, 4000);
            });
    });
}

/*Remove Friend*/




/*Disable Button*/

function Disable_Button(id) {
    var myButton = document.getElementById(id);
    myButton.disabled = true;

    myButton.style.filter = "brightness(50%)";
    myButton.style.cursor = "not-allowed";
    setTimeout(function () {
        myButton.disabled = false;
        myButton.style.filter = "brightness(100%)";
        myButton.style.cursor = "pointer";
    }, 4000);
}

/*Disable Button*/


/*Sending a Friend Request*/

function Friend_Request() {

    const Loader_Friend = document.getElementById("Loader_FR");

    const sender_username = document.getElementById("Username_Personal");

    const user_not_found = document.getElementById("User_DNE_FR");
    const user_error = document.getElementById("User_Error_FR");
    const user_pending = document.getElementById("User_Pending_FR");

    const recipient = document.getElementById("connect_IP_FR");
    const recipient_value = recipient.value;

    if (recipient_value === "") {
        recipient.style.border = "1px solid rgb(255, 19, 0)";
        setTimeout(function () {
            recipient.style.border = "1px solid rgb(70, 70, 70)";
        }, 4000);

    } else if (recipient_value === sender_username.textContent) {
        recipient.style.border = "1px solid rgb(255, 19, 0)";
        setTimeout(function () {
            recipient.style.border = "1px solid rgb(70, 70, 70)";
        }, 4000);
    } else if (recipient_value !== "") {
        Loader_Friend.style.display = "block";
        fetch('http://localhost:4000/api/Send_Friend_Request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient: recipient_value, sender: sender_username.textContent }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("From Account React: Request sent"); // Sent to the server
                    return response.json();
                } else {
                    console.log("From Account React: Request failed"); // Failed to send to the server
                    Loader_Friend.style.display = "none";
                    return response.json();

                }
            })
            .then((data) => {
                if (data.success === 1) { //user exists
                    Loader_Friend.style.display = "none";
                    recipient.value = "";
                    Friend_Request_1();
                } else if (data.success === 0) { //user doesnt exist
                    Loader_Friend.style.display = "none";
                    user_not_found.style.display = "block";
                    setTimeout(function () {
                        user_not_found.style.display = "none";
                    }, 4000);
                } else if (data.success === 3) { //server error
                    Loader_Friend.style.display = "none";
                    user_error.style.display = "block";
                    setTimeout(function () {
                        user_error.style.display = "none";
                    }, 4000);
                } else if (data.success === 4) { //server error
                    Loader_Friend.style.display = "none";
                    user_pending.style.display = "block";
                    setTimeout(function () {
                        user_pending.style.display = "none";
                    }, 4000);
                }
            });
    }




}




/*Sending a Friend Request*/



/*Friend Tabs*/



function Pending_Tab() {
    check_pending();

    const Pending_Tab = document.getElementById("Pending_Tab");
    const Sent_Tab = document.getElementById("Sent_Tab");

    const Added_FR_Btn = document.getElementById("Added_FR_Btn");
    const Pending_FR_Btn = document.getElementById("Pending_FR_Btn");
    const Sent_FR_Btn = document.getElementById("Sent_FR_Btn");

    Pending_Tab.style.display = "block";
    Sent_Tab.style.display = "none";


    Pending_FR_Btn.style.color = "rgb(245, 245, 245)";
    Pending_FR_Btn.style.backgroundColor = "rgb(40, 40, 40, 1)";

    Sent_FR_Btn.style.color = "rgb(215, 215, 215)";
    Sent_FR_Btn.style.backgroundColor = "rgb(0, 0, 0, 0)";
}

function Sent_Tab() {
    check_sent();

    const Pending_Tab = document.getElementById("Pending_Tab");
    const Sent_Tab = document.getElementById("Sent_Tab");


    const Pending_FR_Btn = document.getElementById("Pending_FR_Btn");
    const Sent_FR_Btn = document.getElementById("Sent_FR_Btn");


    Pending_Tab.style.display = "none";
    Sent_Tab.style.display = "block";



    Pending_FR_Btn.style.color = "rgb(215, 215, 215)";
    Pending_FR_Btn.style.backgroundColor = "rgb(0, 0, 0, 0)";

    Sent_FR_Btn.style.color = "rgb(245, 245, 245)";
    Sent_FR_Btn.style.backgroundColor = "rgb(40, 40, 40, 1)";
}


/*Friend Tabs*/




/*Added tab communication*/

function rotateImage(id) {
    var reloadImage = document.getElementById(id);
    reloadImage.style.transform = 'rotate(-360deg)';

    // You might want to reset the rotation after a delay
    setTimeout(function () {
        reloadImage.style.transform = 'rotate(0deg)';
    }, 10); // Adjust the delay to match the transition duration
}


function rotateImage_main(id) {
    var reloadImage = document.getElementById(id);
    reloadImage.style.transition = '.5s';
    reloadImage.style.transform = 'rotate(-360deg)';

    // You might want to reset the rotation after a delay
    setTimeout(function () {
        reloadImage.style.transition = '0s';
        reloadImage.style.transform = 'rotate(0deg)';
    }, 500); // Adjust the delay to match the transition duration
}



function check_pending() {


    var pending_tab = document.getElementById('Pending_Tab');

    var reload_pending = document.getElementById("Reload_Pending");

    var none_text = document.getElementById('pending_none_text');

    var title_text = document.getElementById('Pending_Title');

    pending_tab.innerHTML = '';
    pending_tab.appendChild(reload_pending.cloneNode(true));
    pending_tab.appendChild(none_text.cloneNode(true));
    none_text.textContent = "You have no pending friend requests";

    pending_tab.appendChild(title_text.cloneNode(true));
    title_text.textContent = "Pending Friend Requests";
    const Username = document.getElementById("Username_Personal");
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);


    fetch('http://localhost:4000/api/account_information', { //gets username from the cookie
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                console.log("From Account, Success token: ", data.username);
                const none = document.getElementById("pending_none_text");

                const username = document.getElementById("Username_Personal");
                console.log("user in pending", username.textContent);
                fetch('http://localhost:4000/api/Check_Pending', {          //uses username from the cookie to check
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ recipient: data.username }),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("From Account React: Request sent"); // Sent to the server
                            return response.json();
                        } else {
                            console.log("From Account React: Request failed"); // Failed to send to the server
                            none.style.display = "block";
                            return response.json();

                        }
                    })
                    .then((data) => {
                        if (data.success === 1) { //some pending

                            none.style.display = "none";
                            console.log("here is pending list: ", data.pending[0].sender);
                            const container = document.getElementById("Pending_Tab");

                            // Iterate through the data.pending array and create the HTML for each item
                            data.pending.forEach(pendingItem => {
                                // Create the div element
                                const pendingDiv = document.createElement("div");
                                pendingDiv.classList.add("Pending_FR_Style");

                                // Create and set the image element
                                const imgElement = document.createElement("img");
                                imgElement.src = "Images/user.png";
                                imgElement.classList.add("Account_Img");
                                pendingDiv.appendChild(imgElement);

                                // Create and set the p element for the username
                                const usernameP = document.createElement("p");
                                usernameP.classList.add("Account_Username");
                                usernameP.textContent = pendingItem.sender; // Set the sender text
                                pendingDiv.appendChild(usernameP);

                                // Create and set the alert image element
                                const alertImg = document.createElement("img");
                                alertImg.src = "Images/warning.png";
                                alertImg.classList.add("alert_Img");
                                pendingDiv.appendChild(alertImg);

                                // Create and set the p element for the friend request text
                                const frTextP = document.createElement("p");
                                frTextP.classList.add("FR_Text");
                                frTextP.textContent = "Friend request pending";
                                pendingDiv.appendChild(frTextP);

                                /*
                                const denyButton = document.createElement("button");
                                denyButton.classList.add("Deny_Friend");
                                denyButton.textContent = "DENY";
                                denyButton.addEventListener('click', () => decline_friend_request(usernameP.textContent));
                                pendingDiv.appendChild(denyButton);
                                */
                                const denyButton = document.createElement("img");
                                denyButton.classList.add("Deny_Friend");
                                denyButton.src = "Images/deny.png";
                                denyButton.addEventListener('click', () => decline_friend_request(usernameP.textContent));
                                pendingDiv.appendChild(denyButton);


                                /*
                                const acceptButton = document.createElement("button");
                                acceptButton.classList.add("Accept_Friend");
                                acceptButton.textContent = "ACCEPT";
                                acceptButton.addEventListener('click', () => add_user(usernameP.textContent));
                                pendingDiv.appendChild(acceptButton);
                                */

                                const acceptButton = document.createElement("img");
                                acceptButton.classList.add("Accept_Friend");
                                acceptButton.src = "Images/accept.png";
                                acceptButton.addEventListener('click', () => add_user(usernameP.textContent));
                                pendingDiv.appendChild(acceptButton);
                                // Append the created div to the container
                                container.appendChild(pendingDiv);
                            });


                        } else if (data.success === 0) { //None pending
                            none.style.display = "block";
                            console.log("0 in pending");
                        } else if (data.success === 3) { //server error
                            none.style.display = "block";
                            console.log("3 in pending");
                        } else if (data.success === 4) { //server error
                            none.style.display = "block";
                            console.log("4 in pending");
                        }
                    });
            } else if (data.success === 0) {
                // Login failed
            }
        });

}
check_pending();
/*Added tab communication*/




/*Sent Requests*/

function check_sent() {
    var sent_tab = document.getElementById('Sent_Tab');

    var reload_sent = document.getElementById('Reload_Sent');

    var none_text = document.getElementById('sent_none_text');

    var title_text = document.getElementById('Sent_Title');

    sent_tab.innerHTML = '';

    sent_tab.appendChild(reload_sent.cloneNode(true));

    sent_tab.appendChild(none_text.cloneNode(true));
    none_text.textContent = "You have sent no friend requests";

    sent_tab.appendChild(title_text.cloneNode(true));
    title_text.textContent = "Friend requests sent";


    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    fetch('http://localhost:4000/api/account_information', { //gets username from the cookie
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                console.log("From Account, Success token: ", data.username);
                const none = document.getElementById("sent_none_text");

                const username = document.getElementById("Username_Personal");
                console.log("user in pending", username.textContent);
                fetch('http://localhost:4000/api/Check_Sent', {          //uses username from the cookie to check
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender: data.username }),
                })
                    .then((response) => {
                        if (response.ok) {
                            console.log("From Account React: Request sent"); // Sent to the server
                            return response.json();
                        } else {
                            console.log("From Account React: Request failed"); // Failed to send to the server
                            none.style.display = "block";
                            return response.json();

                        }
                    })
                    .then((data) => {
                        if (data.success === 1) { //some pending

                            none.style.display = "none";
                            console.log("here is pending list: ", data.sent[0].recipient);
                            const dynamicContent = document.getElementById("Sent_Tab");
                            data.sent.forEach(recipient => {
                                const div = document.createElement('div');
                                div.className = 'Pending_Sent_Style';

                                // Create and append the user image
                                const userImg = document.createElement('img');
                                userImg.src = 'Images/user.png';
                                userImg.className = 'Account_Img_Sent';
                                div.appendChild(userImg);

                                // Create and append the username paragraph
                                const usernameP = document.createElement('p');
                                usernameP.className = 'Account_Username_Sent';
                                usernameP.textContent = recipient.recipient; // Use the actual property from your data
                                div.appendChild(usernameP);

                                // Create and append the alert image
                                const alertImg = document.createElement('img');
                                alertImg.src = 'Images/warning.png';
                                alertImg.className = 'alert_Img_Sent';
                                div.appendChild(alertImg);

                                // Create and append the "Sent" text paragraph
                                const sentTextSec = document.createElement('p');
                                sentTextSec.className = 'Sent_Text_sec';
                                sentTextSec.textContent = 'Sent';
                                div.appendChild(sentTextSec);

                                // Create and append the "Friend request pending..." text paragraph
                                const sentText = document.createElement('p');
                                sentText.className = 'Sent_Text';
                                sentText.textContent = 'Friend request pending...';
                                div.appendChild(sentText);

                                // Append the dynamically created elements to the container div
                                dynamicContent.appendChild(div);

                            });
                        } else if (data.success === 0) { //None pending
                            none.style.display = "block";
                            console.log("0 in pending");
                        } else if (data.success === 3) { //server error
                            none.style.display = "block";
                            console.log("3 in pending");
                        } else if (data.success === 4) { //server error
                            none.style.display = "block";
                            console.log("4 in pending");
                        }
                    });
            } else if (data.success === 0) {
                // Login failed
            }
        });
}


check_sent();
/*Sent Requests*/







/*Add User*/

function add_user(friend) {
    const loader = document.getElementById("loader_friend_tab");

    const Pending_add_1 = document.getElementById("Pending_add_1");
    const Pending_add_3 = document.getElementById("Pending_add_3");

    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);


    fetch('http://localhost:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                loader.style.display = "none";
                Pending_add_3.style.display = "block";
                setTimeout(function () {
                    Pending_add_3.style.display = "none";
                }, 4000);
                console.log("From Account React: Request failed"); // Failed to send to the server
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                console.log("From Account, Success token: ", data.username);
                const formattedDate = formatDateAsZeroes();
                loader.style.display = "block";
                fetch('http://localhost:4000/api/Add_User', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username, friend: friend, date_create: formattedDate }),
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("From Sign React: Request sent"); //Sent to express server
                            return response.json();
                        } else {

                            loader.style.display = "none";
                            Pending_add_3.style.display = "block";
                            setTimeout(function () {
                                Pending_add_3.style.display = "none";
                            }, 4000);
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then(data => {
                        if (data.message === 1) { //Friends were added
                            Pending_add_1.style.display = "block";
                            Pending_Tab();
                            Friends_Left_Bar();
                            setTimeout(function () {
                                loader.style.display = "none";
                                Pending_add_1.style.display = "none";
                            }, 4000);
                        } else if (data.message === 0) { //Friends were not added
                            loader.style.display = "none";
                            Pending_add_3.style.display = "block";
                            setTimeout(function () {
                                Pending_add_3.style.display = "none";
                            }, 4000);
                        } else if (data.message === 3) { //Already friends
                            loader.style.display = "none";
                            Pending_add_3.style.display = "block";
                            setTimeout(function () {
                                Pending_add_3.style.display = "none";
                            }, 4000);
                        }
                    })
                    .catch(error => { //catch error with response
                        loader.style.display = "none";
                        Pending_add_3.style.display = "block";
                        setTimeout(function () {
                            Pending_add_3.style.display = "none";
                        }, 4000);
                        console.log("added -failed catch error- from index.js", error);
                    });
            } else if (data.success === 0) {
                loader.style.display = "none";
                Pending_add_3.style.display = "block";
                setTimeout(function () {
                    Pending_add_3.style.display = "none";
                }, 4000);
            }
        });
}



function decline_friend_request(username) {

    const loader = document.getElementById("loader_friend_tab");

    const Pending_deny_1 = document.getElementById("Pending_deny_1");
    const Pending_deny_3 = document.getElementById("Pending_deny_3");

    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    console.log("Cookie from Account_Format.tsx : ", userData);

    loader.style.display = "block";
    fetch('http://localhost:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {
                console.log("From Account React: Request sent"); // Sent to the server
                return response.json();
            } else {
                console.log("From Account React: Request failed"); // Failed to send to the server
                Pending_deny_3.style.display = "block";
                loader.style.display = "none";
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                console.log("From Account, Success token: ", data.username);
                fetch('http://localhost:4000/api/decline_Request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender_data: username, recipient_data: data.username }),
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("From decline FR: Request sent"); //Sent to express server
                            return response.json();
                        } else {
                            loader.style.display = "none";
                            Pending_deny_3.style.display = "block";
                            setTimeout(function () {
                                Pending_deny_3.style.display = "none";
                            }, 4000);
                            throw new Error('Network response was not ok');
                        }
                    })
                    .then(data => {
                        if (data.message === 1) {
                            loader.style.display = "none";
                            Pending_deny_1.style.display = "block";
                            check_pending();
                            setTimeout(function () {
                                Pending_deny_1.style.display = "none";
                            }, 4000);

                        } else if (data.message === 0) {
                            loader.style.display = "none";
                            Pending_deny_3.style.display = "block";
                            setTimeout(function () {
                                Pending_deny_3.style.display = "none";
                            }, 4000);
                        } else if (data.message === 3) {
                            Pending_deny_3.style.display = "block";
                            setTimeout(function () {
                                Pending_deny_3.style.display = "none";
                            }, 4000);
                        }
                    })
                    .catch(error => { //catch error with response
                        loader.style.display = "none";
                        Pending_deny_3.style.display = "block";
                        setTimeout(function () {
                            Pending_deny_3.style.display = "none";
                        }, 4000);
                        console.log("decline FR: Error with server");
                    });
            } else if (data.success === 0) {
                loader.style.display = "none";
            }
        });


}




/*Add User*/


function Connect_to_Chat(friend, id) {

    const idle_chat = document.getElementById("Idle_Chat");
    const idle_tab = document.getElementById("Idle_tab");


    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");


    const friend_id_field = document.getElementById("User_Chat");

    const notice = document.getElementById("Notice_Text");

    const personal_id = document.getElementById("Your_IP_Actual");

    const loader = document.getElementById("loader_friends_M");

    const current_text = document.getElementById("Current_User_Text");
    const current_img = document.getElementById("Current_User_Img");

    const not_online_notif = document.getElementById("Not_Online_Container");
    loader.style.display = "block";
    friend_id_field.value = "";
    getStatusAndLog_ForChat();
    async function getStatusAndLog_ForChat() {
        const status = await friend_status(friend);

        if (status === 0) {

            logout_marker.style.opacity = 0;
            msg_marker.style.opacity = 1;
            settings_marker.style.opacity = 0;
            friend_marker.style.opacity = 0;

            Setting_container.style.display = "none";
            friend_container.style.display = "none";
            Logout_container.style.display = "none";
            Raven_Container.style.display = "none";
            idle_chat.style.display = "block";

            loader.style.display = "none";
            notice.style.display = "none";
            idle_tab.style.display = "none";
            not_online_notif.style.display = "block";
            current_img.style.display = "block";
            current_text.textContent = friend;

        } else if (status === 1) {
            logout_marker.style.opacity = 0;
            msg_marker.style.opacity = 1;
            settings_marker.style.opacity = 0;
            friend_marker.style.opacity = 0;

            Setting_container.style.display = "none";
            friend_container.style.display = "none";
            Logout_container.style.display = "none";
            Raven_Container.style.display = "none";
            idle_chat.style.display = "none";

            loader.style.display = "none";
            notice.style.display = "block";
            not_online_notif.style.display = "none";
            current_img.style.display = "block";
            current_text.textContent = friend;
            get_id_chat(friend);
            async function get_id_chat(friend) {
                const id = await get_friend_id(friend);

                friend_id_field.value = id;


            }

        }

    }

}




async function get_friend_id(user) {
    try {
        const response = await fetch('http://localhost:4000/api/get_friend_id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: user }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success === 1) {
            console.log("Here is user id:", data.id);
            return data.id;
        } else if (data.success === 0) {
            console.error('User not found or internal server error');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



/*Socket IO */

document.addEventListener('DOMContentLoaded', function () {

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


    function formatDateAsZeroes() {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0'); // Get day with leading zero
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
        const year = today.getFullYear().toString(); // Get full year

        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }
    var socket = io();
    var form = document.getElementById('form');
    var input = document.getElementById('Msg_Area');
    var connect_btn = document.getElementById("Connect_Button");

    const Ip = document.getElementById("Your_IP_Actual");

    //Send Message--------------------------------------------------------
    var input = document.getElementById('Msg_Area');

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        var recipientId = document.getElementById('User_Chat'); //connect_IP

        var recipientId_value = recipientId.value;
        console.log("id here eweq: ", recipientId_value);
        if (input.value) {
            console.log("ID: ", recipientId_value);
            socket.emit('chat message', { recipientId: recipientId_value, content: input.value });
        }

        var item = document.createElement('li');
        var messages = document.getElementById('Sent');
        const spanElement = document.createElement('span');

        const time = getCurrentTime12Hour();
        const date = formatDateAsZeroes();

        item.classList.add('msg_style_sent');
        item.textContent = input.value;
        spanElement.classList.add('sent_time');
        spanElement.textContent = "Sent: " + time + " - " + date;
        item.appendChild(spanElement);
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
        input.value = '';
    }







    //Send Message--------------------------------------------------------

    //Check if User ID exists --------------------------------------------------------
    connect_btn.addEventListener('click', function (e) { //checks if recipient exists
        e.preventDefault();
        var recipientId = document.getElementById('connect_IP');
        var recipientId_value = recipientId.value;
        if (recipientId_value) {
            socket.emit('recipient', { recipient_id: recipientId_value });
        }
    });

    socket.on('recipient exist', function (data) {
        const recipientId = document.getElementById('connect_IP');
        const recipientId_value = recipientId.value;
        const connected_to = document.getElementById("Connected_to_text");
        const connected_to_text = document.getElementById("user_id_actual");
        const off = document.getElementById("Offline_Status");
        const on = document.getElementById("Online_Status");

        console.log(`Received message from user ${data.message}`);

        if (data.message === "1") {
            connect_1();
            connected_to_text.textContent = recipientId_value;
            connected_to.style.display = "block";
            off.style.display = "none";
            on.style.display = "block";
            console.log("we are connected");
        } else if (data.message === "0") {
            connect_3();
            off.style.display = "block";
            on.style.display = "none";
            console.log("did not connect or doesn't exist");
        }
    });
    //Check if User ID exists --------------------------------------------------------

    socket.on("")

    socket.on('chat message', function (data) {
        console.log(`Received message from user ${data.senderId}: ${data.content}`);
    });

    socket.on('user connected', function (userId) {

        console.log('Received user ID:', userId);
        Ip.textContent = userId;
        Re_Write_UserID()

    });

    //Received messages--------------------------------------------------------
    socket.on('chat message', function (data) {
        const item = document.createElement('li');
        const spanElement = document.createElement('span');
        const messages = document.getElementById('Sent');

        const time = getCurrentTime12Hour();
        const date = formatDateAsZeroes();

        item.classList.add('msg_style_rec');
        item.textContent = data.content;

        spanElement.classList.add('rec_time');
        spanElement.textContent = "Received: " + time + " - " + date;

        item.appendChild(spanElement);
        messages.appendChild(item);

        // Scroll to the bottom of the container (assuming 'Sent' is the container element)
        messages.scrollTop = messages.scrollHeight;
    });
    //Received messages--------------------------------------------------------

});

/*Socket IO */
