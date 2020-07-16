import React from "react";
import Posts from "./Posts";
import NewPost from "./NewPostForm";
import Loader_1 from "../../Styles/Loader/Loader_1";
import {ADDRESS} from "../../config";
import {SetFavouritesAction} from "../../actions/SetPersonalDataAction";
import {connect} from "react-redux";

function NewsROUTE({ personalDataReducer, SetFavouritesAction }) {

    const [news, setNews] = React.useState([]);
    const [favouritesNews, setFavouritesNews] = React.useState([]);
    const [newPostForm, setNewPostForm] = React.useState(false);
    const [favouriteMode, setFavouriteMode] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const {favourites} = personalDataReducer;


    React.useEffect(() => {
        getNews();
    }, []);


    //GET FAVOURITE NEWS
    React.useEffect(() => {
        if(favouriteMode) {
            setFavouritesNews(news.filter(post => favourites.includes(post.id.toString())));
        }else {
            setFavouritesNews([]);
        }
    }, [favouriteMode]);


    //GET NEWS
    function getNews() {
        setIsLoading(true);

        fetch(ADDRESS + "/getNews")
            .then(r => r.json())
            .then(r => {
                setIsLoading(false);
                setNews(r);
            });
    }



    return(
        <div className="work-area">

            <div className="news-block">
                <div className="news-feed">
                    {!isLoading ?
                        <Posts news={favouriteMode ? favouritesNews : news}
                               favouriteMode={favouriteMode}
                               personalDataReducer={personalDataReducer}
                               SetFavouritesAction={SetFavouritesAction}
                               favourites={favourites}/>
                    :
                    <Loader_1 />
                    }
                </div>

                <div className="side-panel">
                    <div className="side-menu-item" onClick={getNews}>Обновить ленту</div>
                    <div className="side-menu-item" onClick={() => setNewPostForm(true)}>Создать запись</div>
                    <div className={favouriteMode ? "active-menu-item" : "side-menu-item"} onClick={() => {
                        setFavouriteMode(flag => !flag);
                    }}>избранное</div>
                </div>



                {!newPostForm ? "" :
                    <NewPost setNewPostForm={setNewPostForm} getNews={getNews}/>
                }
            </div>

        </div>
    );
}


function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = {
    SetFavouritesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsROUTE);
