import React from "react";
import {connect} from "react-redux";
import {SetPersonalDataAction} from "../actions/SetPersonalDataAction";
import {ADDRESS} from "../config";


function EnterWindow({ socket, SetPersonalDataAction, personalDataReducer }) {
    const refInputName = React.useRef();
    const refInputEmail = React.useRef();
    const [blockName, setBlockName] = React.useState(false);
    const [blockEmail, setBlockEmail] = React.useState(false);
    const [notice, setNotice] = React.useState(false);

    //AUTH
    function auth() {
        fetch(ADDRESS + "/auth", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({user_name: refInputName.current.value, password: refInputEmail.current.value})
        }).then(r => r.json()).then(r => {
            if (r.error) {
                setNotice(r.error);
            } else {
                setNotice(false);
                socket.emit("online", {user_name: r.user_name, mySocket: socket.id});
                SetPersonalDataAction(personalDataReducer, r.user_name, r.id, r.favourites ? r.favourites : "");
            }
        });
    }

    //REGISTRATION
    function registration() {
        fetch(ADDRESS + "/registration", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({user_name: refInputName.current.value, password: refInputEmail.current.value})
        }).then(r => r.json()).then(r => {
            if (r.error) { setNotice(r.error) }
            else { setNotice(r.notice) }
        });
    }

    return (
        <div className="enter-window">
            <div className="enter-form">

                {!notice ? "" :
                    <div>{notice}</div>
                }


                <input ref={refInputName} placeholder="Введите свое имя..." onChange={() => {
                    refInputName.current.value === "" ? setBlockName(false) : setBlockName(true);
                }}/>

                <input ref={refInputEmail} placeholder="Введите пароль..." onChange={() => {
                    refInputEmail.current.value === "" ? setBlockEmail(false) : setBlockEmail(true);
                }}/>

                <button disabled={!(blockName && blockEmail)} onClick={auth}>Войти</button>

                <div>Или</div>

                <button disabled={!(blockName && blockEmail)} onClick={registration}>Зарегистрироваться</button>
            </div>
        </div>
    );
}

const mapDispatchToProps = {
    SetPersonalDataAction
}

function mapStateToProps(state) {
    return state;
}



export default connect(mapStateToProps, mapDispatchToProps)(EnterWindow);