import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/mutations";

import Auth from "../utils/Auth";
import type { User } from "../models/User";

const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const [userFormData, setUserFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
    savedResource: [],
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await loginUser({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      const token = response.data.login.token;
      Auth.login(token);
      handleModalClose(); // Close the modal after successful login
    } catch (err) {
      console.log(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      savedResource: [],
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

const SomeComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Login</Button>
      <Modal
        size="lg"
        show={showModal}
        onHide={handleModalClose}
        aria-labelledby="login-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="login-modal">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleModalClose={handleModalClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SomeComponent;
