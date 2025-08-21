<template>
  <div class="pt-5 pl-40">
    <div class="flex">
      <h2 class="text-3xl mr-15">Добавить пароль</h2>
      <div class="buttons flex gap-5">
        <!-- Кнопка отправки -->
        <button type="submit" form="form">Сохранить</button>
        <!-- Кнопка закрытия -->

        <button @click="closeModal()">Отмена</button>
      </div>
    </div>

    <form
      id="form"
      @submit.prevent="store.addPassword()"
      action="#"
      class="flex flex-col gap-3"
    >
      <!-- Название -->
      <FormField
        v-model="store.form.title"
        label="Название сайта"
        placeholder="Введите название сайта"
      />

      <!-- URL -->
      <FormField
        v-model="store.form.url"
        label="Адрес веб-сайта"
        placeholder="Введите url сайта"
        :required="false"
      />

      <!-- Логин -->
      <FormField
        v-model="store.form.login"
        label="Логин"
        placeholder="Введите логин"
      />

      <!-- Пароль -->

      <div class="flex items-center gap-5">
        <FormField
          v-model="store.form.password"
          label="Пароль"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Введите пароль"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="mt-7"
        >
          {{ showPassword ? "Скрыть" : "Показать" }}
        </button>
      </div>

      <!-- Метки -->
      <FormField
        v-model="store.form.tagsInput"
        label="Метки"
        placeholder="Метки (через запятую)"
        :required="false"
      />

      <!-- Комментарии -->
      <div class="flex flex-col items-start">
        <label class="pl-5 mb-1 font-medium text-gray-700">Комментарии</label>
        <textarea
          v-model="store.form.comment"
          placeholder="Комментарии"
          rows="2"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      <!-- Избранное -->
      <div class="flex items-center space-x-2">
        <label for="favorite-checkbox" class="text-gray-700 select-none">
          <input
            v-model="store.form.favorite"
            type="checkbox"
            id="favorite-checkbox"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-500"
          />
          <span v-if="store.form.favorite === true">В избранном</span>
          <span v-else>Добавить в Избранное</span>
        </label>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { usePasswordStore } from "../store/passwordStore";
import FormField from "./FormField.vue";
const store = usePasswordStore();
const showPassword = ref(false);
function closeModal() {
  store.showModal = false;
}
</script>

<style lang="css" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid gray;
  border-radius: 15px;
}
</style>
