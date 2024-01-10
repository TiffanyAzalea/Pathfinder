// CommentForm.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommentForm = ({ onSubmit }) => {
 
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ user, text });
    setUser('');
    setText('');
  };

  const [user, setUser] = useState({
    username: "",
  });
const {id}=useParams();

useEffect(()=>{
    loadUser()
},[])

const loadUser= async ()=>{
    const result=await axios.get(`http://localhost:8080/user/${id}`)
    setUser(result.data)
}

  return (
    <form onSubmit={handleSubmit}>
        <h9>@{user.username}</h9>

      <input
        type="text"
        placeholder="Your Name"
        value={user.username}
        onChange={(e) => setUser(e.target.value)}
      />
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
