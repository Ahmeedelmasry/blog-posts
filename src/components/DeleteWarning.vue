<template>
  <div class="delete_alert">
    <v-dialog v-model="dialog" max-width="500" :persistent="loading">
      <v-card class="card text-center pt-3 pb-7 px-4">
        <div class="text-center mb-2">
          <v-icon size="70" color="orange-darken-1">mdi-alert-circle</v-icon>
        </div>
        <h3 style="font-size: 22px; color: rgb(234, 148, 68)">Delete Post</h3>
        <p style="font-size: 19px; color: rgb(138, 138, 138)" class="mt-1">
          Are you sure you want to delete this blog post?
        </p>
        <div class="mt-3">
          <v-btn
            variant="elevated"
            color="red"
            style="text-transform: none"
            @click="deletePost"
            :loading="loading"
            class="me-3"
            >Delete</v-btn
          >
          <v-btn
            variant="elevated"
            color="green"
            style="text-transform: none"
            @click="dialog = false"
            :disabled="loading"
            >Keep</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from "vue";
import { blogStore } from "@/stores/blogs/blogs.js";

// Init Store
const blogsModule = blogStore();

// Data
const dialog = ref(false);
const loading = ref(false);

// Props
const props = defineProps(["openDelete", "toDelete"]);

// Emits
const emits = defineEmits(["close_popup", "refresh_data"]);

// Methods
const deletePost = async () => {
  loading.value = true;
  const result = await blogsModule.deletePost(props.toDelete.id);
  loading.value = false;
  if (result) {
    emits("refresh_data");
    dialog.value = false;
  }
};

// Watchers
watch(
  () => dialog.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emits("close_popup");
      }, 200);
    }
  }
);

onMounted(() => {
  dialog.value = props.openDelete;
});
</script>
