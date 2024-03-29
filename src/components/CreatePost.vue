<template>
  <div class="create_post">
    <v-dialog v-model="dialog" max-width="500" :persistent="loading">
      <v-card class="px-5 pb-3">
        <v-card-title class="text-center text-h5 mb-4"
          >{{ toUpdate ? "Update" : "Create" }} Post</v-card-title
        >
        <form action="" @submit.prevent="submitForm">
          <v-text-field
            class="mb-2"
            label="title"
            variant="outlined"
            v-model="data.title"
            :error-messages="
              v$.title.$errors[0] ? v$.title.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-textarea
            label="body"
            class="mb-2"
            variant="outlined"
            rows="10"
            v-model="data.body"
            :error-messages="
              v$.body.$errors[0] ? v$.body.$errors[0].$message : ''
            "
          ></v-textarea>
          <v-card-actions class="ps-0">
            <v-btn
              variant="elevated"
              color="green"
              type="submit"
              :loading="loading"
              style="text-transform: none"
              >Submit</v-btn
            >
            <v-btn
              variant="elevated"
              color="red"
              @click="dialog = false"
              style="text-transform: none"
              :disabled="loading"
              >Close</v-btn
            >
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits } from "vue";
import { blogStore } from "@/stores/blogs/blogs.js";

// Validator
import useVuelidator from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

// Init Store
const blogsModule = blogStore();

// Local Data
const dialog = ref(false);
const loading = ref(false);

const data = ref({
  title: null,
  body: null,
  userId: 1,
});

const roles = ref({
  title: { required, minLength: minLength(3) },
  body: { required, minLength: minLength(10) },
});

// Props
const props = defineProps(["createDialog", "toUpdate"]);

// Props
const emits = defineEmits(["close_popup", "refresh_data"]);

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

// Methods
const v$ = useVuelidator(roles, data);

const submitForm = async () => {
  const res = await v$.value.$validate();
  if (res) {
    loading.value = true;
    let result;
    if (props.toUpdate) {
      result = await blogsModule.updatePost(data.value, props.toUpdate.id);
    } else {
      result = await blogsModule.createPost(data.value);
    }
    loading.value = false;
    if (result) {
      emits("refresh_data");
      dialog.value = false;
    }
  }
};

// Hooks
onMounted(() => {
  if (props.toUpdate) {
    data.value.title = props.toUpdate.title;
    data.value.body = props.toUpdate.body;
    data.value.userId = props.toUpdate.userId;
  }
  dialog.value = props.createDialog;
});
</script>
