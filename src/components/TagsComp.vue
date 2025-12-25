<template>
  <div class="p-5">
    <h2>Метки:</h2>
    <select name="tags" id="tags" v-model="PasswordStore.selectedTag">
      <option value="All">All</option>
      <option
        v-for="(password, tag) in PasswordStore.groupedByTags"
        :key="tag"
        :value="tag"
      >
        {{ tag }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { watch } from "vue";
import { usePasswordStore } from "../store/passwordStore";
const PasswordStore = usePasswordStore();
</script>
