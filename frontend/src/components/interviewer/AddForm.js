import React from "react";
import { Form, Input } from "antd";

class AddForm extends React.Component {
  render() {
    const { submit_add_form, add_form_ref } = this.props;
    return (
      <div>
        <Form
          layout="vertical"
          name="add_form"
          onFinish={submit_add_form}
          id="add-form"
          ref={add_form_ref}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of interviewer!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the email of interviewer!",
              },
              {
                type: "email",
                message: "Please input valid email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddForm;
