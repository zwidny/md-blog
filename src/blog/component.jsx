import React from 'react';
import {observer} from 'mobx-react';
import {Tabs} from "antd";
import Stackedit from "stackedit-js";
import {marked} from '../utils/markdown.jsx';
const {TabPane} = Tabs;
const stackedit = new Stackedit();


@observer
class Blog extends React.Component {
  constructor(props) {
    super(props);
    const {store, listStore} = this.props;
    stackedit.on("fileChange", store.updateContent);
    stackedit.on("close", store.save);
    listStore.get();
  }

  addBlog = (key) => {
    const {store} = this.props;
    if (key === 'ADD') {
      stackedit.openFile({
        name: "新建文档",
        content: {
          text: store.content
        }
      })
    }
  };

  html = (content) =>{
    let __html = "<div></div>";
    if (content) {
      __html = marked(content);
    }
    return {__html: __html}
  };

  render() {
    const {listStore} = this.props;
    return (
      <Tabs activeKey={listStore.ActiveKey}
            tabPosition="right"
            onTabClick={this.addBlog}
      >
        <TabPane tab="+" key="ADD">
          <textarea style={{display: 'none'}}></textarea>
        </TabPane>
        {listStore.data.map(i => (
          <TabPane tab={i.id} key={i.id.toString()}>
            <div dangerouslySetInnerHTML={this.html(i.content)}></div>
          </TabPane>
        ))}

      </Tabs>

    )
  }
}

export {Blog}

