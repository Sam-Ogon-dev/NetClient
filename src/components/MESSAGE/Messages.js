import React from "react";
import {getAvatar} from "../SERVICES/services";
import {connect} from "react-redux";
import {ADDRESS} from "../../config";
import Loader_1 from "../../Styles/Loader/Loader_1";



function Messages({messages, setMessages, socket, correspondenceID, companion, myID, avatar}) {
    const refMessages = React.useRef();
    const [avatarCompanion, setAvatarCompanion] = React.useState();
    const [messagesLoaded, setMessagesLoaded] = React.useState(false);




    //SET-MESSAGES
    React.useEffect(() => {
        socket.on("message:GET", msg => {
            setMessages(item => [...item, msg]);
        });

        return () => {
            socket.off("message:GET");
        }
    });

    //OFF MESSAGES SOCKET-EVENT IF ADDRESS IS CHANGE
    React.useEffect(() => {
        const address = window.location.href;
        return () => {
            if(window.location.href !== address) {
                if(!correspondenceID) {return}
                socket.emit("changeStatus", {correspondenceID: correspondenceID});
            }
        }
    });


    //GET CORRESPONDENCE WHEN THE COMPANION CHANGED
    React.useEffect(() => {
        if(!correspondenceID) return;
        setMessagesLoaded(false);

        fetch(ADDRESS + `/correspondence?correspondenceID=${correspondenceID}`).then(r => {
            return r.json();
        }).then(r => {
            setMessages(r);
            setMessagesLoaded(true);
        });

        //GET AVATAR OF COMPANION
        getAvatar(companion).then(r => setAvatarCompanion(r));
    }, [correspondenceID])


    //SCROLL TO THE CORRESPONDENCE'S END
    React.useEffect(() => {
        refMessages.current.scrollTop = refMessages.current.scrollHeight;
    });



    return(
        <div ref={refMessages} className="messages">
            {messagesLoaded ?

                    messages.length === 0 ? "" :
                        messages.map((item, index) =>
                            <div className={myID === item.id ? "me" : "you"} key={index}>
                                <div className="inner-massage">
                                    {item.message}
                                </div>
                                <img src={myID === item.id ? avatar : avatarCompanion} className="avatar" alt="avatar"/>
                            </div>
                        )

                :
                <Loader_1 />
            }

        </div>
    );

}



function mapStateToProps(state) {
    return state.personalDataReducer;
}



export default connect(mapStateToProps, null)(Messages);