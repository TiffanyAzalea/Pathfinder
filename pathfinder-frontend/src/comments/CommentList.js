// CommentList.js
import React, { useState } from 'react';
import Comment from './Comment';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
