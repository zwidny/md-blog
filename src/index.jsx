import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {marked} from "./utils/markdown.jsx";
import './common/base.css'
import {blogList} from "./store.jsx";
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

        <div dangerouslySetInnerHTML={this.html}></div>

    )
  }
}

// --------------------  app  --------------------------

ReactDOM.render(
  <APP/>,
  document.getElementById('root')
);