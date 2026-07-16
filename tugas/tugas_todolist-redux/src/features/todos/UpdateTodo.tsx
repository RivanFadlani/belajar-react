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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Todo</h1>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpdateTodo}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateTodo;
