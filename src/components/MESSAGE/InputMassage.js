import React from "react";
import ButtonSend from "../../assets/send.jpg";

export default function InputMassage({socket, myID, name, companion, correspondenceID}) {
    let massageText = React.useRef();


    return (

        <div className="input-area">

            <textarea ref={massageText} className="input" placeholder={"Введите сообщение..."}/>
            <img src={ButtonSend} className="send-button" alt="ghj" onClick={() => {
                socket.emit("message:NEW",  {msg: massageText.current.value, user_id: myID, user_name: name, companion, correspondenceID});
                massageText.current.value = "";
            }}/>

        </div>
    );
}