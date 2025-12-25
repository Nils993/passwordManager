<script setup lang="ts">
import { usePasswordStore } from "../store/passwordStore";
const store = usePasswordStore();
</script>
<template>
  <div
    v-show="store.isCopy"
    class="bg-gray-100 p-2 max-h-10 flex justify-center items-center fixed left-180 top-45"
  >
    <p class="text-green-400 text-xl">Скопировано</p>
  </div>
</template>
