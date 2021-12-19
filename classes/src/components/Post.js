import React from "react";
import "../styles/Post.css"

function Post({info}) {
    return (<div className='post'>
        <p className='post_title'>{info.title}</p>
        <p className='post_body'>{info.body}</p>
    </div>)
}

export default Post;