import {BlogStore, BlogListStore} from "./blog/store.jsx";


const API = {
  blogList: `${SERVICE_URL}/blog/`,
  blog: `${SERVICE_URL}/blog/`,

};

const blogListStore = new BlogListStore(API.blogList);
const blogStore = new BlogStore(API.blog);


export default {blogListStore, blogStore}