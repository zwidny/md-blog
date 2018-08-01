import {RequestStore} from "./common/store.jsx";


const API = {
  blogList: `${SERVICE_URL}/blog/`,

};

const blogList = new RequestStore(API.blogList);
export {blogList}