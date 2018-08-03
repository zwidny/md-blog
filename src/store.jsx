import {BlogStore, BlogListStore} from "./blog/store.jsx";
import {observable, computed, reaction} from "mobx";


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

export default {blogListStore, blogStore}