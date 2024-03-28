
//Loading Page Animation---------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    const loadingContainer = document.querySelector(".loading-container");
    loadingContainer.style.display = "flex"; // Show the loading page
});

window.onload = () => {
    const loadingContainer = document.querySelector(".loading-container");
    loadingContainer.style.display = "none"; // Hide the loading page
};


const Login_Cookie = getJwtCookie('Login_Token');

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

    fetch('http://50.18.247.63:4000/api/log_out', {
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

};

function Re_Write_UserID(id) {
    const Username = document.getElementById("Username_Personal");
    const Ip = document.getElementById("Your_IP_Actual");
    const reload_cookie = getJwtCookie("Reload");
    const loadingContainer = document.getElementById("main_loader");

    const username_my_account = document.getElementById('My_Account_Name');
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;
    loadingContainer.style.display = "block";
    fetch('http://50.18.247.63:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {

                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {
                username_my_account.textContent = data.username;

                fetch('http://50.18.247.63:4000/api/user_id', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username, user_id: id }),
                })
                    .then(response => {
                        if (response.ok) {

                            return response.json();
                        } else {
                            loadingContainer.style.display = "none";
                            return response.json();
                        }
                    })
                    .then(data => {
                        if (data.success === 1) { //Login successful

                            deleteCookie("Reload");
                            loadingContainer.style.display = "none";
                        } else if (data.success === 0) { //Login failed

                            loadingContainer.style.display = "none";
                        }
                    })
                    .catch(error => { //catch error with response

                        loadingContainer.style.display = "none";
                    });

            } else if (data.success === 0) {
                // Login failed
            }
        });


}



/*Control Reload*/



const changed = getJwtCookie("reset_pass");
const pass_notice_top = document.getElementById("password_reset");
if (changed === null) {

} else if (changed !== null) {
    deleteCookie("reset_pass");
    pass_notice_top.style.display = "block";
    setTimeout(function () {
        pass_notice_top.style.display = "none";
    }, 3000);
}



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
    const connect_container = document.getElementById("Confirm_Remove_Friend_tab");
    connect_container.style.display = "none";
}



function Request_Connection() {
    const connect_container = document.getElementById("Confirm_Remove_Friend");
    connect_container.style.left = "50%";
}

/*denying connection*/



function open_privacy() {
    const privacy_tab = document.getElementById("Privacy_Info_Tab");
    privacy_tab.style.display = "block";
}

function close_privacy() {
    const privacy_tab = document.getElementById("Privacy_Info_Tab");
    privacy_tab.style.display = "none";
}


function open_policy() {
    const privacy_tab = document.getElementById("Policies_Info_Tab");
    privacy_tab.style.display = "block";
}

function close_policy() {
    const privacy_tab = document.getElementById("Policies_Info_Tab");
    privacy_tab.style.display = "none";
}


function open_git() {
    var url = "https://github.com/lleins/Messaging-App";
    window.open(url, "_blank");
}

/*Change profile image prompt*/

function change_profile_prompt() {
    const change_container = document.getElementById("Change_Profile_Img_Container");
    change_container.style.display = "block";
}

function close_profile_prompt() {
    const change_container = document.getElementById("Change_Profile_Img_Container");
    change_container.style.display = "none";
}


function displayImage(input) {
    const fileInput = input;
    const selectedImage = document.getElementById('New_User_Img');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    } else {
        selectedImage.src = 'Images/user_big.png'; // Clear the image if no file is selected
    }
}

/*Change profile image prompt*/









/*My Account*/
/*
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
*/
function My_Account() {
    const username_my_account = document.getElementById('My_Account_Name');
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;
    if (Login_Cookie === null) {

    } else if (Login_Cookie !== null) {

        fetch('http://50.18.247.63:4000/api/account_information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userData }), //sends login token to server.js
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {

                    return response.json();
                }
            })
            .then((data) => {
                if (data.success === 1) {
                    username_my_account.textContent = data.username;

                } else if (data.success === 0) {
                    // Login failed
                }
            });

    }

}
My_Account();
/*My Account*/




/*open menu mobile*/

function open_side_nav() {
    const left_nav_main_1 = document.getElementById("Left_NavBar");
    const left_nav_main_2 = document.getElementById("Scrollable_Nav");
    const left_nav_secondary = document.getElementById("Left_Menu");
    const nav_button = document.getElementById("tab_mobile");
    const nav_button_style = getComputedStyle(nav_button);



    if (nav_button_style.left === "25px") {
        left_nav_main_1.style.left = "60px";
        left_nav_main_2.style.left = "60px";
        left_nav_secondary.style.left = "0px";
        nav_button.style.left = "325px";

    } else if (nav_button_style.left === "325px") {
        left_nav_main_1.style.left = "-250px";
        left_nav_main_2.style.left = "-250px";
        left_nav_secondary.style.left = "-250px";
        nav_button.style.left = "25px";

    }
}

function close_side_nav() {
    const left_nav_main_1 = document.getElementById("Left_NavBar");
    const left_nav_main_2 = document.getElementById("Scrollable_Nav");
    const left_nav_secondary = document.getElementById("Left_Menu");
    const nav_button = document.getElementById("tab_mobile");
    const nav_button_style = getComputedStyle(nav_button);

    if (nav_button_style.display === "block") {
        left_nav_main_1.style.left = "-250px";
        left_nav_main_2.style.left = "-250px";
        left_nav_secondary.style.left = "-250px";
        nav_button.style.left = "25px";
    } else {

    }

}


/*open menu mobile*/


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

function end_call() {
    const call_container = document.getElementById("call_user_container");
    const Receive_Area = document.getElementById("Receive_Area");
    Receive_Area.style.top = "19%";
    Receive_Area.style.height = "73%";
    call_container.style.display = "none";
}

