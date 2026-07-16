import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodo, updateTodo } from "./todosSlice";
import type { RootState } from "../../store";
import { useNavigate, useParams } from "react-router";

const UpdateTodo = () => {
  const params = useParams();
  const todo = useSelector((state: RootState) => getTodo(state, params.id));
  const [name, setName] = useState(todo?.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ id: todo?.id, name: name }));
    navigate("/todolist");
  };

  return (
    <div>
      <h1>Edit Todo</h1>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <button onClick={handleUpdateTodo}>Update</button>
    </div>
  );
};

export default UpdateTodo;
