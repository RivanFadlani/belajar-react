import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addTodo } from "./todosSlice";

const AddTodo = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    dispatch(addTodo({ name: name }));
    navigate("/todolist");
  };

  return (
    <div>
      <h1>Add Todo</h1>
      <input
        type="text"
        placeholder="Add New Todo"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <button onClick={handleAddTodo}>Add</button>
    </div>
  );
};

export default AddTodo;
