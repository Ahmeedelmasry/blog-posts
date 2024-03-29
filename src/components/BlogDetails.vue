<template>
  <div class="blogs_details">
    <div class="heading">
      <v-card color="green py-5 ps-3">
        <v-card-title class="text-h4">
          {{ blog_details.title }}
        </v-card-title>
      </v-card>
    </div>
    <v-card class="ps-3" elevation="0">
      <v-card-text style="font-size: 17px">{{ blog_details.body }}</v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

// Props
defineProps(["blog_details"]);
</script>
