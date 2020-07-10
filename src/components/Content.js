import React, {useEffect} from "react";
import MessageROUTE from "./MESSAGE/MessageROUTE";
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import MyProfileROUTE from "./MY_PROFILE/MyProfileROUTE";
import {connect} from "react-redux";
import {SetPersonalAvatarAction} from "../actions/SetPersonalDataAction";



function Content({SetPersonalAvatar, personalDataReducer, socketReducer}) {
    let {socket} = socketReducer;
    let {user_name} = personalDataReducer;
    const [activeBookmarks, setActiveBookmarks] = React.useState(1);
    const menuItem = [["Моя страница", "/My_profile"],
                      ["Сообщения", "/"],
                      ["Новости", "/news"],
                      ["Настройки", "/settings"]];

    //SET AVATAR
    useEffect(() => {
        SetPersonalAvatar(personalDataReducer);
        socket.emit("online", {user_name, mySocket: socket.id})
    }, []);


    return (
            <Router>
                <div className="content">
                    <div className="bookmarks-menu">

                        {menuItem.map((item, index) =>
                            <div className={index === activeBookmarks ? "bookmarks activeBookmarks" : "bookmarks"}
                                 onClick={() => setActiveBookmarks(index)}
                                 key={index}>
                                <Link to={item[1]}>{item[0]}</Link>
                            </div>
                        )}

                    </div>


                    <Switch>
                        <Route exact path="/" component={MessageROUTE}/>
                        <Route exact path="/My_profile" component={MyProfileROUTE}/>
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



//сделать загрузку картинки на сервер через страницу профиля
//сделать возможность изменения имени и пароля
//начать делать новостную ленту

