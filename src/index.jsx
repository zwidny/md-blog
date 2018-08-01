import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {marked} from "./utils/markdown.jsx";
import './common/base.css'
import {blogList} from "./store.jsx";
import {Layout, Tabs} from 'antd';

const {Header, Footer, Sider, Content} = Layout;
const TabPane = Tabs.TabPane;

const _ = require('lodash');


@observer
class APP extends React.Component {
  get html() {
    let __html = "<div></div>";
    if (!_.isEmpty(blogList.recvData)) {
      const blog = blogList.recvData[0];
      __html = marked(blog.content);
    }

    return {__html: __html}
  }

  componentDidMount() {
    blogList.get()
  }

  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider theme="light">Sider</Sider>
          <Content>
            <Tabs
              defaultActiveKey="1"
              tabPosition="right"

            >

              <TabPane tab="+" key="1">+</TabPane>
              <TabPane tab="Tab 2" key="2">
                <div dangerouslySetInnerHTML={this.html}></div>
              </TabPane>

            </Tabs>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>


    )
  }
}

// --------------------  app  --------------------------

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);