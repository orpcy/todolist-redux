import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/auth-slice";
import { handleChange, resetInputs } from "../features/inputs/inputs-slice";
import { closeModal } from "../features/modals/modal-slice";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const { showLogin } = useSelector((state) => state.modal);

  const inputs = useSelector((state) => state.inputs);
  const { email, password } = inputs;

  const loginUser = async (e) => {
    e.preventDefault();
    await dispatch(login(inputs));
  };

  const handleChangeDispatch = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleClose = () => {
    dispatch(resetInputs());
    dispatch(closeModal("login"));
  };

  return (
    <>
      <Modal show={showLogin} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-3"
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(evt) => handleChangeDispatch(evt)}
              autoFocus
            />

            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(evt) => handleChangeDispatch(evt)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={loginUser}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
