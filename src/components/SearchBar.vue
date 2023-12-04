<template>
    <div>
        <textarea id="Msg_Area" type="text" placeholder="Send a message"></textarea>
        <img id="Send_Img" src="./Images/SendImg.png">
        <div id="Receive_Area">
            <ul id="Sent" class="rec_sent_style">
                <li class="msg_style_sent">good thanks- sent<span class="sent_time">Sent: 09:49pm</span> <span
                        class="loader"></span></li>
                <li class="msg_style_sent">good thanks- sent<span class="sent_time">Sent: 09:49pm</span></li>
                <li class="msg_style_sent">good thanks- sent<span class="sent_time">Sent: 09:49pm</span></li>
                <li class="msg_style_rec">good how are you - received<span class="rec_time">Received: 09:49pm</span></li>
                <li class="msg_style_sent">how are you - sent<span class="sent_time">Sent: 09:49pm</span></li>
                <li class="msg_style_rec">hi - received<span class="rec_time">Received: 09:49pm</span></li>
                <li class="msg_style_sent">hi - sent<span class="sent_time">Sent: 09:49pm</span></li>
            </ul>
        </div>
        <p id="Message">Connect to an IP to start chatting!</p>
        <div id="Disconnect">
            <button id="Disconnect_Button">DISCONNECT</button>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'SearchBar',
    props: {
        msg: String
    }
}


</script>


    
<style scoped>
#Message {
    position: absolute;
    font-family: monospace;
    color: rgb(40, 40, 40);
    font-size: 30px;
    text-align: center;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -35%);
    display: block;
}

#Msg_Area {
    font-family: helvetica;
    position: absolute;
    bottom: 10px;
    left: 10px;
    height: 50px;
    font-size: 15px;
    border-radius: 5px;
    background-color: rgb(15, 15, 15);
    width: 88%;
    resize: none;
    border: 1px solid rgb(70, 70, 70);
    padding: 10px;
    padding-right: 7%;
    color: rgb(245, 245, 245);

}

#Send_Img {
    position: absolute;
    bottom: 30px;
    left: 91%;
    transform: scale(.6);
    cursor: pointer;
}

#Receive_Area {
    position: absolute;
    overflow-y: auto;
    width: 97%;
    height: 80%;
    left: 50%;
    top: 10%;
    transform: translate(-50%, -10%);
    border-radius: 5px;
    background-color: rgb(15, 15, 15);
    overflow-x: hidden;
}

.rec_sent_style {
    list-style-type: none;
}

.msg_style_sent {
    position: relative;
    color: rgb(245, 245, 245);
    font-family: helvetica;
    font-size: 15px;
    background-color: rgb(0, 89, 255);
    /*rgb(134, 42, 255)*/
    /*rgb(42, 117, 255)*/
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 60px;
    left: 50%;
    width: 240px;
}

.msg_style_rec {
    position: relative;
    color: rgb(245, 245, 245);
    font-family: helvetica;
    font-size: 15px;
    background-color: rgb(60, 60, 60);
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 60px;
    left: -30px;
    width: 240px;
}

#Sent {
    position: absolute;
    right: 50px;
    display: flex;
    flex-direction: column-reverse;
    bottom: 10px;
    width: 92%;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    left: 0px;
    top: 0px;
    z-index: 999;
    background-color: rgb(15, 15, 15);
    display: none;
}

.sent_time {
    background-color: rgb(10, 10, 10, 0);
    font-family: helvetica;
    font-size: 10px;
    font-weight: bold;
    color: rgb(90, 90, 90);
    top: 40px;
    position: absolute;
    left: 200px;
}

.rec_time {
    background-color: rgb(10, 10, 10, 0);
    font-family: helvetica;
    font-size: 10px;
    font-weight: bold;
    color: rgb(90, 90, 90);
    top: 40px;
    position: absolute;
    left: 10px;
}


/*Scroll Bar*/
::-webkit-scrollbar {
    width: 8px;
}


::-webkit-scrollbar-thumb {
    background-color: rgb(50, 50, 50);
    border-radius: 12px;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(60, 60, 60);
}


::-webkit-scrollbar-track {
    background: rgba(20, 20, 20, 0)
}


::-webkit-scrollbar-thumb:active {
    background-color: rgb(80, 80, 80);
}

/*Scroll Bar*/

/*Loader*/
.loader {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid rgb(80, 80, 80);
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation .6s linear infinite;
    position: absolute;
    left: -35px;
    top: 7px;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/*Loader*/

/*Connection_Area*/
#Disconnect {
    position: absolute;
    left: 114%;
    top: 90%;
    z-index: 999;
}

#Disconnect_Button {
    font-family: helvetica;
    font-size: 15px;
    background-color: rgb(255, 20, 20);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 15px;
    padding-left: 25px;
    padding-right: 25px;
    padding-top: 12px;
    padding-bottom: 12px;
    font-weight: bold;
    cursor: pointer;
    transform: .2s;

}

#Disconnect_Button:hover {
    background-color: rgb(255, 0, 0);
}

#Disconnect_Button:active {
    transform: scale(.98);
}

/*Connection_Area*/
</style>
