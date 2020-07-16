import React from "react";
import {ADDRESS} from "../../config";
import Loader_1 from "../../Styles/Loader/Loader_1";

export default function Friends({setCompanion, socket, sender, myID, correspondenceID, SetCorrespondenceID}) {

    const [friendsList, setFriendsList] = React.useState([]);
    const [onlineList, setOnlineList] = React.useState([]);

    //GET ONLINE-LIST
    React.useEffect(() => {
       socket.on("ONLINE/FRIEND_LIST", msg => {
           setOnlineList(msg.online);
           setFriendsList(msg.friends);
       });

        socket.on("onlineList", msg => {
            setOnlineList(msg);
        });

        return () => {
            socket.off("ONLINE/FRIEND_LIST");
            socket.off("onlineList");
        }
    });

    //GET FRIEND-LIST
    React.useEffect(() => {
        fetch(ADDRESS + "/friends").then(r => r.json()).then(r => {
            setFriendsList(r.friends);
            setOnlineList(r.onlineList);
        });
    }, []);



    //SET AND CHOOSE COMPANION
    function setCompanionAndCorrespondenceID(companion, companionID) {
        if(correspondenceID) {
            socket.emit("changeStatus", {correspondenceID: correspondenceID});
        }

        setCompanion({companion, companionID});
        SetCorrespondenceID([companionID, myID].sort((a, b) => b - a).join(""));
    }



    return(
       <div className="friends">
           {friendsList[0] ?

                   friendsList.map(item =>
                       item.user_name === sender ? "" :
                           <div key={item.id}
                                className={onlineList.includes(item.user_name) ? "friend-online" : "friend"}
                                onClick={() => setCompanionAndCorrespondenceID(item.user_name, item.id)}
                                userid={item.id}>
                               {item.user_name}
                           </div>
                   )
               :
               <Loader_1 />
           }

       </div>
    );
}