function start_call() {
    const call_container = document.getElementById("call_user_container");
    const Receive_Area = document.getElementById("Receive_Area");
    const message_area = document.getElementById("Msg_Area");

    call_container.style.display = "block";
    Receive_Area.style.top = "calc(19% + 150px)";
    Receive_Area.style.height = "calc(73% - 170px)";
    message_area.focus();
    message_area.value = "";
    message_area.value = "📞 Started a call ----------";

    // Create a new "Enter" key press event
    const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        code: "Enter",
        which: 13
    });

    // Dispatch the event to the textarea
    message_area.dispatchEvent(enterEvent);
}
/*Call User*/





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

function Sign_In_Remove() {
    const sign = document.getElementById("Signed_In");
    sign.style.display = "none";
}

function Created_Account_Remove() {
    const account = document.getElementById("Account_Created");
    account.style.display = "none";
}

function password_reset_Remove() {
    const account = document.getElementById("password_reset");
    account.style.display = "none";
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

function deleteCookie(name) {
    localStorage.removeItem(name);
}

function setJwtCookie(name, jwt, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    const expires = date.toUTCString();

    localStorage.setItem(name, jwt);
}

function getJwtCookie(name) {
    return localStorage.getItem(name);
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



const sign_in = document.getElementById("Login_pass_Input");


sign_in.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        Sign_In();
    }
});

const create_acc = document.getElementById("Create_Repass_Input");


create_acc.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        Creating_Account();
    }
});




const friend_request = document.getElementById("connect_IP_FR");

friend_request.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        Friend_Request();
    }
});

function Sign_In() {

    const Login_Container = document.getElementById("Login_Area");
    const Ip = document.getElementById("Your_IP_Actual");
    const pass_notice_img = document.getElementById("Pass_Notice_Login_Img");
    const email_wrong = document.getElementById("Pass_Wrong_Login_Notice");

    const cookie_error = document.getElementById("Cookie_Error");
    setJwtCookie("test", "1", 1);
    const test_cookie = getJwtCookie("test");


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

        fetch('http://50.18.247.63:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: email_input_value, password: pass_input_value, user_id: Ip.textContent }),
        })
            .then(response => {
                if (response.ok) {

                    return response.json();
                } else {

                    Loader.style.display = "none";
                    return response.json();
                }
            })
            .then(data => {
                if (data.success === 1) { //Login successful

                    Loader.style.display = "none";
                    const login_token = data.token;
                    setJwtCookie("Login_Token", login_token, 1);
                    Account_Information();
                    Friends_Left_Bar();
                    resetInactivityTimer();
                    get_profile_img();
                    email_input.value = "";
                    pass_input.value = "";

                    SignIn_Notif.style.display = "block";
                    Login_Container.style.display = "none";
                    setTimeout(function () {
                        SignIn_Notif.style.display = "none";
                    }, 4000);
                } else if (data.success === 0) { //Login failed

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

/*Uploading image in Settings*/
function uploadFile_input(inputElement) {
    var file = inputElement.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {


    }
    reader.readAsDataURL(file);
}
/*Uploading image in Settings*/


/*Profile image default*/

/*Creating Account*/
function getRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 5);
    return randomNumber;
}

function Creating_Account() {

    const list_profile_imgs = [];

    list_profile_imgs.push("Profile/blue.png");
    list_profile_imgs.push("Profile/green.png");
    list_profile_imgs.push("Profile/orange.png");
    list_profile_imgs.push("Profile/purple.png");
    list_profile_imgs.push("Profile/red.png");

    const profile_pic = list_profile_imgs[getRandomNumber()];



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
        fetch('http://50.18.247.63:4000/api/create_account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_create: email_input_value, password_create: pass_input_value, date_create: formattedDate, profile_pic: profile_pic }),
        })
            .then(response => {
                if (response.ok) {

                    return response.json();
                } else {

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

                    failed.style.display = "block";
                    error_3_Img.style.display = "block";
                    setTimeout(function () {
                        failed.style.display = "none";
                        error_3_Img.style.display = "none";
                    }, 4000);
                } else if (data.message === 3) { //Create account failed - Email already associated with another account
                    Loader.style.display = "none";

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

            });
    }
}


/*Creating Account*/





/*Getting Email from cookie jwt*/
function Account_Information() {
    const Username = document.getElementById("Username_Personal");
    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;
    const user_date = document.getElementById("My_Account_Password");

    if (Login_Cookie === null) {

    } else if (Login_Cookie !== null) {
        fetch('http://50.18.247.63:4000/api/account_information', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userData }), //sends login token to server.js
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {

                    return response.json();
                }
            })
            .then((data) => {
                if (data.success === 1) {
                    user_date.textContent = "";
                    user_date.textContent = data.date;
                    Username.textContent = data.username;
                } else if (data.success === 0) {
                    // Login failed
                }
            });
    }


}

/*Getting Email from cookie jwt*/




/*Switch Settings tabs*/

function My_Account() {

    const My_Account_Container = document.getElementById("My_Account_Container");
    const Privacy_Container = document.getElementById("Privacy_Container");
    const Cookie_Policy_Container = document.getElementById("Cookie_Container");

    const My_Account_btn = document.getElementById("My_Account_btn");
    const Privacy_btn = document.getElementById("Privacy_btn");
    const Cookie_Policy_btn = document.getElementById("Cookie_btn");

    My_Account_btn.style.backgroundColor = "rgba(40, 40, 40, 1)";
    Privacy_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";
    Cookie_Policy_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";

    My_Account_Container.style.display = "block";
    Privacy_Container.style.display = "none";
    Cookie_Policy_Container.style.display = "none";
}

