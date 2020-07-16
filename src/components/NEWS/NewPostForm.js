import React from "react";
import {connect} from "react-redux";
import avatar from "../../assets/background.jpg";


function NewPost() {
    const [isLoaded, setIsLoaded] = React.useState(false);

    function createNewPost({setNewPostForm}) {
        setIsLoaded(true);
    }


    return(
        <div className="enter-window">
            <div className="enter-form">
                {isLoaded ?
                    <img className="profile-img" src={avatar}/>
                :
                    <>
                        <input type="file"  id="inputImage" accept="image/jpeg" onChange={(e) => createNewPost(e)}/>
                        <label htmlFor="input" className="button-change" onClick={() => setIsLoaded(true)}>загрузить фотографию</label>
                    </>
                }




                <textarea className="input-post" placeholder="Введите текст..."/>

                <div className="control-buttons">
                    <div className="button-accept" onClick={() => {
                        createNewPost();
                    }}>Создать запись</div>

                    <div className="button-cancel" onClick={() => {
                        setNewPostForm(false);
                    }}>Отмена</div>
                </div>
            </div>
        </div>
    )
}

export default connect()(NewPost);