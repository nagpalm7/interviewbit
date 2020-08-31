import React from "react";
import axios from "axios";

const url = "http://localhost:8000/api/interview/";

class CustomTable extends React.Component {
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

  fetch_data() {
    axios
      .get(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <CustomTable />
      </div>
    );
  }
}

export default CustomTable;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
