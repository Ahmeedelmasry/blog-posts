<template>
  <div class="card h-100">
    <v-card
      class="blog_card pb-2 d-flex flex-column h-100"
      rounded="lg"
      variant="outlined"
    >
      <div class="body">
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-text line="2" class="py-0">{{ item.body }}</v-card-text>
      </div>
      <v-spacer></v-spacer>
      <v-card-actions class="ps-3">
        <router-link :to="{ name: 'blogDetails', params: { blogId: item.id } }"
          >Read More</router-link
        >
      </v-card-actions>
      <v-card-actions class="ps-3">
        <v-icon color="blue" class="me-2" @click="$emit('openUpdate', item)"
          >mdi-pencil-box-outline</v-icon
        >
        <v-icon color="red" @click="$emit('openDelete', item)"
          >mdi-delete-outline</v-icon
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["item"]);
</script>

<style lang="scss">
.blog_card {
  .v-card-text {
    display: -webkit-box;
    -webkit-line-clamp: 4; /* Number of lines to show */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    text-decoration: none;
    background-color: #4caf50;
    display: inline-block;
    color: white;
    border-radius: 4px;
    padding: 4px 10px;
    font-size: 13px;
  }
}
</style>
