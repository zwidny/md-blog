import {RequestStore, AjaxStore} from "../common/store.jsx";
import {observable, computed, reaction} from "mobx";
import {marked} from "../utils/markdown.jsx";

const _ = require('lodash');

class BlogStore extends RequestStore {
  @observable content = '';
  @observable changed = false;

  constructor(url, settings = {}) {
    super(url, settings);
    reaction(() => this.response.jqXHR, data => {
      if (data.status === 200) {
        this.changed = false;
      }
    })
  }

  updateContent = (file) => {
    if (file.content && file.content.text) {
      this.content = file.content.text;
      this.changed = true;
    }
  };

  @computed get submitData() {
    return JSON.stringify({content: this.content})
  }

  save = (blog_id) => {
    if (!this.changed) {
      return;
    }
    if (blog_id === "ADD") {
      this.post();
      return;
    }
    this.put(JSON.stringify({
      id: blog_id,
      content: this.content
    }))

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

  @computed get htmlContent() {
    let __html = "<div></div>";
    const content = this.content;
    if (content) {
      __html = marked(content);
    }
    return __html
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