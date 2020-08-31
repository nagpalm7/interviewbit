import React from "react";
import { Table, Card, Button } from "antd";
import "./Table.css";

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

class CustomTable extends React.Component {
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card
          title="Interviews"
          bordered={false}
          extra={<Button>Add</Button>}
          style={{ width: "100%" }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </div>
    );
  }
}

export default CustomTable;
