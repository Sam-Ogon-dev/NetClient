import React from "react";
import {connect} from "react-redux";
import {ExitAccountAction} from "../../actions/ExitAccountAction";
import cookie from "react-cookies";

function MyProfileROUTE({socketReducer, personalDataReducer}) {

    let {user_name, avatar} = personalDataReducer;
    
    
    
    function changeAvatar(e) {
        e.persist();

         let reader = new FileReader();
         reader.readAsArrayBuffer(e.target.files[0]);
         reader.onload = () => {
             fetch("http://localhost:3001/changeAvatar", {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'image/jpeg;charset=utf-8'
                 },
                 body: JSON.stringify({avatar: "hello"})
             }).then()
         }
    }
    
    return (
        <div className="work-area">
            <div className="my-profile">
                <div className="profile-block">
                    <div className="label-profile">Моя фотография:</div>
                    <img className="profile-img" src={avatar}/>

                    <input type="file"  id="input" accept="image/jpeg" onChange={(e) => changeAvatar(e)}/>
                    <label htmlFor="input" className="button-change">Изменить фотографию</label>

                </div>

                <div className="profile-block">
                    <div className="label-profile">{user_name}</div>
                    <div className="label-profile-mini">(Имя)</div>

                    <div className="label-profile">1234</div>
                    <div className="label-profile-mini">(Пароль)</div>

                    <div className="button-change">изменить</div>


                    <div className="button_cancel" onClick={() => {
                        ExitAccountAction();
                        cookie.remove("user_name");
                        cookie.remove("id");
                        cookie.remove("password");
                        cookie.remove("auth");
                        socketReducer.socket.emit("disconnect");
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
    ExitAccountAction
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileROUTE);