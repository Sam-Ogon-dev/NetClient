import React from "react";
import {getAvatar} from "../SERVICES/services";
import {connect} from "react-redux";



function Messages({messages, setMessages, socket, correspondenceID, companion, myID, avatar}) {
    const refMessages = React.useRef();
    const [avatarCompanion, setAvatarCompanion] = React.useState();




    //SET-MESSAGES
    React.useEffect(() => {
        socket.on("message:GET", msg => {
            setMessages(item => [...item, msg]);
        });

        return () => {
            console.log("111111");
            socket.off("message:GET");
        }
    });


    //GET CORRESPONDENCE WHEN THE COMPANION CHANGED
    React.useEffect(() => {
        if(!correspondenceID) return;

        fetch(`http://localhost:3001/correspondence?correspondenceID=${correspondenceID}`).then(r => {
            return r.json();
        }).then(r => {
            setMessages(r);
        });
        getAvatar(companion).then(r => setAvatarCompanion(r));
    }, [correspondenceID])


    //SCROLL TO THE CORRESPONDENCE'S END
    React.useEffect(() => {
        refMessages.current.scrollTop = refMessages.current.scrollHeight;
    });



    return(
        <div ref={refMessages} className="massages">
            {   messages.length === 0 ? "" :
                messages.map((item, index) =>
                <div className={myID === item.id ? "me" : "you"} key={index}>
                    <div className="inner-massage">
                        {item.message}
                    </div>
                    <img src={myID === item.id ? avatar : avatarCompanion} className="avatar" alt="avatar"/>
                </div>
            )}

        </div>
    );

}



function mapStateToProps(state) {
    return state.personalDataReducer;
}



export default connect(mapStateToProps, null)(Messages);