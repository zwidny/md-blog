import {BlogStore, BlogListStore} from "./blog/store.jsx";
import {reaction} from "mobx";
import {message} from "antd/lib/index";


const API = {
  blogList: `${SERVICE_URL}/blog/`,
  blog: `${SERVICE_URL}/blog/`,

};

const blogListStore = new BlogListStore(API.blogList);
const blogStore = new BlogStore(API.blog);
reaction(() => blogListStore.content, data => {
  blogStore.content = data;
  blogStore.originalContent = data;
});

reaction(() => blogStore.response.jqXHR, data => {
  if (data.status === 200) {
    blogStore.changed = false;
    message.info("操作成功");
    blogListStore.get()
  }
});

export default {blogListStore, blogStore}