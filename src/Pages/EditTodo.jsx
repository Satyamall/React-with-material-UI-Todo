import { Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function TodoItem({ title, status, id, onToggle, onDelete }) {
  return (
    <div style={{ display: "flex", padding: "1rem", gap: "2rem" }}>
      <div>{title}</div>
      <div>{`${status}`}</div>
      <Button variant="contained" onClick={() => onToggle(id)}>Toggle Status</Button>
      <Button variant="contained" onClick={() => onDelete(id)}>DELETE</Button>
    </div>
  );
}

function EditTodo() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const perPage=5;

  const getTodos = () => {

    return fetch(`https://json-server-mocker-masai.herokuapp.com/tasks`)
      .then((res) => res.json())
      .then((res) => {
        setTodos(res)
      })
      .catch((res) => {
        // failure
        console.log(res)
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log(todos)

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id))
  };

  const handleToggle = (id) => {
    setTodos(todos.map((item) =>
      item.id === id
        ? { ...item, status: !item.status }
        : item
    ))
  };

  return (
    <div>
      <div>
        {
          todos?.filter((_, i) => i >= (page - 1) * perPage && i < page * perPage).map((item) => (
            <TodoItem
              key={item.id}
              {...item}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
      </div>
      <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={Math.ceil(todos.length/perPage)} page={page} onChange={handleChange} />
      </Stack>
      <Box>
        <Link to="/">
          Back To Home Page
        </Link>
      </Box>
    </div>
  );
}

export default EditTodo;
