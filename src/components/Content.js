import React from "react";
import socket from "./socket";

import Massages from "./Massages";
import InputMassage from "./InputMassage";
import Companion from "./Companion";
import Friends from "./Friends";
import EnterWindow from "./EnterWindow";

export default function Content() {
    const [messages, setMessages] = React.useState([]);
    const [name, setName] = React.useState("");
    const [companion, setCompanion] = React.useState("");
    const [enterWindow, setEnterWindow] = React.useState(true);



    return (
        <div className="content">
            <div className="bookmarks-menu">
                <div className="bookmarks">Моя страница</div>
                <div className="bookmarks activeBookmarks">Сообщения</div>
                <div className="bookmarks">Новости</div>
                <div className="bookmarks">Настройки</div>
            </div>

            <div className="work-area">

                <Friends setCompanion={setCompanion} socket={socket} sender={name}/>

                <div className="messages-area">

                    {!enterWindow ? "" :
                        <EnterWindow setName={setName} setEnterWindow={setEnterWindow} socket={socket}/>
                    }


                    {companion === "" ? "" :
                        <>
                            <Companion companion={companion}/>

                            <Massages messages={messages} setMessages={setMessages} name={name} socket={socket}/>

                            <InputMassage socket={socket} name={name} companion={companion}/>
                        </>
                    }

                </div>

            </div>


        </div>
    );
}

