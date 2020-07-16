import React from "react";
import {connect} from "react-redux";
import avatar from "../../assets/background.jpg";
import {ADDRESS} from "../../config";
import Loader_1 from "../../Styles/Loader/Loader_1";


function NewPostForm({setNewPostForm, id, getNews}) {
    const [isLoadedImage, setIsLoadedImage] = React.useState(false);
    const [image, setImage] = React.useState("");
    const [newPost, setNewPost] = React.useState({text: "", image: "", author: id});
    const [isLoading, setIsLoading] = React.useState(false);

    function createNewPost() {
        setIsLoading(true);

        fetch(ADDRESS + "/createPost", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPost)
        }).then(() => {
                setIsLoading(false)
                setNewPostForm(false);
                getNews();
            })
    }

    function inputImage(e) {
        e.persist();
        setImage(e.target.files[0]);
        const reader = new FileReader();

        reader.onloadend = () => {
            setNewPost(state => ({...state, image: [...new Uint8Array(reader.result)]}));
            setIsLoadedImage(true);
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    }


    return(
        <div className="enter-window">
            <div className="enter-form">
                {isLoadedImage ?
                    <img className="profile-img" src={URL.createObjectURL(image)}/>
                :
                    <>
                        <input type="file"  id="inputImage" accept="image/jpeg" onChange={ e => {inputImage(e) }}/>
                        <label htmlFor="inputImage" className="button-change">загрузить фотографию</label>
                    </>
                }




                <textarea className="input-post" placeholder="Введите текст..."
                          onChange={e => {
                              e.persist();
                              setNewPost(state => ({...state, text: e.target.value}))
                          }}/>

                <div className="control-buttons">

                    <div className="button-accept" onClick={() => {
                        createNewPost();
                    }}>Создать запись</div>

                    <div className="button-cancel" onClick={() => {
                        setNewPostForm(false);
                    }}>Отмена</div>

                </div>

                {isLoading ? <Loader_1 /> : ""}

            </div>
        </div>
    )
}

function mapStateToProps(state) {
 return state.personalDataReducer;
}

export default connect(mapStateToProps, null)(NewPostForm);