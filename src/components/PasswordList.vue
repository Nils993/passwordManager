<template>
  <div class="w-70 pt-5 h-full border-r-2 border-indigo-500 flex flex-col p-1">
    <div>
      <input
        v-model="PasswordStore.searchPassword"
        placeholder="поиск"
        type="text"
        name=""
        class="w-5/6 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <button @click="openModal" class="mt-5">Добавить пароль</button>

    <h2 class="text-3xl font-bold mt-5 mb-5">Пароли</h2>
    <div class="flex flex-col h-110 gap-1 overflow-y-auto scroll-smooth">
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
const PasswordStore = usePasswordStore();

function openModal() {
  PasswordStore.showModal = true;
}
</script>

<style lang="scss" scoped></style>
