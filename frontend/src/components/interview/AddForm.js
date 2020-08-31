import React from "react";
import { Form, Input, Select, DatePicker } from "antd";

class AddForm extends React.Component {
  render() {
    const { Option } = Select;
    const { RangePicker } = DatePicker;

    return (
      <div>
        <Form
          layout="vertical"
          name="add_form"
          onFinish={this.props.submit_add_form}
          id="add-form"
        >
          <Form.Item
            name="title"
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
              <Select.Option value="demo">Demo</Select.Option>
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
              <Option value="demo">Demo</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddForm;
