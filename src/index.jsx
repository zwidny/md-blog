import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {Layout} from 'antd';
import {Sider, SiderStore} from './base/silder.jsx';
import {BlogList} from "./blog/component.jsx";
import Store from './store.jsx';
import './common/base.scss';

const {Content} = Layout;
const siderStore = new SiderStore();

@observer
class APP extends React.Component {
  render() {
    return (
      <Layout>
        <Layout style={{minHeight: '100vh'}}>
          <Sider store={siderStore}/>
          <Content>
            <BlogList store={Store.blogListStore}/>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

// --------------------  app  --------------------------

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);