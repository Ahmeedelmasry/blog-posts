<template>
  <div class="blogs">
    <v-container v-if="loading" fluid>
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="article"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <BlogDetails :blog_details="blog_details" v-if="!loading" />
  </div>
</template>

<script setup>
import BlogDetails from "@/components/BlogDetails";
import { onMounted, ref } from "vue";
import { blogStore } from "@/stores/blogs/blogs.js";
import { storeToRefs } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { useRoute } from "vue-router";

// Init Store
const blogsModule = blogStore();

// Init Router
const route = useRoute();

// Store Data
const { blog_details } = storeToRefs(blogsModule);

// Local Data
const loading = ref(true);

// Methods
const getData = async () => {
  await blogsModule.getPostById(route.params.blogId);
  loading.value = false;
};

// Hooks
onMounted(() => {
  getData();
});
</script>
