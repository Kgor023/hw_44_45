import { useLocation } from "react-router-dom";
import "../style/Post.css";
import { useContext } from "react";
import { Theme } from "../App";
function Post() {
  const contextColor = useContext(Theme);
  const location = useLocation();
  const post = location.state.post;
  return (
      <div
        className={contextColor.color ? "post__light post" : "post__dark post"}
      >
        <h1>{post.title}</h1>
        <p>{post.body}</p>
    </div>
  );
}
export default Post;
