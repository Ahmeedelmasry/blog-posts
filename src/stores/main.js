import { defineStore } from "pinia";

export const mainStore = defineStore("mainStore", {
  state: () => ({
    apiURL: "https://jsonplaceholder.typicode.com",
  }),
});
