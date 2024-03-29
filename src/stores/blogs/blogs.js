import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const blogStore = defineStore("blogStore", {
  state: () => ({
    blogs: [],
    blog_details: null,
  }),
  actions: {
    async getAllBlogs() {
      await axios
        .get(`${mainStore().apiURL}/posts`)
        .then((res) => {
          this.blogs = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getPostById(blogId) {
      this.blog_details = null;
      await axios
        .get(`${mainStore().apiURL}/posts/${blogId}`)
        .then((res) => {
          this.blog_details = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async createPost(data) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/posts`, data)
        .then(() => {
          result = true;
        })
        .catch((err) => {
          console.log(err);
          result = false;
        });
      return result;
    },
    async updatePost(data, postId) {
      let result;
      await axios
        .put(`${mainStore().apiURL}/posts/${postId}`, data)
        .then(() => {
          result = true;
        })
        .catch((err) => {
          console.log(err);
          result = false;
        });
      return result;
    },
    async deletePost(postId) {
      let result;
      await axios
        .delete(`${mainStore().apiURL}/posts/${postId}`)
        .then(() => {
          result = true;
        })
        .catch((err) => {
          console.log(err);
          result = false;
        });
      return result;
    },
  },
});
