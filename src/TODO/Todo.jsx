import { Container } from "@mui/material";
import TodoInput from "./TodoInput";
import {v4 as uuid} from "uuid";
import axios from "axios";
import TodoList from "./TodoList";

export default function Todo(){

    const handleAdd=(text)=>{
        const payload={
            title: text,
            status: false,
            id: uuid()
        }
        const config = {
            url: "https://json-server-mocker-masai.herokuapp.com/tasks",
            method: "post",
            data: payload
          };
          return axios(config);
    }

    return (
        <Container>
            <h1>TODO</h1>
            <TodoInput onAdd={handleAdd}/>
            <TodoList/>
        </Container>
    )
}