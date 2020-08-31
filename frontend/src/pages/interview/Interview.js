import React from "react";
import axios from "axios";
import moment from "moment";
import CustomTable from "../../components/Table/Table";

const url = "http://localhost:8000/api/interview/";

class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
    };
  }

  componentDidMount() {
    this.fetch_data();
  }

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

  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <CustomTable
          dataSource={this.state.data}
          columns={columns}
          title="Interviews"
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
