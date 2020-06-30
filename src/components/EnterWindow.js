import React from "react";


export default function EnterWindow({setName, setEnterWindow, socket}) {
    const refInput = React.useRef();
    const [block, setBlock] = React.useState(true);

    return(
        <div className="enter-window">
            <div className="enter-form">
                <input ref={refInput} placeholder="Введите свое имя..." onChange={() => {
                    refInput.current.value === "" ? setBlock(true) : setBlock(false);
                }}/>

                <button disabled={block} onClick={() => {
                    setEnterWindow(false);
                    setName(refInput.current.value);
                    socket.emit("online", {name: refInput.current.value, mySocket: socket.id});
                }}>Войти</button>
            </div>
        </div>
    );
}