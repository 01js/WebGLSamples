import React from "react";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
} from "react-router-dom";

import { HelloPoint1, HelloPoint2, ClickedPoints, ColoredPoints } from "./pages/index";

import "./App.less";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default () => (
  <Router>
    <Switch>
      <Route
        path="/"
        render={() => (
          <Layout>
            <Sider
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
              }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
              >
                <SubMenu key="sub1" icon={<UserOutlined />} title="WebGL入门">
                  <Menu.Item key="1">
                    <NavLink to={"/app/HelloPoint1/index"}>HelloPoint1</NavLink>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <NavLink to={"/app/HelloPoint2/index"}>HelloPoint2</NavLink>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <NavLink to={"/app/ClickedPoints/index"}>ClickedPoints</NavLink>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <NavLink to={"/app/ColoredPoints/index"}>ColoredPoints</NavLink>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header
                className="site-layout-background"
                style={{ padding: 0 }}
              />
              <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, textAlign: "center" }}
                >
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => (
                        <Redirect to="/app/HelloPoint1/index" push />
                      )}
                    />
                    <Route
                      path="/app/HelloPoint1/index"
                      component={HelloPoint1}
                    />
                    <Route
                      path="/app/HelloPoint2/index"
                      component={HelloPoint2}
                    />
                    <Route
                      path="/app/ClickedPoints/index"
                      component={ClickedPoints}
                    />
                    <Route
                      path="/app/ColoredPoints/index"
                      component={ColoredPoints}
                    />
                    
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
                webgl samples ©2020 Created by binperson
              </Footer>
            </Layout>
          </Layout>
        )}
      />
    </Switch>
  </Router>
);
