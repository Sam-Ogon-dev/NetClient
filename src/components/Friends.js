import React from "react";

export default function Friends({setCompanion, socket, sender}) {

    const [friendsList, setFriendsList] = React.useState([]);

    //GET FRIEND-LIST
    React.useEffect(() => {
        socket.on("friendsList", (msg) => {
           setFriendsList(Object.entries(msg));
        });
    }, []);

    //SET AND CHOOSE COMPANION | CORRESPONDENCE-GET
    function clickFriend(companion, sender) {
        setCompanion(companion);
        socket.emit("correspondenceGET", {sender, companion});
    }


    return(
       <div className="friends">
           {friendsList.map((item, index) =>
                item[0] === sender ? "" :
               <div key={item[1]+index} className="friend" onClick={() => clickFriend(item[0], sender)} socketid={item[1]}>
                   {item[0]}
               </div>
           )}

       </div>
    );
}