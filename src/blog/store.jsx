import {RequestStore} from "../common/store.jsx";
import {observable, computed, reaction} from "mobx";

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

  save = () => {
    if (this.changed) {
      this.post()
    }

  }
}

class BlogListStore extends RequestStore {
  @computed get data() {
    if (_.isEmpty(this.response.data)) {
      return []
    }
    return this.response.data;
  }

  @computed get ActiveKey() {
    if (!_.isEmpty(this.response.data)) {
      return this.response.data[0].id.toString()

    }
  }
}

export {BlogStore, BlogListStore}