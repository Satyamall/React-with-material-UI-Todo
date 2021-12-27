import React, { useState,useEffect } from "react";
import {Box } from '@mui/system';
import axios from "axios";
import { Link } from "react-router-dom";

function TodoItem({ title,id}) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div><Link to={`/todo/${id}`}>
        {title}
      </Link></div>
    </div>
  );
}

function TodoList() {

  const [todos,setTodos]=useState([]);

  const getTodos = () => {
    return axios.get(`https://json-server-mocker-masai.herokuapp.com/tasks`)
      .then((res) => {
         setTodos(res.data)
      })
      .catch((res) => {
         console.log(res);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Box>
      {todos?.map((item) => (
        <TodoItem key={item.id} {...item} 
         />
      ))}
    </Box>
  );
}

export default TodoList;
