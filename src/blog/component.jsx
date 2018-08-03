import React from 'react';
import {observer} from 'mobx-react';
import {Tabs} from "antd";
import {mermaid} from '../utils/mermaid.jsx';

const {TabPane} = Tabs;


@observer
class Blog extends React.Component {
  constructor(props) {
    super(props);
    const {listStore} = this.props;
    listStore.get();
  }

  selectBlog = (key) => {
    const {store, listStore} = this.props;
    if (key === 'ADD') {
      store.onEdit();
    } else {
      listStore.setActiveKey(key);
      store.onView();
    }
  };

  editBlog = (e) => {
    const {listStore} = this.props;
  };

  /**
   * 更新后渲染mermaid
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("mermaid.init(undefined)");
    mermaid.init(undefined, ".mermaid")
  }

  render() {
    const {listStore, store} = this.props;
    return (
      <div>
        <Tabs activeKey={listStore.ActiveKey}
              tabPosition="right"
              onTabClick={this.selectBlog}
              size="small"
              type="card"
              tabBarStyle={{right: 0, position: 'fixed',}}
        >
          <TabPane tab="+" key={listStore.ADD}></TabPane>
          {listStore.data.map(i => (
            <TabPane tab={i.id} key={i.id.toString()}></TabPane>
          ))}
        </Tabs>
        <div>
          <div><a onClick={store.onEdit}>编辑</a><a>删除</a></div>
          <textarea value={listStore.content}
                    style={{width: "100%", height: "100vh", display: store.textareaDisplay}}></textarea>
          <div dangerouslySetInnerHTML={{__html: listStore.htmlContent}} style={{display: store.htmlDisplay}}></div>
        </div>
      </div>
    )
  }
}

export {Blog}

