import React from "react";

class CustomTable extends React.Component {
  constructor(props) {
    this.state = {
      data: [],
      columns: [],
    };
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
