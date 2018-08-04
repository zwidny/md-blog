import React from 'react';
import ReactDOM from 'react-dom';
import {observer, Provider, inject} from 'mobx-react';
import {computed, observable, reaction} from 'mobx';
import {Layout} from 'antd';
import {BlogList, BlogDetail} from "./blog/component.jsx";
import Store from './store.jsx';
// import './common/base.scss';

const {Content, Header} = Layout;

class APPStore {
  @observable location = '/';
  @observable kwargs = {};

  constructor() {
    reaction(
      () => JSON.stringify({action: Store.blogStore.action, status: Store.blogStore.status}),
      data => {
        const statusAction = this.getStatusAction(data);
        const location = this.STATUSACTION2LOCATION[statusAction];
        if (location)
          this.updateLocation(location);
      })
  }

  getStatusAction(data) {
    const _data = JSON.parse(data);
    return `${_data.action.toUpperCase()}:${_data.status.toUpperCase()}`
  }

  STATUSACTION2LOCATION = {
    'DELETE:DONE': '/'
  };

  Location2Component = {
    '/': <BlogList store={Store.blogListStore}/>,
    '/blog': <BlogDetail store={Store.blogStore}/>
  };

  @computed get Component() {
    return this.Location2Component[this.location]
  }

  updateLocation = (location, kwargs) => {
    this.location = location;
    this.kwargs = kwargs;
  }
}

@inject("_store")
@observer
class APP extends React.Component {
  render() {
    const {_store} = this.props;
    return (
      <Layout>
        {/*<Header style={{*/}
          {/*position: 'fixed',*/}
          {/*zIndex: 1,*/}
          {/*height: "32px",*/}
          {/*lineHeight: "32px",*/}
          {/*width: '100%'*/}
        {/*}}>Header</Header>*/}
        <Layout style={{minHeight: '100vh'}}>
          <Content>
            {_store.Component}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

// --------------------  app  --------------------------
const appStore = new APPStore();
ReactDOM.render(
  <Provider _store={appStore}>
    <APP/>
  </Provider>,
  document.getElementById('root')
);