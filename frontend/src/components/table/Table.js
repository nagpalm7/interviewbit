import React from "react";
import { Table, Card, Button, Space } from "antd";
import "./Table.css";

class CustomTable extends React.Component {
  render() {
    const { Column } = Table;
    const {
      title,
      show_add_modal,
      dataSource,
      columns,
      show_confirm_delete,
      show_edit_modal,
    } = this.props;

    return (
      <div className="site-card-border-less-wrapper">
        <Card
          title={title}
          bordered={false}
          extra={<Button onClick={show_add_modal}>Add</Button>}
          style={{ width: "100%" }}
        >
          <Table
            dataSource={dataSource}
            // columns={columns}
          >
            {columns.map((record) => (
              <Column
                title={record.title}
                dataIndex={record.dataIndex}
                key={record.key}
              />
            ))}
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button onClick={() => show_edit_modal(record)}>Edit</Button>
                  <Button onClick={() => show_confirm_delete(record.key)}>
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Card>
      </div>
    );
  }
}

export default CustomTable;
