import React from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsPage(){
    return(
        <div>
            <Comment/>
            <CommentForm/>
            <CommentList/>

        </div>
    );
}