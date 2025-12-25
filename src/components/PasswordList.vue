<template>
  <div
    class="w-80 pt-5 h-screen border-r-2 border-indigo-500 flex flex-col items-center"
  >
    <div>
      <input
        v-model="PasswordStore.searchPassword"
        placeholder="поиск"
        type="text"
        name=""
        class="w-5/6 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <TagsComp></TagsComp>
    </div>
    <button @click="openModal" class="mb-10 w-50">Добавить пароль</button>
    <div class="border-t-2 border-indigo-500 w-full"></div>
    <div class="flex flex-col h-full gap-1 overflow-y-auto scroll-smooth">
      <PasswordListItem
        v-for="password in PasswordStore.searchAndFilter"
        :key="password.id"
        :password="password"
      />
    </div>
  </div>
</template>

<script setup>
import PasswordListItem from "./PasswordListItem.vue";

import { usePasswordStore } from "../store/passwordStore";
import TagsComp from "./TagsComp.vue";
const PasswordStore = usePasswordStore();

function openModal() {
  PasswordStore.showModal = true;
}
</script>

<style lang="scss" scoped></style>