function Privacy() {

    const My_Account_Container = document.getElementById("My_Account_Container");
    const Privacy_Container = document.getElementById("Privacy_Container");
    const Cookie_Policy_Container = document.getElementById("Cookie_Container");

    const My_Account_btn = document.getElementById("My_Account_btn");
    const Privacy_btn = document.getElementById("Privacy_btn");
    const Cookie_Policy_btn = document.getElementById("Cookie_btn");

    My_Account_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";
    Privacy_btn.style.backgroundColor = "rgba(40, 40, 40, 1)";
    Cookie_Policy_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";


    My_Account_Container.style.display = "none";
    Privacy_Container.style.display = "block";
    Cookie_Policy_Container.style.display = "none";
}


function Cookie_Policy() {

    const My_Account_Container = document.getElementById("My_Account_Container");
    const Privacy_Container = document.getElementById("Privacy_Container");
    const Cookie_Policy_Container = document.getElementById("Cookie_Container");

    const My_Account_btn = document.getElementById("My_Account_btn");
    const Privacy_btn = document.getElementById("Privacy_btn");
    const Cookie_Policy_btn = document.getElementById("Cookie_btn");

    My_Account_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";
    Privacy_btn.style.backgroundColor = "rgba(40, 40, 40, 0)";
    Cookie_Policy_btn.style.backgroundColor = "rgba(40, 40, 40, 1)";


    My_Account_Container.style.display = "none";
    Privacy_Container.style.display = "none";
    Cookie_Policy_Container.style.display = "block";
}




/*Switch Settings tabs*/



/*Raven Cover Tab*/

function Raven_Tab() {
    close_side_nav();
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");
    const Remove_Container = document.getElementById("Confirm_Remove_Friend_tab");


    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Remove_Container.style.display = "none";
    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "block";
}

/*Raven Cover Tab*/


/*Open Messages*/
function message_tab() {
    close_side_nav();
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");
    const Remove_Container = document.getElementById("Confirm_Remove_Friend_tab");


    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 1;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Remove_Container.style.display = "none";
    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}
/*Open Messages*/


/*Settings function - open_close*/

function Open_Settings() {
    close_side_nav();
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");
    const Remove_Container = document.getElementById("Confirm_Remove_Friend_tab");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 1;
    friend_marker.style.opacity = 0;

    Remove_Container.style.display = "none";
    Setting_container.style.display = "block";
    friend_container.style.display = "none";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}


/*Settings function - open_close*/



/*Add Friend*/

function add_friend_tab() {
    close_side_nav();
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");
    const Remove_Container = document.getElementById("Confirm_Remove_Friend_tab");

    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 0;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 1;


    Remove_Container.style.display = "none";
    Setting_container.style.display = "none";
    friend_container.style.display = "block";
    Logout_container.style.display = "none";
    Raven_Container.style.display = "none";
}

/*Add Friend*/

/*Logout*/

function Logout_Open_Tab() {
    close_side_nav();
    const friend_container = document.getElementById("Add_Friend_Tab");
    const Setting_container = document.getElementById("Settings_Tab");
    const Logout_container = document.getElementById("Logout_Tab");
    const Raven_Container = document.getElementById("Not_Chatting_Cover");
    const Remove_Container = document.getElementById("Confirm_Remove_Friend_tab");


    const friend_marker = document.getElementById("Friend_Marker");
    const msg_marker = document.getElementById("Message_Marker");
    const settings_marker = document.getElementById("Settings_Marker");
    const logout_marker = document.getElementById("Logout_Marker");

    logout_marker.style.opacity = 1;
    msg_marker.style.opacity = 0;
    settings_marker.style.opacity = 0;
    friend_marker.style.opacity = 0;

    Remove_Container.style.display = "none";
    Setting_container.style.display = "none";
    friend_container.style.display = "none";
    Logout_container.style.display = "block";
    Raven_Container.style.display = "none";
}

/*Logout*/


/*Get Status of friends*/

