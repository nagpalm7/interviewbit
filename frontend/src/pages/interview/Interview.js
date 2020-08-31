import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "antd";
import CustomTable from "../../components/table/Table";
import AddForm from "../../components/interview/AddForm";

const url = "http://localhost:8000/api/interview/";

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      ModalText: "Content of the modal",
      visible: false,
      addLoading: false,
    };
  }

  componentDidMount() {
    this.fetch_data();
  }

  // Fetch list of interviews
  fetch_data = () => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.length) {
          let data = [];
          response.data.map((interview) => {
            let data_object = {
              key: interview.pk,
              title: interview.name,
              interviewer: interview.interviewer.name,
              interviewee: interview.interviewee.name,
              start: moment(interview.start).format("lll"),
              end: moment(interview.end).format("lll"),
            };
            data.push(data_object);
          });
          this.setState({ data: data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Add modal helper functions
  show_add_modal = () => {
    this.setState({
      visible: true,
    });
  };

  hide_add_modal = () => {
    this.setState({
      visible: false,
    });
  };

  // Add form helper functions
  // handle_form_change = (fields) => {
  //   if (fields.length)
  //     this.setState({
  //       [fields[0].name[0]]: fields[0].value,
  //     });
  // };

  submit_add_form = (event) => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      addLoading: true,
    });
    console.log(event);
  };

  render() {
    const { visible, addLoading, ModalText } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add Interview"
          visible={visible}
          style={{ top: 20 }}
          confirmLoading={addLoading}
          onCancel={this.hide_add_modal}
          okButtonProps={{
            form: "add-form",
            key: "submit",
            htmlType: "submit",
          }}
        >
          <AddForm submit_add_form={this.submit_add_form} />
        </Modal>
        <CustomTable
          dataSource={this.state.data}
          columns={columns}
          title="Interviews"
          show_add_modal={this.show_add_modal}
        />
      </div>
    );
  }
}

export default Interview;

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Interviewer",
    dataIndex: "interviewer",
    key: "interviewer",
  },
  {
    title: "Interviewee",
    dataIndex: "interviewee",
    key: "interviewee",
  },
  {
    title: "Start Time",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "End Time",
    dataIndex: "end",
    key: "end",
  },
];
