import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;

class PageLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  navigate = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            {this.state.collapsed ? "IB" : " Interview Bit"}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={() => {
                this.navigate("interviewer");
              }}
              icon={<UserOutlined />}
            >
              Interviewers
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                this.navigate("interviewee");
              }}
              icon={<UserOutlined />}
            >
              Interviewees
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                this.navigate("interview");
              }}
              icon={<VideoCameraOutlined />}
            >
              Interviews
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              color: "white",
              fontSize: "16px",
            }}
          >
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{ padding: "0 50px", marginTop: 64, height: "100vh" }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Mohit ©2020 Created by MN
          </Footer>
        </Layout>
      </Layout>
    );
    // return <div className="public-container">{props.children}</div>;
  }
}

export default PageLayout;