async function friend_status(id) {
    try {
        const response = await fetch('http://50.18.247.63:4000/api/get_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: id }),
        });

        const data = await response.json();

        if (data.success === 1) {

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



    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;




    loader.style.display = "none";

    fetch('http://50.18.247.63:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {

                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                fetch('http://50.18.247.63:4000/api/Get_Friends', {  //uses username from the cookie to check
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username }),
                })
                    .then((response) => {
                        if (response.ok) {

                            return response.json();
                        } else {

                            none_text.style.display = "block";
                            loader.style.display = "none";
                            return response.json();

                        }
                    })
                    .then((data) => {
                        if (data.success === 1) { //some pending
                            none_text.style.display = "none";
                            loader.style.display = "none";
                            ;
                            data.sent.forEach(friendItem => {
                                // Create the div element

                                const Chat_Container = document.getElementById("Receive_Area");

                                const friendDiv = document.createElement("div");
                                friendDiv.addEventListener('click', () => Connect_to_Chat(friendItem.friend, imgElement.src));
                                friendDiv.classList.add("added_ip");
                                const imgElement = document.createElement("img");

                                fetch('http://50.18.247.63:4000/api/profile_image', { //getting user acc name
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ username: friendItem.friend }), //sends login token to server.js
                                })
                                    .then((response) => {
                                        if (response.ok) {

                                            return response.json();
                                        } else {

                                            return response.json();
                                        }
                                    })
                                    .then((data) => {
                                        if (data.success === 1) {

                                            imgElement.src = data.pic;
                                            imgElement.classList.add("user_img");
                                            friendDiv.appendChild(imgElement);
                                        } else if (data.success === 0) {
                                            // Login failed
                                        }
                                    });

                                // Create and set the p element for the user_ip
                                const userIpP = document.createElement("p");
                                userIpP.classList.add("user_ip");
                                userIpP.textContent = friendItem.friend;
                                friendDiv.appendChild(userIpP);

                                const text_notif = document.createElement("p");
                                text_notif.classList.add("user_notif");
                                text_notif.id = friendItem.friend + "_notif";
                                text_notif.textContent = "!";
                                friendDiv.appendChild(text_notif);

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


                                        //Create chat area Receive_Area
                                        const chat_friend_tab = document.createElement("ul");
                                        chat_friend_tab.classList.add("rec_sent_style");
                                        chat_friend_tab.id = friendItem.friend + "_sent";
                                        Chat_Container.appendChild(chat_friend_tab);
                                        chat_friend_tab.style.display = "none";


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

                                        //If chat tab exists, remove it
                                        const delete_friend_chat = document.getElementById(friendItem.friend + "_sent");

                                        if (delete_friend_chat) {
                                            Chat_Container.removeChild(delete_friend_chat);
                                        } else {

                                        }

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

                        } else if (data.success === 3) { //server error
                            none_text.style.display = "block";
                            loader.style.display = "none";

                        } else if (data.success === 4) { //server error
                            none_text.style.display = "block";
                            loader.style.display = "none";

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
    const confirm_Remove_container = document.getElementById("Confirm_Remove_Friend_tab");
    const confirm_Remove_username = document.getElementById("Chat_Request_actual");
    const Remove_Friend_Button = document.getElementById("Join_Chat");
    const loader = document.getElementById("Confirm_Remove_Friend_Loader");
    const error_notif = document.getElementById("Error_Remove");

    confirm_Remove_username.textContent = username;
    confirm_Remove_container.style.display = "block";

    Remove_Friend_Button.addEventListener('click', () => {
        fetch('http://50.18.247.63:4000/api/Remove_Friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: personal_username.textContent, friend: username }),
        })
            .then(response => {
                if (response.ok) {

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
        fetch('http://50.18.247.63:4000/api/Send_Friend_Request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ recipient: recipient_value, sender: sender_username.textContent }),
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {

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

    if (Login_Cookie === null) {

    } else if (Login_Cookie !== null) {
        fetch('http://50.18.247.63:4000/api/account_information', { //gets username from the cookie
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userData }), //sends login token to server.js
        })
            .then((response) => {
                if (response.ok) {

                    return response.json();
                } else {

                    return response.json();
                }
            })
            .then((data) => {
                if (data.success === 1) {

                    const none = document.getElementById("pending_none_text");

                    const username = document.getElementById("Username_Personal");

                    fetch('http://50.18.247.63:4000/api/Check_Pending', {          //uses username from the cookie to check
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ recipient: data.username }),
                    })
                        .then((response) => {
                            if (response.ok) {

                                return response.json();
                            } else {

                                none.style.display = "block";
                                return response.json();

                            }
                        })
                        .then((data) => {
                            if (data.success === 1) { //some pending

                                none.style.display = "none";

                                const container = document.getElementById("Pending_Tab");

                                // Iterate through the data.pending array and create the HTML for each item
                                data.pending.forEach(pendingItem => {
                                    // Create the div element
                                    const pendingDiv = document.createElement("div");
                                    pendingDiv.classList.add("Pending_FR_Style");



                                    // Create and set the p element for the username
                                    const usernameP = document.createElement("p");
                                    usernameP.classList.add("Account_Username");
                                    usernameP.textContent = pendingItem.sender; // Set the sender text
                                    pendingDiv.appendChild(usernameP);

                                    fetch('http://50.18.247.63:4000/api/profile_image', { //getting user acc name
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ username: pendingItem.sender }), //sends login token to server.js
                                    })
                                        .then((response) => {
                                            if (response.ok) {

                                                return response.json();
                                            } else {

                                                return response.json();
                                            }
                                        })
                                        .then((data) => {
                                            if (data.success === 1) {


                                                const imgElement = document.createElement("img");
                                                imgElement.src = data.pic;
                                                imgElement.classList.add("Account_Img");
                                                pendingDiv.appendChild(imgElement);

                                            } else if (data.success === 0) {
                                                // Login failed
                                            }
                                        });

                                    const alertImg = document.createElement("img");
                                    alertImg.src = "Images/warning.png";
                                    alertImg.classList.add("alert_Img");
                                    pendingDiv.appendChild(alertImg);

                                    // Create and set the p element for the friend request text
                                    const frTextP = document.createElement("p");
                                    frTextP.classList.add("FR_Text");
                                    frTextP.textContent = "Pending";
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

                            } else if (data.success === 3) { //server error
                                none.style.display = "block";

                            } else if (data.success === 4) { //server error
                                none.style.display = "block";

                            }
                        });
                } else if (data.success === 0) {
                    // Login failed
                }
            });
    }




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

    fetch('http://50.18.247.63:4000/api/account_information', { //gets username from the cookie
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {

                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                const none = document.getElementById("sent_none_text");

                const username = document.getElementById("Username_Personal");

                fetch('http://50.18.247.63:4000/api/Check_Sent', {          //uses username from the cookie to check
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender: data.username }),
                })
                    .then((response) => {
                        if (response.ok) {

                            return response.json();
                        } else {

                            none.style.display = "block";
                            return response.json();

                        }
                    })
                    .then((data) => {
                        if (data.success === 1) { //some pending

                            none.style.display = "none";

                            const dynamicContent = document.getElementById("Sent_Tab");
                            data.sent.forEach(recipient => {
                                const div = document.createElement('div');
                                div.className = 'Pending_Sent_Style';

                                // Create and append the user image


                                // Create and append the username paragraph
                                const usernameP = document.createElement('p');
                                usernameP.className = 'Account_Username_Sent';
                                usernameP.textContent = recipient.recipient; // Use the actual property from your data
                                div.appendChild(usernameP);


                                fetch('http://50.18.247.63:4000/api/profile_image', { //getting user acc name
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ username: recipient.recipient }), //sends login token to server.js
                                })
                                    .then((response) => {
                                        if (response.ok) {

                                            return response.json();
                                        } else {

                                            return response.json();
                                        }
                                    })
                                    .then((data) => {
                                        if (data.success === 1) {
                                            const userImg = document.createElement('img');
                                            userImg.src = data.pic;
                                            userImg.className = 'Account_Img_Sent';
                                            div.appendChild(userImg);
                                        } else if (data.success === 0) {
                                            // Login failed
                                        }
                                    });

                                const alertImg = document.createElement('img');
                                alertImg.src = "Images/warning.png";
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
                                sentText.textContent = 'Pending...';
                                div.appendChild(sentText);

                                // Append the dynamically created elements to the container div
                                dynamicContent.appendChild(div);

                            });
                        } else if (data.success === 0) { //None pending
                            none.style.display = "block";

                        } else if (data.success === 3) { //server error
                            none.style.display = "block";

                        } else if (data.success === 4) { //server error
                            none.style.display = "block";

                        }
                    });
            } else if (data.success === 0) {
                // Login failed
            }
        });
}


check_sent();
/*Sent Requests*/




/*Display profile img*/
function get_profile_img() {
    const settings_myacc_img = document.getElementById("My_Account_Img");
    const Change_myacc_img = document.getElementById("New_User_Img");

    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;

    fetch('http://50.18.247.63:4000/api/account_information', { //getting user acc name
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {

                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                fetch('http://50.18.247.63:4000/api/profile_image', { //getting user acc name
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username }), //sends login token to server.js
                })
                    .then((response) => {
                        if (response.ok) {

                            return response.json();
                        } else {

                            return response.json();
                        }
                    })
                    .then((data) => {
                        if (data.success === 1) {

                            settings_myacc_img.src = "";
                            settings_myacc_img.src = data.pic;
                            Change_myacc_img.src = "";
                            Change_myacc_img.src = data.pic;
                        } else if (data.success === 0) {
                            // Login failed
                        }
                    });
            } else if (data.success === 0) {
                // Login failed
            }
        });
}
get_profile_img();
/*Display profile img*/


