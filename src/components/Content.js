import React, {useEffect} from "react";
import MessageROUTE from "./MESSAGE/MessageROUTE";
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import MyProfileROUTE from "./MY_PROFILE/MyProfileROUTE";
import {connect} from "react-redux";
import {SetPersonalAvatarAction} from "../actions/SetPersonalDataAction";
import cookie from "react-cookies"
import NewsROUTE from "./NEWS/NewsROUTE";
import {ADDRESS} from "../config";



function Content({SetPersonalAvatar, personalDataReducer, socketReducer}) {
    let {socket} = socketReducer;
    let {user_name} = personalDataReducer;
    const [activeBookmarks, setActiveBookmarks] = React.useState(1);
    const menuItem = [["Моя страница", "/My_profile"],
                      ["Сообщения", "/"],
                      ["Новости", "/news"]];


    //SEND ONLINE EVENT IF HAS CORRECTLY COOKIE
    useEffect(() => {
        const authCookie = cookie.load("auth")
        if(authCookie === "process" || authCookie === undefined) { return }
        fetch(ADDRESS + "/auth", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({user_name, password: cookie.load("password")})
        }).then(r => r.json()).then(r => {
            if (r.error) {
                cookie.remove("user_name");
                cookie.remove("id");
                cookie.remove("password");
                cookie.save("auth", "process")
                window.location.assign("/");
                return;
            }
            socket.emit("online", {user_name, mySocket: socket.id})
        });
    }, []);


    //SET AVATAR
    useEffect(() => {
        SetPersonalAvatar(personalDataReducer);
    }, []);


    //SET ACTIVE BOOKMARK WHEN PAGE IS LOAD IN THE FIRST TIME
    useEffect(() => {
        const origin = window.location.origin;
        for (let i = 0; i < menuItem.length; i++) {
            if(window.location.href === origin + menuItem[i][1]) {
                setActiveBookmarks(i);
                break;
            }
        }
    }, []);


    return (
            <Router>
                <div className="content">
                    <div className="bookmarks-menu">

                        {menuItem.map((item, index) =>
                            <div className={index === activeBookmarks ? "bookmarks activeBookmarks" : "bookmarks"} key={index}>
                                <Link onClick={() => setActiveBookmarks(index)} to={item[1]}>{item[0]}</Link>
                            </div>
                        )}

                    </div>


                    <Switch>
                        <Route exact path="/" component={MessageROUTE}/>
                        <Route exact path="/My_profile" component={MyProfileROUTE}/>
                        <Route exact path="/News" component={NewsROUTE}/>
                    </Switch>
                </div>
            </Router>
    );
}


const mapDispatchToProps = {
    SetPersonalAvatar: SetPersonalAvatarAction
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps, mapDispatchToProps)(Content);


//сделать отправку onlineList только тем пользователям, которые находятся на странице сообщений(добавить в onlineList на сервере ячейку с boolen)
//и отправлять тем, у кого true


