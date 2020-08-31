import React from "react";
import { Table, Card, Button } from "antd";
import "./Table.css";

class CustomTable extends React.Component {
  render() {
    return (
      <div className="site-card-border-less-wrapper">
        <Card
          title={this.props.title}
          bordered={false}
          extra={<Button>Add</Button>}
          style={{ width: "100%" }}
        >
          <Table
            dataSource={this.props.dataSource}
            columns={this.props.columns}
          />
        </Card>
      </div>
    );
  }
}

export default CustomTable;