/*open emoji*/
function open_emoji_container() {
    const emoji_container = document.getElementById("emoji_container");

    if (emoji_container.style.display === "none" || emoji_container.style.display === "") {
        emoji_container.style.display = "block";

    } else if (emoji_container.style.display === "block") {
        emoji_container.style.display = "none";

    }

}


function add_emoji_msg(id) {
    const emoji = document.getElementById(id);
    var textarea = document.getElementById('Msg_Area');

    textarea.value += emoji.textContent;
}

/*open emoji*/



/*open file*/
function open_upload_file() {
    const upload_file_container = document.getElementById("Upload_File_Send_Container");

    if (upload_file_container.style.display === "none" || upload_file_container.style.display === "") {
        upload_file_container.style.display = "block";

    } else if (upload_file_container.style.display === "block") {
        upload_file_container.style.display = "none";

    }
}


function openFileExplorer() {

    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const selectedFiles = event.target.files;
    const attachment_container = document.getElementById("Attachments_Container");
    const preview_attachment = document.getElementById("attachment_Img");
    const error = document.getElementById("file_large");
    const maxSizeBytes = 1024 * 1024; // 1MB

    if (selectedFiles.length > 0) {
        const firstSelectedFile = selectedFiles[0];

        // Check if file size exceeds 1MB
        if (firstSelectedFile.size > maxSizeBytes) {
            error.style.display = "block";
            attachment_container.style.display = "none";
            setTimeout(function () {
                error.style.display = "none";
            }, 5000);
            return;
        }

        const reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = function (e) {
            // Render thumbnail.
            attachment_container.style.display = "block";
            preview_attachment.src = e.target.result;
            preview_attachment.dataset.imageDataUrl = e.target.result;
        };

        // Read in the file as a data URL.
        reader.readAsDataURL(firstSelectedFile);
    }
}


function delete_attatchment() {
    const attachment_container = document.getElementById("Attachments_Container");
    const preview_attachment = document.getElementById("attachment_Img");
    attachment_container.style.display = "none";
    preview_attachment.src = "";

}



function fullscreen_on_image(src) {
    const container = document.getElementById("view_img_full");
    container.style.display = "block";

    const img = document.getElementById("main_img_full");
    img.src = "";
    img.src = src;
}

function close_fullscreen_on_image() {
    const container = document.getElementById("view_img_full");
    container.style.display = "none";
}



function downloadImage(dataUrl, filename) {

    const anchor = document.createElement('a');
    anchor.href = dataUrl;


    anchor.download = filename;

    anchor.click();
}

/*open file*/



/*Add User*/

