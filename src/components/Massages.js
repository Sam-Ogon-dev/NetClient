import React from "react";
import Avatar from "../assets/avatar.jpg";


export default function Massages({messages, setMessages, name, socket}) {

    //SET-MESSAGES
    React.useEffect(() => {
        socket.on("correspondenceResponse", msg => setMessages(msg));
    }, []);



    return(
        <div className="massages">

            {   messages.length === 0 ? "" :
                messages.map((item, index) =>
                <div className={name === item[0] ? "me" : "you"} key={index}>
                    <div className="inner-massage">
                        {item[1]}
                    </div>

                    <img src={Avatar} className="avatar" alt="avatar"/>
                </div>
            )}

        </div>
    );


}