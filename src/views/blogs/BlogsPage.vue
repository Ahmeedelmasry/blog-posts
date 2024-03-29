<template>
  <div class="blogs">
    <div class="heading">
      <v-card color="green py-3 px-3 d-flex align-center">
        <v-card-title class="text-h4"> Blog Posts </v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          style="color: #4caf50; text-transform: unset"
          @click="createDialog = true"
          class="font-weight-bold"
          elevation="0"
          >Create Post</v-btn
        >
      </v-card>
    </div>
    <v-container fluid>
      <v-row v-if="loading">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="num in 12" :key="num">
          <v-skeleton-loader></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-if="!loading">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="item in displayPaginatedData"
          :key="item.id"
        >
          <BlogCard
            :item="item"
            @openUpdate="(toUpdate = $event), (createDialog = true)"
            @openDelete="(toDelete = $event), (openDelete = true)"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"
          ><v-pagination
            v-model="page"
            :length="Math.ceil(blogs.length / 8)"
            v-if="blogs.length && !loading"
            :total-visible="7"
          ></v-pagination
        ></v-col>
      </v-row>
    </v-container>
    <CreatePost
      v-if="createDialog"
      :createDialog="createDialog"
      @close_popup="(createDialog = false), (toUpdate = null)"
      @refresh_data="getData"
      :toUpdate="toUpdate"
    />
    <DeleteWarning
      v-if="openDelete"
      :openDelete="openDelete"
      @close_popup="(openDelete = false), (toDelete = null)"
      @refresh_data="getData"
      :toDelete="toDelete"
    />
  </div>
</template>

<script setup>
import BlogCard from "@/components/BlogCard";
import { onMounted, ref, computed } from "vue";
import { blogStore } from "@/stores/blogs/blogs.js";
import { storeToRefs } from "pinia";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import CreatePost from "@/components/CreatePost.vue";
import DeleteWarning from "@/components/DeleteWarning.vue";

// Init Store
const blogsModule = blogStore();

// Store Data
const { blogs } = storeToRefs(blogsModule);

// Local data
const loading = ref(true);
const createDialog = ref(false);
const openDelete = ref(false);
const toUpdate = ref(null);
const toDelete = ref(null);
const page = ref(1);

// Computed
const displayPaginatedData = computed(() => {
  if (blogs.value.length)
    return blogs.value.slice(page.value * 8 - 8, page.value * 8);
  return [];
});

// Methods
const getData = async () => {
  loading.value = true;
  await blogsModule.getAllBlogs();
  loading.value = false;
};

// Hooks
onMounted(() => {
  getData();
});
</script>
