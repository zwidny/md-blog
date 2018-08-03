import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import './common/base.css'
import {Layout} from 'antd';
import {Sider, SiderStore} from './base/silder.jsx';
import {Blog} from "./blog/component.jsx";
import Store from './store.jsx';

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
            <Blog store={Store.blogStore} listStore={Store.blogListStore}/>
          </Content>
        </Layout>
        {/*<Footer>Footer</Footer>*/}
      </Layout>
    )
  }
}

// --------------------  app  --------------------------

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);