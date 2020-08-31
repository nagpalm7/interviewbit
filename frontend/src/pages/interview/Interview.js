import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal, Button } from "antd";
import CustomTable from "../../components/table/Table";
import AddForm from "../../components/interview/AddForm";

const url = "http://localhost:8000/api/interviews/";
const url_interviewers = "http://localhost:8000/api/interviewers/";
const url_interviewees = "http://localhost:8000/api/interviewees/";

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      interviewers: [],
      interviewees: [],
      visible: false,
      addLoading: false,
    };
  }

  componentDidMount() {
    this.fetch_data();
    this.fetch_interviewers();
    this.fetch_interviewees();
  }

  // Fetch list of Interviews
  fetch_data = () => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.length) {
          let data = [];
          response.data.map((interview) => {
            let data_object = {
              key: interview.id,
              name: interview.name,
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

  // Fetch Interviewers
  fetch_interviewers = () => {
    axios
      .get(url_interviewers)
      .then((response) => {
        if (response.data.length) {
          let interviewers = [];
          response.data.map((interviewer) => {
            let data_object = {
              key: interviewer.id,
              name: interviewer.name,
            };
            interviewers.push(data_object);
          });
          this.setState({ interviewers: interviewers });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Fetch Interviewees
  fetch_interviewees = () => {
    axios
      .get(url_interviewees)
      .then((response) => {
        if (response.data.length) {
          let interviewees = [];
          response.data.map((interviewee) => {
            let data_object = {
              key: interviewee.id,
              name: interviewee.name,
            };
            interviewees.push(data_object);
          });
          this.setState({ interviewees: interviewees });
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
    this.setState(
      {
        addLoading: true,
      },
      () => {
        axios
          .post(url, event)
          .then((response) => {
            console.log(response);
            this.setState({ addLoading: false });
            this.fetch_data();
            this.hide_add_modal();
          })
          .catch((error) => {
            this.setState({ addLoading: false });
            console.log(error);
          });
      }
    );
  };

  render() {
    const {
      visible,
      addLoading,
      data,
      interviewees,
      interviewers,
    } = this.state;

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
          <AddForm
            submit_add_form={this.submit_add_form}
            interviewees={interviewees}
            interviewers={interviewers}
          />
        </Modal>
        <CustomTable
          dataSource={data}
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
    dataIndex: "name",
    key: "name",
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
