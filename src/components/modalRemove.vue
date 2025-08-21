<template>
  <div
v-if="modalStore.isOpen"
    class="fixed inset-0 bg-black/50 flex z-10 items-center justify-center gap-10"
  >
    <div class="bg-white p-5 rounded shadow-lg flex flex-col gap-4">
      <h2 class="text-red-500 text-3xl">Удалить пароль?</h2>
      <p>Вы не можете отменить это действие</p>
      <div class="flex gap-5 items-center ">
        <button class="bg-red-500"
          @click="modalStore.remove(PasswordStore.selectedPassword.id)"
        >
          Удалить
        </button  class="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 text-sm font-medium">
        <button @click="modalStore.closeModal()">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePasswordStore } from "../store/passwordStore";
const PasswordStore = usePasswordStore();
import { useModalRemoveStore } from "../store/modalRemoveStore";
const modalStore = useModalRemoveStore();
</script>

<style lang="scss" scoped></style>
