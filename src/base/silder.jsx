import {Layout} from 'antd';
import React from 'react';
import {observable} from "mobx";
import {observer} from 'mobx-react';

const AntSider = Layout.Sider;

class SiderStore {
  @observable collapsed = false;

  onCollapse = (collapsed, type) => {
    console.log("SiderStore", collapsed, type);
    this.collapsed = !this.collapsed;
  }
}


@observer
class Sider extends React.Component {
  render() {
    const {store} = this.props;
    return (
      <AntSider theme="light"
                collapsible={true}
                collapsed={store.collapsed}
                onCollapse={store.onCollapse.bind(store)}

      >Sider</AntSider>

    )
  }

}

export {Sider, SiderStore}
