import React from 'react';
import {observer, inject} from 'mobx-react';
import {Button, Popconfirm, Row, Col} from "antd";
import {mermaid} from '../utils/mermaid.jsx';


@inject('_store')
@observer
class BlogDetail extends React.Component {

  constructor(props) {
    super(props);
    const {store, _store} = this.props;
    store.getOrCreate(_store.kwargs);
  }

  /**
   * 更新后渲染mermaid
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {store} = this.props;
    if (store.shouldUpdateHtml) {
      console.log("shouldUpdateHtml");
      try {
        mermaid.init(undefined, ".mermaid")
      } catch (e) {
        console.log(e);
      }
    }
  }

  get renderAction() {
    const {store, _store} = this.props;
    // 编辑模式-> 保存， 删除， 预览
    const _home = <Button type="primary"
                          onClick={() => {
                            store.onExit();
                            _store.updateLocation('/');
                          }}>返回首页</Button>;
    const _save = <Button type="primary" onClick={store.save}>保存</Button>;
    const _delete = (
      <Popconfirm title="你是否真的要删除这条blog？"
                  onConfirm={() => store.onDelete()}
                  onCancel={() => (console.log())}
                  okText="是"
                  cancelText="否">
        <Button type="danger">删除</Button>
      </Popconfirm>
    );
    const _preview = <Button onClick={store.onPreview}>预览</Button>;
    const _exit = <Button onClick={store.onExit}>不保存退出</Button>;


    return {
      edit: (
        <div>
          {_home}
          {_save}
          {_delete}
          {_preview}
          {_exit}
        </div>
      ),
      preview: (
        <div>
          {_home}
          {_save}
          {_delete}
          <Button onClick={store.goonEdit}>继续编辑</Button>
          {_exit}
        </div>
      ),
      browse: (
        <div>
          {_home}
          <Button type="primary" onClick={store.onEdit}>编辑</Button>
          {_delete}
        </div>
      )
    }[store.state];
  }

  render() {
    const {store} = this.props;
    return (
      <div>
        <Row type="flex" justify="end">
          <Col>
            {this.renderAction}
          </Col>
        </Row>
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
        <div dangerouslySetInnerHTML={{__html: store.htmlContent}}
             style={{display: store.htmlDisplay}}></div>
      </div>
    )
  }
}

@inject('_store')
@observer
class BlogList extends React.Component {
  componentDidMount() {
    const {store} = this.props;
    store.get()
  }

  render() {
    const {store, _store} = this.props;
    return (
      <div>
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary"
                    onClick={() => {
                      _store.updateLocation('/blog', {"id": "ADD"})
                    }}
            >新建</Button></Col>
        </Row>

        {store.data.map((i, index) => (
          <section className="hero" key={index}>
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  <a onClick={_store.updateLocation.bind(_store, '/blog', {id: i.id})}>{i.title}</a>
                </h1>
              </div>
            </div>
          </section>
        ))}
      </div>
    )
  }
}

export {BlogList, BlogDetail}

