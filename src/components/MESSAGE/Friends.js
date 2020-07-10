import React from "react";

export default function Friends({setCompanion, socket, sender, myID, correspondenceID, SetCorrespondenceID}) {

    const [friendsList, setFriendsList] = React.useState([]);
    const [onlineList, setOnlineList] = React.useState([]);

    //GET FRIEND-LIST
    React.useEffect(() => {
       socket.on("onlineList", msg => {
           setOnlineList(msg);
       });

        fetch("http://localhost:3001/friends").then(r => r.json()).then(r => {
            setFriendsList(r.friends);
            setOnlineList(r.onlineList);
        });
        return () => {
            socket.off("onlineList");
        }
    });

    //SET AND CHOOSE COMPANION
    function setCompanionAndCorrespondenceID(companion, senderID) {
        if(correspondenceID) {
            socket.emit("changeCompanion", {correspondenceID: correspondenceID});
        }

        setCompanion(companion);
        SetCorrespondenceID([senderID, myID].sort((a, b) => b - a).join(""));
    }



    return(
       <div className="friends">
           {friendsList.map(item =>
                item.user_name === sender ? "" :
               <div key={item.id}
                    className={onlineList.includes(item.user_name) ? "friend-online" : "friend"}
                    onClick={() => setCompanionAndCorrespondenceID(item.user_name, item.id)} userid={item.id}>
                   {item.user_name}
               </div>
           )}

       </div>
    );
}
