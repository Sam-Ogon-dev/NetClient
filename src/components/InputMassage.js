import React from "react";
import ButtonSend from "../assets/send.jpg";

export default function InputMassage({socket, name, companion}) {
    let massageText = React.useRef();
    return (

        <div className="input-area">

            <textarea ref={massageText} className="input" placeholder={"Введите сообщение..."}/>
            <img src={ButtonSend} className="send-button" alt="ghj" onClick={() => {
                socket.emit("message",  {sender: name, msg: massageText.current.value, companion: companion});
                massageText.current.value = "";
            }}/>

        </div>
    );
}