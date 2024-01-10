
import React from 'react';

const Comment = ({ user, text, date }) => {
  return (
    <div>
      <strong>{user}</strong>
      <p>{text}</p>
      <small>{date}</small>
    </div>
  );
};

export default Comment;
