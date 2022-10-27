import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange } from "../features/inputs/inputs-slice";
import { addToDo } from "../features/todo/todo-slice";

const ToDoForm = () => {
  const dispatch = useDispatch();

  const { todo } = useSelector((state) => state.inputs);
  const { userId } = useSelector((state) => state.auth);

  const handleChangeDispatch = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      const data = { userId, task: todo };
      dispatch(addToDo(data));
    }
  };
  return (
    <div className="toDoform">
      <div className="form-head">
        <h2 className="mb-0">To Do: </h2>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={todo}
            name="todo"
            onChange={(evt) => handleChangeDispatch(evt)}
            className="form-control"
            rows={1}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ToDoForm;
