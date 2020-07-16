import React from "react";
import {connect} from "react-redux";

import Messages from "./Messages";
import InputMassage from "./InputMassage";
import Companion from "./Companion";
import Friends from "./Friends";
import EnterWindow from "../EnterWindow";


function MessageROUTE({socketReducer, personalDataReducer}) {
    const [messages, setMessages] = React.useState([]);
    const [companion, setCompanion] = React.useState({});
    const [correspondenceID, setCorrespondenceID] = React.useState(false);
    let {auth, user_name, id} = personalDataReducer;
    let {socket} = socketReducer;



    return (
            <div className="work-area">

                {auth === "true" ? <Friends
                        setCompanion={setCompanion}
                        socket={socket}
                        sender={user_name}
                        myID={id}
                        correspondenceID={correspondenceID}
                        SetCorrespondenceID={setCorrespondenceID}
                    /> :
                    <EnterWindow socket={socket}/>
                }


                <div className="messages-area">

                    {!companion.companion ? "" :
                        <>
                            <Companion companion={companion.companion}/>

                            <Messages messages={messages}
                                      setMessages={setMessages}
                                      name={user_name}
                                      socket={socket}
                                      correspondenceID={correspondenceID}
                                      companion={companion.companionID}
                                      myID={id}
                            />

                            <InputMassage socket={socket} myID={id} companion={companion.companion} correspondenceID={correspondenceID}/>
                        </>
                    }

                </div>

            </div>
    );
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, null)(MessageROUTE);

