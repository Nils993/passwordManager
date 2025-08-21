<template>
  <div class="app min-h-screen bg-gray-150">
    <modalRemove />
    <div class="flex">
      <PasswordList />
      <PasswordForm v-if="PasswordStore.showModal" />
      <div class="flex" v-else>
        <TagsComp />
        <PasswordItem v-if="PasswordStore.selectedPassword" />
      </div>
    </div>
  </div>
</template>
<script setup>
import PasswordForm from "./components/PasswordForm.vue";
import PasswordList from "./components/PasswordList.vue";
import PasswordItem from "./components/PasswordItem.vue";
import { usePasswordStore } from "./store/passwordStore";
import modalRemove from "./components/modalRemove.vue";
import TagsComp from "./components/TagsComp.vue";
const PasswordStore = usePasswordStore();
</script>
<style scoped></style>
