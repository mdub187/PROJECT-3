import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { CREATE_RESOURCE } from "../utils/mutations";
import Auth from "../utils/Auth";
import type { Resource } from "../models/Resource";

const CreateResourceForm = ({}: { handleModalClose: () => void }) => {
  const [createResource] = useMutation(CREATE_RESOURCE);

  const [userFormData, setUserFormData] = useState<Resource>({
    resourceId: "",
    title: "",
    category: "",
    description: "",
    url: "",
  });

  const [validated] = useState(false);

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
    }

    try {
      const response = await createResource({
        variables: {
          title: userFormData.title,
          category: userFormData.category,
          description: userFormData.description,
        },
      });
      const token = response.data.createResource.token;

      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      resourceId: "",
      title: "",
      category: "",
      description: "",
      url: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with creating a resource!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="title">title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your title"
            name="title"
            onChange={handleInputChange}
            value={userFormData.title || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            title is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="category">category</Form.Label>
          <Form.Control
            type="category"
            placeholder="Resource category"
            name="category"
            onChange={handleInputChange}
            value={userFormData.category || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            category is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">description</Form.Label>
          <Form.Control
            type="description"
            placeholder="Your description"
            name="description"
            onChange={handleInputChange}
            value={userFormData.description || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            description is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.title &&
              userFormData.category &&
              userFormData.description
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateResourceForm;
