import React from "react";
import axios from "axios";
import { Modal } from "antd";
import CustomTable from "../../components/table/Table";
import AddForm from "../../components/interviewer/AddForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const url = "http://localhost:8000/api/interviewers/";

class Interviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      add_visible: false,
      add_loading: false,
      key: null,
    };
  }

  add_form_ref = React.createRef();

  componentDidMount() {
    this.fetch_data();
  }

  // Fetch list of Interviews
  fetch_data = () => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.length) {
          let data = [];
          response.data.map((interviewer) => {
            let data_object = {
              key: interviewer.id,
              name: interviewer.name,
              email: interviewer.email,
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
          email: event.email,
        };
        axios
          .post(url, data)
          .then((response) => {
            this.setState({ add_loading: false });
            this.fetch_data();
            this.hide_add_modal();
          })
          .catch((error) => {
            this.setState({ add_loading: false });
          });
      }
    );
  };

  // Delete modal helper functions
  show_confirm_delete = (id) => {
    const { confirm } = Modal;
    confirm({
      title: "Do you Want to delete this interviewer?",
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
    const { add_visible, add_loading, data } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <Modal
          title="Add Interviewer"
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
            add_form_ref={this.add_form_ref}
          />
        </Modal>

        <CustomTable
          dataSource={data}
          columns={columns}
          title="Interviewers"
          show_add_modal={this.show_add_modal}
          show_confirm_delete={this.show_confirm_delete}
          hide_edit={true}
        />
      </div>
    );
  }
}

export default Interviewer;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];
