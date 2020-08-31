import React from "react";
import { Form, Input, Select, DatePicker } from "antd";

class EditForm extends React.Component {
  render() {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const {
      submit_edit_form,
      interviewers,
      interviewees,
      edit_form_ref,
    } = this.props;
    return (
      <div>
        <Form
          layout="vertical"
          name="edit_form"
          onFinish={submit_edit_form}
          id="edit-form"
          ref={edit_form_ref}
        >
          <Form.Item
            name="name"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please input the title of interview!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Select Date"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="interviewer"
            label="Interviewer"
            rules={[
              {
                required: true,
                message: "Please select interviewer!",
              },
            ]}
          >
            <Select allowClear>
              {interviewers.map((interviewer) => (
                <Option value={JSON.stringify(interviewer.key)}>
                  {interviewer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="interviewee"
            label="Interviewee"
            rules={[
              {
                required: true,
                message: "Please select interviewee!",
              },
            ]}
          >
            <Select allowClear>
              {interviewees.map((interviewee) => (
                <Option value={JSON.stringify(interviewee.key)}>
                  {interviewee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default EditForm;
