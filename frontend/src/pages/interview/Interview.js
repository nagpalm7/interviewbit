import React from "react";
import axios from "axios";
import moment from "moment";
import { Modal } from "antd";
import CustomTable from "../../components/table/Table";
import AddForm from "../../components/interview/AddForm";
import EditForm from "../../components/interview/EditForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
      add_visible: false,
      add_loading: false,
      edit_visible: false,
      edit_loading: false,
      key: null,
    };
  }

  edit_form_ref = React.createRef();
  add_form_ref = React.createRef();

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
              start: moment(interview.start).format("Y-M-d H:M:S"),
              end: moment(interview.end).format("Y-M-d H:M:S"),
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
      add_visible: true,
    });
  };

  hide_add_modal = () => {
    this.add_form_ref.current.resetFields();
    this.setState({
      add_visible: false,
    });
  };

  // Add form helper functions
  submit_add_form = (event) => {
    this.setState(
      {
        add_loading: true,
      },
      () => {
        let data = {
          name: event.name,
          interviewer: event.interviewer,
          interviewee: event.interviewee,
          start: event.date[0],
          end: event.date[1],
        };
        axios
          .post(url, data)
          .then((response) => {
            this.setState({ add_loading: false });
            this.fetch_data();
            this.hide_add_modal();
          })
          .catch((error) => {
            let e = error.response.data;
            if (e.errors != undefined) {
              let msg = e.errors.date[0];
              let slots = [];
              for (var slot in e.errors.booked_slots) {
                slots.push(
                  moment(slot[0]).format("Y-M-d H:M:S") +
                    " - " +
                    moment(slot[1]).format("Y-M-d H:M:S")
                );
              }
              this.add_form_ref.current.setFields([
                {
                  name: "date",
                  errors: [msg, ...slots],
                },
              ]);
            }
            this.setState({ add_loading: false });
          });
      }
    );
  };

  // Edit modal helper functions
  show_edit_modal = async (record) => {
    await this.setState({
      edit_visible: true,
      key: record.key,
    });
    axios.get(url + record.key).then((res) => {
      record = res.data;
      console.log(this.edit_form_ref);
      let data = {
        name: record.name,
        interviewer: JSON.stringify(record.interviewer.id),
        interviewee: JSON.stringify(record.interviewee.id),
        date: [moment(record.start), moment(record.end)],
      };
      this.edit_form_ref.current.setFieldsValue(data);
    });
  };

  hide_edit_modal = () => {
    this.edit_form_ref.current.resetFields();
    this.setState({
      edit_visible: false,
    });
  };

  // Edit form helper functions
  submit_edit_form = (event) => {
    this.setState(
      {
        edit_loading: true,
      },
      () => {
        console.log(event);
        let data = {
          name: event.name,
          interviewer: parseInt(event.interviewer),
          interviewee: parseInt(event.interviewee),
          start: event.date[0],
          end: event.date[1],
        };
        axios
          .put(url + this.state.key + "/", data)
          .then((response) => {
            this.setState({ edit_loading: false });
            this.fetch_data();
            this.hide_edit_modal();
          })
          .catch((error) => {
            let e = error.response.data;
            if (e.errors != undefined) {
              let msg = e.errors.date[0];
              let slots = [];
              for (var slot in e.errors.booked_slots) {
                slots.push(
                  moment(slot[0]).format("Y-M-d H:M:S") +
                    " - " +
                    moment(slot[1]).format("Y-M-d H:M:S")
                );
              }
              this.edit_form_ref.current.setFields([
                {
                  name: "date",
                  errors: [msg, ...slots],
                },
              ]);
            }
            this.setState({ edit_loading: false });
          });
      }
    );
  };

  // Delete modal helper functions
  show_confirm_delete = (id) => {
    console.log(id);
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete this interview?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.handle_delete(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    });
  };

  // Delete request function
  handle_delete(id) {
    console.log(id);
    axios
      .delete(url + id)
      .then((response) => {
        this.fetch_data();
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const {
      add_visible,
      add_loading,
      edit_visible,
      edit_loading,
      data,
      interviewees,
      interviewers,
    } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add Interview"
          visible={add_visible}
          style={{ top: 20 }}
          confirmLoading={add_loading}
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
            add_form_ref={this.add_form_ref}
          />
        </Modal>

        <Modal
          title="Edit Interview"
          visible={edit_visible}
          style={{ top: 20 }}
          confirmLoading={edit_loading}
          onCancel={this.hide_edit_modal}
          okButtonProps={{
            form: "edit-form",
            key: "submit",
            htmlType: "submit",
          }}
        >
          <EditForm
            submit_edit_form={this.submit_edit_form}
            interviewees={interviewees}
            interviewers={interviewers}
            edit_form_ref={this.edit_form_ref}
          />
        </Modal>

        <CustomTable
          dataSource={data}
          columns={columns}
          title="Interviews"
          show_add_modal={this.show_add_modal}
          show_edit_modal={this.show_edit_modal}
          show_confirm_delete={this.show_confirm_delete}
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
