import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router";
import { removeTodo } from "./todosSlice";

const ListTodo = () => {
  const todos = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h1>List Todo</h1>
        <Link to={"/todoList/add"}>Add</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>
                <Link to={`/todolist/${todo.id}/edit`}>Update</Link>
                <button onClick={() => dispatch(removeTodo({ id: todo.id }))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodo;
