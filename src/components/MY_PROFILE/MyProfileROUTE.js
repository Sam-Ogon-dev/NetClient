import React from "react";
import {connect} from "react-redux";
import {ExitAccountAction} from "../../actions/ExitAccountAction";
import cookie from "react-cookies";
import {SetPersonalAvatarAction, SetPersonalDataAction} from "../../actions/SetPersonalDataAction";
import {ADDRESS} from "../../config";
import Loader_1 from "../../Styles/Loader/Loader_1";

function MyProfileROUTE({socketReducer, personalDataReducer, SetPersonalAvatarAction, SetPersonalDataAction}) {

    const newName = React.useRef();
    const newPassword = React.useRef();
    const [notice, setNotice] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    let {user_name, avatar, id} = personalDataReducer;
    let {socket} = socketReducer;
    
    
    //CHANGE AVATAR
    function changeAvatar(e) {
        e.persist();
        setIsLoading(true);
         let reader = new FileReader();
         reader.onloadend = () => {
             fetch(ADDRESS + "/changeAvatar", {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json;charset=utf-8'
                 },
                 body: JSON.stringify({avatar: [...new Uint8Array(reader.result)], label: id})
             }).then(() => {
                 SetPersonalAvatarAction(personalDataReducer);
                 setIsLoading(false);
             });
         }
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    //CHANGE NAME/PASSWORD
    function changeNamePassword(newName, newPassword, oldName) {
        fetch( ADDRESS + "/changeNamePassword", {
            method: "PUT",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({user_name: newName, password: newPassword, id: personalDataReducer.id, oldName})
        }).then(r => r.json()).then(r => {
            if(r.notice) { setNotice(r.err); return }
            setNotice("Данные успешно изменены!");
            SetPersonalDataAction(personalDataReducer, r.user_name, r.id);
            socket.emit("exit");
            socket.emit("online", {user_name: r.user_name, mySocket: socket.id});
        })
    }
    
    return (
        <div className="work-area">
            <div className="my-profile">
                <div className="profile-block">
                    <div className="label-profile">Моя фотография:</div>
                    {isLoading || !avatar ? <Loader_1/>
                        :
                        <img className="profile-img" src={avatar}/>
                    }

                    <input type="file"  id="inputImage" accept="image/jpeg" onChange={(e) => changeAvatar(e)}/>
                    <label htmlFor="inputImage" className="button-change">Изменить фотографию</label>

                </div>

                <div className="profile-block">
                    {notice ? <div>{notice}</div> : ""}
                    <input ref={newName} className="label-profile" defaultValue={user_name}/>
                    <div className="label-profile-mini">(Имя)</div>

                    <input ref={newPassword} className="label-profile" defaultValue={cookie.load("password")}/>
                    <div className="label-profile-mini">(Пароль)</div>

                    <div className="button-change" onClick={() => {
                        changeNamePassword(newName.current.value, newPassword.current.value, user_name);
                    }}>изменить</div>


                    <div className="button-cancel" onClick={() => {
                        ExitAccountAction();
                        cookie.remove("user_name");
                        cookie.remove("id");
                        cookie.remove("password");
                        cookie.remove("auth");
                        cookie.save("favourites", "");
                        window.location.assign("/");
                    }}>Выйти из аккаунта</div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = {
    ExitAccountAction,
    SetPersonalAvatarAction,
    SetPersonalDataAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileROUTE);