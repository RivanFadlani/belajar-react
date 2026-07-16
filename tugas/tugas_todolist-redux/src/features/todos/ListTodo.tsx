import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Link } from "react-router";
import { removeTodo } from "./todosSlice";

const ListTodo = () => {
  const todos = useSelector((state: RootState) => state.todoList);
  const dispatch = useDispatch();

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">List Todo</h1>
        <Link
          to={"/todoList/add"}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add
        </Link>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-gray-200 text-gray-500 uppercase text-sm">
            <th className="pb-3">Id</th>
            <th className="pb-3">Name</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr
              key={todo.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-3 text-gray-600 text-sm">
                {todo.id.slice(0, 8)}...
              </td>
              <td className="py-3 font-medium text-gray-800">{todo.name}</td>
              <td className="py-3 space-x-3">
                <Link
                  to={`/todolist/${todo.id}/edit`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(removeTodo({ id: todo.id }))}
                  className="text-sm text-red-500 hover:underline"
                >
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
