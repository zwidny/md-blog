import React from 'react';
import {observer} from 'mobx-react';
import {Tabs, Button} from "antd";
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
    store.id = key;
    if (key === 'ADD') {
      store.onEdit();
    } else {
      listStore.setActiveKey(key);
      store.onView();
    }
  };

  /**
   * 更新后渲染mermaid
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("mermaid.init(undefined)");
    const {store} = this.props;
    if (store.shouldUpdateHtml) {
      try {
        mermaid.init(undefined, ".mermaid")

      } catch (e) {
        console.log(e);
      }
    }
  }

  get renderAction() {
    const {store, listStore} = this.props;
    // 编辑模式-> 保存， 删除， 预览
    return {
      edit: (
        <div>
          <Button type="primary" onClick={store.save}>保存</Button>
          <Button type="danger">删除</Button>
          <Button onClick={store.onPreview}>预览</Button>
          <Button onClick={store.onView}>不保存退出</Button>
        </div>
      ),
      preview: (
        <div>
          <Button type="primary" onClick={store.save}>保存</Button>
          <Button type="danger">删除</Button>
          <Button onClick={store.goonEdit}>继续编辑</Button>
          <Button onClick={store.onExit}>不保存退出</Button>
        </div>
      ),
      browse: (
        <div>
          <Button type="primary" onClick={store.onEdit}>编辑</Button>
          <Button type="danger">删除</Button>
        </div>
      )
    }[store.state];
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
          {listStore.data.map(i => (<TabPane tab={i.id} key={i.id.toString()}></TabPane>))}
        </Tabs>
        <div>
          {this.renderAction}
          <textarea value={store.content}
                    onChange={store.updateContent}
                    style={{
                      width: "100%",
                      height: "100vh",
                      backgroundColor: "#F9FAF5",
                      color: "#2d2d1e",
                      display: store.textareaDisplay
                    }}>

          </textarea>
          <div dangerouslySetInnerHTML={{__html: store.htmlContent}} style={{display: store.htmlDisplay}}></div>
        </div>
      </div>
    )
  }
}

export {Blog}

