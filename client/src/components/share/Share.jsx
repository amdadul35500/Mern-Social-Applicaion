import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function Share() {
  const [file, setFile] = useState(null);
  const [shareBtn, setShareBtn] = useState(true);
  const desc = useRef();
  const { user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.img = filename;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <NavLink to={"/profile/" + user.username}>
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "/assets/person/noAvatar.png"
              }
              alt=""
            />
          </NavLink>
          <input
            placeholder={"What's in your mind " + user.username}
            className="shareInput"
            ref={desc}
            onChange={(e) => {
              if (e.target.value) {
                setShareBtn(false);
              }
            }}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img
              src={URL.createObjectURL(file)}
              alt="img"
              className="shareImg"
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit" disabled={shareBtn}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
