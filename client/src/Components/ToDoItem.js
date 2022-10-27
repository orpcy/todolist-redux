import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, markAsComplete } from "../features/todo/todo-slice";

const ToDoItem = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  return (
    <div className="toDoList">
      <div className="todo-wrap">
        {todos.items?.map((t, i) => {
          const { _id, task, completed, date } = t;
          return (
            <div key={_id}>
              <div className="item">
                <h4 style={{ textDecoration: completed ? "line-through" : "" }}>
                  {task}
                </h4>
                <div>
                  <span
                    className={completed ? "complete unmark" : "complete"}
                    onClick={() => dispatch(markAsComplete(_id))}
                  >
                    <i className="fa-solid fa-circle-check"></i>
                  </span>
                  <span
                    className="delete"
                    onClick={() => dispatch(deleteTodo(_id))}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </span>
                </div>
              </div>
              <div className="task_date">{new Date(date).toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoItem;