function add_user(friend) {
    const loader = document.getElementById("loader_friend_tab");

    const Pending_add_1 = document.getElementById("Pending_add_1");
    const Pending_add_3 = document.getElementById("Pending_add_3");

    const Login_Cookie = getJwtCookie("Login_Token"); //Getting Login Token
    const userData = Login_Cookie;




    fetch('http://50.18.247.63:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {
                loader.style.display = "none";
                Pending_add_3.style.display = "block";
                setTimeout(function () {
                    Pending_add_3.style.display = "none";
                }, 4000);

                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {

                const formattedDate = formatDateAsZeroes();
                loader.style.display = "block";
                fetch('http://50.18.247.63:4000/api/Add_User', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: data.username, friend: friend, date_create: formattedDate }),
                })
                    .then(response => {
                        if (response.ok) {

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



    loader.style.display = "block";
    fetch('http://50.18.247.63:4000/api/account_information', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userData }), //sends login token to server.js
    })
        .then((response) => {
            if (response.ok) {

                return response.json();
            } else {

                Pending_deny_3.style.display = "block";
                loader.style.display = "none";
                return response.json();
            }
        })
        .then((data) => {
            if (data.success === 1) {


                fetch('http://50.18.247.63:4000/api/decline_Request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sender_data: username, recipient_data: data.username }),
                })
                    .then(response => {
                        if (response.ok) {

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

                    });
            } else if (data.success === 0) {
                loader.style.display = "none";
            }
        });


}

function change_pass_actual() {
    const username = document.getElementById("Username_Personal");
    const input_1 = document.getElementById("Change_pass1_input");
    const input_2 = document.getElementById("Change_pass2_input");

    const loader = document.getElementById("Loader_Area");

    const error_img = document.getElementById("error_img");
    const error_match = document.getElementById("error_match");
    const error_er = document.getElementById("error_er");

    if (input_1.value === "" && input_2.value === "") {

    } else if (input_1.value !== "" && input_2.value === "") {
        error_img.style.display = "block";
        error_match.style.display = "block";
        setTimeout(function () {
            error_img.style.display = "none";
            error_match.style.display = "none";
        }, 4000);
    } else if (input_1.value === "" && input_2.value !== "") {
        error_img.style.display = "block";
        error_match.style.display = "block";
        setTimeout(function () {
            error_img.style.display = "none";
            error_match.style.display = "none";
        }, 4000);
    } else if ((input_1.value !== "" && input_2.value !== "") && (input_1.value !== input_2.value)) {
        error_img.style.display = "block";
        error_match.style.display = "block";
        setTimeout(function () {
            error_img.style.display = "none";
            error_match.style.display = "none";
        }, 4000);
    } else if ((input_1.value !== "" && input_2.value !== "") && (input_1.value === input_2.value)) {
        loader.style.display = "block";

        const newPassword = input_2.value;
        const username_actual = username.textContent;
        fetch('http://50.18.247.63:4000/api/update_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username_actual, newPassword: newPassword })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to update password');
                }
            })
            .then(data => {
                if (data.success === 1) {
                    setJwtCookie("reset_pass", "", 1);
                    loader.style.display = "none";
                    Log_Out();
                } else {
                    loader.style.display = "none";
                    error_img.style.display = "block";
                    error_er.style.display = "block";
                    setTimeout(function () {
                        error_img.style.display = "none";
                        error_er.style.display = "none";
                    }, 4000);

                }
            })
            .catch(error => {

                loader.style.display = "none";
                error_img.style.display = "block";
                error_er.style.display = "block";
                setTimeout(function () {
                    error_img.style.display = "none";
                    error_er.style.display = "none";
                }, 4000);
            });
    }



}


function account_name() {
    const name = document.getElementById("Username_Personal");
    const acc_name = document.getElementById("My_Account_Name");
    acc_name.textContent = name.textContent;
}

function change_pass() {
    const container = document.getElementById("Change_Password_Container");
    container.style.display = "block";
}

function close_change_pass() {
    const container = document.getElementById("Change_Password_Container");
    const input_1 = document.getElementById("Change_pass1_input");
    const input_2 = document.getElementById("Change_pass2_input");
    container.style.display = "none";
    input_1.value = "";
    input_2.value = "";
}


/*Add User*/
function Connect_to_Chat(friend, src) {
    return new Promise(async (resolve, reject) => {
        var chats = document.querySelectorAll('.rec_sent_style');
        chats.forEach(function (element) {
            element.style.display = 'none';
        });

        const idle_chat = document.getElementById("Idle_Chat");
        const idle_tab = document.getElementById("Idle_tab");

        const friend_profile_img = document.getElementById("Current_User_Img");

        const friend_container = document.getElementById("Add_Friend_Tab");
        const Setting_container = document.getElementById("Settings_Tab");
        const Logout_container = document.getElementById("Logout_Tab");
        const Raven_Container = document.getElementById("Not_Chatting_Cover");

        const friend_marker = document.getElementById("Friend_Marker");
        const msg_marker = document.getElementById("Message_Marker");
        const settings_marker = document.getElementById("Settings_Marker");
        const logout_marker = document.getElementById("Logout_Marker");

        const friend_id_field = document.getElementById("User_Chat");

        const personal_id = document.getElementById("Your_IP_Actual");

        const loader = document.getElementById("loader_friends_M");

        const current_text = document.getElementById("Current_User_Text");
        const current_img = document.getElementById("Current_User_Img");

        const not_online_notif = document.getElementById("Not_Online_Container");
        loader.style.display = "block";
        friend_id_field.value = "";
        getStatusAndLog_ForChat();
        close_side_nav();
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

                not_online_notif.style.display = "none";
                current_img.style.display = "block";
                current_text.textContent = friend;
                friend_profile_img.src = src;
                const chat_tab_id = document.getElementById("User_Sent");
                chat_tab_id.value = "";
                chat_tab_id.value = friend + "_sent";
                const chat_tab = document.getElementById(chat_tab_id.value);
                chat_tab.style.display = "block";
                get_id_chat(friend);

                async function get_id_chat(friend) {
                    const id = await get_friend_id(friend);
                    friend_id_field.value = id;
                    resolve();  // Resolve the promise here, after the last async operation
                }
                get_id_chat(friend);
            }
        }
        getStatusAndLog_ForChat();
    });
}








