import {RequestStore, AjaxStore} from "../common/store.jsx";
import {observable, computed, reaction} from "mobx";
import {marked} from "../utils/markdown.jsx";

const _ = require('lodash');

// 状态与是否展示HTML的关系.
const STATE2HTML = {
  edit: false,
  preview: true,
  browse: true
};


class BlogStore extends RequestStore {
  @observable id = '';  // blog id
  @observable content = '';
  @observable originalContent = '';
  @observable changed = false;
  @observable state = 'browse';

  constructor(url, settings) {
    super(url, settings);
    reaction(() => this.response.jqXHR, data => {
      if (data.status === 200) {
        this.content = data.responseJSON.content;
        this.originalContent = data.responseJSON.content;
        this.id = data.responseJSON.id
      }
    })
  }

  onEdit = (e) => {
    this.state = 'edit'
  };

  goonEdit = () => {
    this.state = 'edit';
  };

  onView = (e) => {
    this.state = 'browse'
  };
  onExit = (e) => {
    this.state = 'browse';
    this.content = this.originalContent;
  };

  onPreview = (e) => {
    this.state = 'preview'
  };

  @computed get shouldUpdateHtml() {
    return STATE2HTML[this.state]
  }

  @computed get textareaDisplay() {
    if (STATE2HTML[this.state]) {
      return 'none';
    }
    return 'block';
  }

  @computed get htmlDisplay() {
    if (STATE2HTML[this.state]) {
      return 'block';
    }
    return 'none';
  }

  updateContent = (e) => {
    console.log("updateContent", e.target.value);
    this.content = e.target.value;
    this.changed = true;
  };

  onDelete = () => {
    this.delete(JSON.stringify({
      id: this.id
    }))
  };

  save = () => {
    if (!this.changed) {
      return;
    }
    if (this.id === "ADD") {
      this.post();
      return;
    }
    this.put(JSON.stringify({
      id: this.id,
      content: this.content
    }))
  };

  @computed get htmlContent() {
    let __html = "<div></div>";
    const content = this.content;
    if (content) {
      __html = marked(content);
    }
    return __html
  }
}

class BlogListStore extends RequestStore {
  ADD = "ADD";

  @observable activekey = this.ADD;

  constructor(url, settings = {}) {
    super(url, settings);
    this.ajaxStore = new AjaxStore();
    reaction(() => this.activekey, data => {
      if (data !== this.ADD) {
        this.ajaxStore.ajax({
          url: `${url}${data}`,   // blog/1
          method: 'GET'
        })
      }
    })
  }

  /**
   * 返回选中blog的内容.
   * @returns {string}
   */
  @computed get content() {
    console.log("BlogListStore ajaxStore.response", this.ajaxStore.response);
    if (_.isEmpty(this.ajaxStore.response.data)) {
      return '';
    }
    return this.ajaxStore.response.data.content;
  }

  setActiveKey = (value) => {
    this.activekey = value;
  };

  @computed get data() {
    if (_.isEmpty(this.response.data)) {
      return []
    }
    return this.response.data;
  }

  @computed get ActiveKey() {
    if (!_.isEmpty(this.response.data) && this.activekey === this.ADD) {
      return this.response.data[0].id.toString();
    }
    return this.activekey
  }
}

export {BlogStore, BlogListStore}