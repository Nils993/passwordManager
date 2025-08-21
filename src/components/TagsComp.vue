<template>
  <div class="p-5">
    <h2>Метки:</h2>
    <ul class="flex flex-col gap-3 mt-5">
      <li
        v-for="(password, tag) in PasswordStore.groupedByTags"
        :key="tag"
        @click="PasswordStore.selectTag(tag)"
        :class="[
          'cursor-pointer px-4 py-2 rounded',
          PasswordStore.selectedTag === tag
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-black',
        ]"
      >
        {{ tag }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { usePasswordStore } from "../store/passwordStore";
const PasswordStore = usePasswordStore();
</script>