async function get_friend_id(user) {
    try {
        const response = await fetch('http://50.18.247.63:4000/api/get_friend_id', {
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

            return data.id;
        } else if (data.success === 0) {
            console.error('User not found or internal server error');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function play_rec_sound() {

    var rec_msg_sound = document.getElementById('recevied_msg_sound');
    rec_msg_sound.play();
}


function encryptAES(text, key) {
    return CryptoJS.AES.encrypt(text, key).toString();
}

// AES Decryption function
function decryptAES(ciphertext, key) {
    var bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}
const key = "dasdikje23i1j_!sdsqqd!---2S";

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

    const friend_name = document.getElementById("Current_User_Text");
    const friend_img = document.getElementById("Current_User_Img");
    var imgElement = document.getElementById("send_img_btn");
    imgElement.addEventListener('click', function () {
        Connect_to_Chat(friend_name.textContent, friend_img.src)
            .then(() => {
                sendImg();
            });
    });

    function sendImg() {
        const friend = document.getElementById("Current_User_Text");
        const notif = document.getElementById(friend.textContent + "_notif");
        notif.style.display = "none";
        const username_actual = document.getElementById('Username_Personal'); //Sent Messages
        const get_personal_img = document.getElementById('My_Account_Img');
        const get_personal_img_src = get_personal_img.src;
        const encryptedText_name = encryptAES(username_actual.textContent, key);
        const encryptedText_src = encryptAES(get_personal_img_src, key);
        const imageDataUrl = document.getElementById('attachment_Img').dataset.imageDataUrl;

        const imageDataUrl_src = document.getElementById('attachment_Img');

        var recipientId = document.getElementById('User_Chat'); //connect_IP
        var recipientId_value = recipientId.value;
        if (imageDataUrl !== "") {
            console.log("image data sending: ", imageDataUrl);
            const encryptedText = encryptAES(imageDataUrl, key);
            socket.emit('chat image', { recipientId: recipientId_value, content: encryptedText, name: encryptedText_name, img: encryptedText_src });
            const id_sent = document.getElementById("User_Sent");

            const messages = document.getElementById(id_sent.value);

            // Create the <li> element
            const listItem = document.createElement('li');
            listItem.classList.add('msg_style_sent');

            // Create and add the content <p> element
            const contentParagraph = document.createElement('img');
            contentParagraph.classList.add('sent_img_style');
            contentParagraph.src = imageDataUrl_src.src;
            contentParagraph.onclick = function () {
                fullscreen_on_image(contentParagraph.src);
            };
            listItem.appendChild(contentParagraph);

            // Create and add the user image <img> element
            const userImage = document.createElement('img');
            userImage.classList.add('Sent_User_Img');
            userImage.src = get_personal_img_src; // Set the user image source accordingly
            listItem.appendChild(userImage);

            // Create and add the user name <p> element
            const userNameParagraph = document.createElement('p');
            userNameParagraph.classList.add('User_Name_Sent');
            userNameParagraph.textContent = username_actual.textContent; // Set the user name accordingly
            listItem.appendChild(userNameParagraph);

            // Create and add the time <p> element
            const timeParagraph = document.createElement('span');
            timeParagraph.classList.add('sent_time');
            const time = getCurrentTime12Hour();
            const date = formatDateAsZeroes();
            timeParagraph.textContent = date + " " + time;
            userNameParagraph.appendChild(timeParagraph);

            // Append the <li> element to the messages container
            messages.appendChild(listItem);

            // Scroll to the bottom of the container
            messages.scrollTop = messages.scrollHeight;

            delete_attatchment();
        } else if (input.value.trim() === "") {

        }

    }




    //Send Message--------------------------------------------------------
    var input = document.getElementById('Msg_Area');

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            Connect_to_Chat(friend_name.textContent, friend_img.src)
                .then(() => {
                    sendMessage();
                });
        }
    });
    function sendMessage() {
        const friend = document.getElementById("Current_User_Text");
        const notif = document.getElementById(friend.textContent + "_notif");
        notif.style.display = "none";
        const username_actual = document.getElementById('Username_Personal'); //Sent Messages
        const get_personal_img = document.getElementById('My_Account_Img');
        const get_personal_img_src = get_personal_img.src;
        var recipientId = document.getElementById('User_Chat'); //connect_IP
        var recipientId_value = recipientId.value;

        if (input.value.trim() !== "") {
            const encryptedText = encryptAES(input.value, key);
            const encryptedText_name = encryptAES(username_actual.textContent, key);
            const encryptedText_src = encryptAES(get_personal_img_src, key);
            socket.emit('chat message', { recipientId: recipientId_value, content: encryptedText, name: encryptedText_name, img: encryptedText_src });
            const id_sent = document.getElementById("User_Sent");

            const messages = document.getElementById(id_sent.value);

            // Create the <li> element
            const listItem = document.createElement('li');
            listItem.classList.add('msg_style_sent');

            // Create and add the content <p> element
            const contentParagraph = document.createElement('p');
            contentParagraph.classList.add('sent_text_style');
            contentParagraph.textContent = input.value;
            listItem.appendChild(contentParagraph);

            // Create and add the user image <img> element
            const userImage = document.createElement('img');
            userImage.classList.add('Sent_User_Img');
            userImage.src = get_personal_img_src; // Set the user image source accordingly
            listItem.appendChild(userImage);

            // Create and add the user name <p> element
            const userNameParagraph = document.createElement('p');
            userNameParagraph.classList.add('User_Name_Sent');
            userNameParagraph.textContent = username_actual.textContent; // Set the user name accordingly
            listItem.appendChild(userNameParagraph);

            // Create and add the time <p> element
            const timeParagraph = document.createElement('span');
            timeParagraph.classList.add('sent_time');
            const time = getCurrentTime12Hour();
            const date = formatDateAsZeroes();
            timeParagraph.textContent = date + " " + time;
            userNameParagraph.appendChild(timeParagraph);

            // Append the <li> element to the messages container
            messages.appendChild(listItem);

            // Scroll to the bottom of the container
            messages.scrollTop = messages.scrollHeight;

            input.value = '';
        } else if (input.value.trim() === "") {

        }

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



        if (data.message === "1") {
            connect_1();
            connected_to_text.textContent = recipientId_value;
            connected_to.style.display = "block";
            off.style.display = "none";
            on.style.display = "block";

        } else if (data.message === "0") {
            connect_3();
            off.style.display = "block";
            on.style.display = "none";

        }
    });
    //Check if User ID exists --------------------------------------------------------

    socket.on("")

    socket.on('chat message', function (data) {

    });

    socket.on('user connected', function (userId) {
        Ip.textContent = userId;
        Re_Write_UserID(userId);

    });

    //Received messages-------------------------------------------------------
    socket.on('chat message', function (data) {
        const text_decoded_name = decryptAES(data.name, key);
        const notif = document.getElementById(text_decoded_name + "_notif");
        const text_decoded_img = decryptAES(data.img, key);
        const messages = document.getElementById(text_decoded_name + "_sent");
        const get_profile_img = document.getElementById("Current_User_Img");
        const get_profile_img_src = get_profile_img.src;

        notif.style.display = "block";

        // Create the <li> element
        const listItem = document.createElement('li');
        listItem.classList.add('msg_style_rec');

        // Create and add the content <p> element
        const contentParagraph = document.createElement('p');
        contentParagraph.classList.add('rec_text_style');
        const text_decoded = decryptAES(data.content, key);
        contentParagraph.textContent = text_decoded;
        listItem.appendChild(contentParagraph);

        // Create and add the user name <p> element
        const userNameParagraph = document.createElement('p');
        userNameParagraph.classList.add('User_Name_Rec');
        userNameParagraph.textContent = text_decoded_name // Assuming 'userName' is part of your data
        listItem.appendChild(userNameParagraph);

        // Create and add the user image <img> element
        const userImage = document.createElement('img');
        userImage.classList.add('Rec_User_Img');
        userImage.src = text_decoded_img; // Assuming 'userImageSrc' is part of your data
        listItem.appendChild(userImage);

        // Create and add the time <p> element
        const timeParagraph = document.createElement('span');
        timeParagraph.classList.add('rec_time');
        const time = getCurrentTime12Hour();
        const date = formatDateAsZeroes();
        timeParagraph.textContent = date + " " + time;
        userNameParagraph.appendChild(timeParagraph);

        // Append the <li> element to the messages container
        messages.appendChild(listItem);

        // Scroll to the bottom of the container
        messages.scrollTop = messages.scrollHeight;
        play_rec_sound();
    });
    //Received messages--------------------------------------------------------


    //Received Imgs-------------------------------------------------------
    socket.on('chat image', function (data) {

        const text_decoded_name = decryptAES(data.name, key);
        const text_decoded_img = decryptAES(data.img, key);
        const friend = document.getElementById("Current_User_Text");
        const notif = document.getElementById(friend.textContent + "_notif");
        const Rec_username = document.getElementById("Current_User_Text");
        const id_sent = document.getElementById("User_Sent");
        const messages = document.getElementById(text_decoded_name + "_sent");
        const get_profile_img = document.getElementById("Current_User_Img");
        const get_profile_img_src = get_profile_img.src;
        notif.style.display = "block";

        const text_decoded = decryptAES(data.content, key);
        console.log("image data received: ", text_decoded);
        // Create the <li> element
        const listItem = document.createElement('li');
        listItem.classList.add('msg_style_rec');

        // Create and add the content <p> element
        const contentParagraph = document.createElement('img');
        contentParagraph.classList.add('sent_img_style');
        contentParagraph.src = text_decoded;
        contentParagraph.onclick = function () {
            fullscreen_on_image(text_decoded);
        };
        listItem.appendChild(contentParagraph);

        // Create and add the user name <p> element
        const userNameParagraph = document.createElement('p');
        userNameParagraph.classList.add('User_Name_Rec');
        userNameParagraph.textContent = text_decoded_name; // Assuming 'userName' is part of your data
        listItem.appendChild(userNameParagraph);

        // Create and add the user image <img> element
        const userImage = document.createElement('img');
        userImage.classList.add('Rec_User_Img');
        userImage.src = text_decoded_img; // Assuming 'userImageSrc' is part of your data
        listItem.appendChild(userImage);

        const download = document.createElement('img');
        download.classList.add('download_img');
        download.src = "Images/download.png"; // Assuming 'userImageSrc' is part of your data
        download.onclick = function () {
            downloadImage(contentParagraph.src, "Raven_Img");
        };
        listItem.appendChild(download);

        // Create and add the time <p> element
        const timeParagraph = document.createElement('span');
        timeParagraph.classList.add('rec_time');
        const time = getCurrentTime12Hour();
        const date = formatDateAsZeroes();
        timeParagraph.textContent = date + " " + time;
        userNameParagraph.appendChild(timeParagraph);

        // Append the <li> element to the messages container
        messages.appendChild(listItem);

        // Scroll to the bottom of the container
        messages.scrollTop = messages.scrollHeight;
        play_rec_sound();
    });
    //Received image--------------------------------------------------------


});

/*Socket IO */
