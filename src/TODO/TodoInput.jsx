import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ariaLabel = { 'aria-label': 'description' };

export default function TodoInput({onAdd}) {

    const [text,setText]= useState("");

    const handleClick=(e)=>{
        e.preventDefault();
        onAdd(text);
        setText("");
    }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Input placeholder="Placeholder" inputProps={ariaLabel} value={text} onChange={(e)=>setText(e.target.value)} />
      <Button variant="contained" onClick={handleClick}>ADD</Button>
    </Box>
  );
}