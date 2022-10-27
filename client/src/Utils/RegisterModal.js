import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/auth-slice";
import { handleChange, resetInputs } from "../features/inputs/inputs-slice";
import { closeModal } from "../features/modals/modal-slice";

const RegisterModal = (props) => {
  const dispatch = useDispatch();
  const { showRegister } = useSelector((state) => state.modal);

  const inputs = useSelector((state) => state.inputs);
  const { username, email, password } = inputs;

  const registerUser = async (e) => {
    e.preventDefault();
    await dispatch(register(inputs));
  };

  const handleChangeDispatch = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleClose = () => {
    dispatch(resetInputs());
    dispatch(closeModal("register"));
  };

  return (
    <>
      <Modal show={showRegister} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter Username"
              name="username"
              value={username}
              onChange={(evt) => handleChangeDispatch(evt)}
            />

            <Form.Control
              className="mb-3"
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={(evt) => handleChangeDispatch(evt)}
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
          <Button variant="primary" onClick={registerUser}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RegisterModal;
