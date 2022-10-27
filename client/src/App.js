import React, { useEffect } from "react";
import ToDoForm from "./Components/ToDoForm.js";
import ToDoItem from "./Components/ToDoItem.js";
import { ToastContainer } from "react-toastify";
import LoginModal from "./Utils/LoginModal.js";
import RegisterModal from "./Utils/RegisterModal.js";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "./features/modals/modal-slice.js";
import { confirmAuthorization, logout } from "./features/auth/auth-slice.js";
import { fetchTodo, resetTodos } from "./features/todo/todo-slice.js";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  // Redux code
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(resetTodos());
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(confirmAuthorization());
    if (auth.userId !== "") dispatch(fetchTodo(auth.userId));
  }, [auth.userId, dispatch]);

  const dayTime = new Date().getHours();

  return (
    <div className="App">
      <ToastContainer draggable autoClose={2000} icon={true} />
      <header>
        <nav>
          <h4>
            {auth.username !== "" ? (
              <span>
                Hi {auth.username}.{" "}
                {dayTime < 12
                  ? "Good Morning!"
                  : dayTime > 12
                  ? "Good Afternoon!"
                  : dayTime > 18
                  ? "Good Evening!"
                  : null}
              </span>
            ) : (
              <span>Hi Anonymous.</span>
            )}
          </h4>
          <div />
          <div>
            {auth.username !== "" ? (
              <span onClick={handleLogout}>Logout</span>
            ) : (
              <>
                <span onClick={() => dispatch(openModal("login"))}>Login</span>
                <span onClick={() => dispatch(openModal("register"))}>
                  Register
                </span>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>
        <ToDoForm />
        <ToDoItem />
        {!auth.userId && <p className="text-info">Sign in to manage tasks!</p>}
      </main>

      <LoginModal />
      <RegisterModal />
    </div>
  );
};

export default App;
