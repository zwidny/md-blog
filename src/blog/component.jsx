import React from 'react';
import {observer} from 'mobx-react';
import {Tabs} from "antd";
import Stackedit from "stackedit-js";
import {mermaid} from '../utils/mermaid.jsx';

const {TabPane} = Tabs;
const stackedit = new Stackedit();


@observer
class Blog extends React.Component {
  constructor(props) {
    super(props);
    const {store, listStore} = this.props;
    stackedit.on("fileChange", store.updateContent);
    stackedit.on("close", store.save(listStore.activekey));
    listStore.get();
  }

  selectBlog = (key) => {
    const {store, listStore} = this.props;
    if (key === 'ADD') {
      listStore.setActiveKey("ADD");
      stackedit.openFile({
        name: "新建文档",
        content: {
          text: store.content
        }
      })
    } else {
      listStore.setActiveKey(key)
    }
  };

  editBlog = (e) => {
    const {listStore} = this.props;
    stackedit.openFile({
      name: "修改文档",
      content: {
        text: listStore.content
      }
    })
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
    const {listStore} = this.props;
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
          <textarea style={{display: 'none'}}></textarea>
          <div><a onClick={this.editBlog}>编辑</a><a>删除</a></div>
          <div dangerouslySetInnerHTML={{__html: listStore.htmlContent}}></div>
        </div>
      </div>
    )
  }
}

export {Blog}

