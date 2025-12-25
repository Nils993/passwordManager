<template>
  <div class="flex items-start flex-col m-20">
    <CopyNotification />
    <div v-if="editPasswordStore.isEditing" class="flex flex-col items-start">
      <div class="flex gap-30 items-center">
        <h3 class="font-bold text-lg w-30">
          {{ PasswordStore.selectedPassword.title }}
        </h3>
        <div class="flex gap-5 ml-20">
          <button @click="editPasswordStore.saveEdits()">Сохранить</button>
          <button @click="editPasswordStore.closeEditing()">Отменить</button>
          <button @click="modalStore.openModal()">Удалить</button>
        </div>
      </div>

      <div class="flex flex-col items-start">
        <p>Адрес веб-сайта:</p>
        <a :href="PasswordStore.selectedPassword.url">{{
          PasswordStore.selectedPassword.url
        }}</a>
      </div>
      <!-- Логин -->

      <div class="flex gap-10">
        <FormField
          v-model="editPasswordStore.editForm.login"
          label="Логин"
          placeholder="Введите логин"
        />
      </div>
      <!-- Пароль -->
      <div class="flex items-center space-x-2">
        <FormField
          v-model="editPasswordStore.editForm.password"
          label="Пароль"
          :type="editPasswordStore.showPassword ? 'text' : 'password'"
          placeholder="Введите пароль"
        />
        <div class="ml-15 flex gap-5">
          <button
            class="w-30"
            type="button"
            @click="
              editPasswordStore.showPassword = !editPasswordStore.showPassword
            "
          >
            {{ editPasswordStore.showPassword ? "Скрыть" : "Показать" }}
          </button>
          <button @click="copyPassword()">Копировать</button>
        </div>
      </div>
      <!-- Метки -->
      <FormField
        v-model="editPasswordStore.editForm.tagsInput"
        label="Метки"
        placeholder="Метки (через запятую)"
      />

      <!-- Комментарии -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Комментарии</label>
        <textarea
          v-model="editPasswordStore.editForm.comment"
          placeholder="Комментарии"
          rows="2"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
      </div>

      <!-- Избранное -->
      <div class="flex items-center space-x-2">
        <label for="favorite-checkbox" class="text-gray-700 select-none">
          <input
            v-model="editPasswordStore.editForm.favorite"
            type="checkbox"
            id="favorite-checkbox"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-blue-500"
          />
          <span v-if="editPasswordStore.editForm.favorite === true"
            >В избранном</span
          >
          <span v-else>Добавить в Избранное</span>
        </label>
      </div>

      <p>
        Создано: {{ PasswordStore.selectedPassword.createdAt.toLocaleString() }}
      </p>
      <p>
        Обновлено:
        {{ PasswordStore.selectedPassword.updatedAt.toLocaleString() }}
      </p>
    </div>
    <div v-if="!editPasswordStore.isEditing" class="flex flex-col items-start">
      <div class="flex gap-40 items-center">
        <h3 class="font-bold text-lg w-30">
          {{ PasswordStore.selectedPassword.title }}
        </h3>
        <div class="flex gap-5 ml-36">
          <button @click="editPasswordStore.startEditing()">
            Редактировать
          </button>
          <button @click="modalStore.openModal()">Удалить</button>
        </div>
      </div>
      <div class="flex flex-col items-start w-40">
        <p>Адрес веб-сайта:</p>
        <a :href="PasswordStore.selectedPassword.url">{{
          PasswordStore.selectedPassword.url
        }}</a>
        <!-- Логин -->
        <FormField
          class="flex flex-col items-start"
          v-model="PasswordStore.selectedPassword.login"
          label="Логин"
          placeholder=""
          :readonly="true"
          :inputClass="'w-full px-4 py-2 focus:outline-none'"
        />
        <!-- Пароль -->
        <div class="flex items-center gap-10">
          <FormField
            class="flex flex-col items-start"
            v-model="PasswordStore.selectedPassword.password"
            label="Пароль"
            :type="editPasswordStore.showPassword ? 'text' : 'password'"
            placeholder=""
            :readonly="true"
            :inputClass="'w-60 px-4 py-2 focus:outline-none'"
          />
          <div class="flex gap-5">
            <button
              class="w-30"
              type="button"
              @click="
                editPasswordStore.showPassword = !editPasswordStore.showPassword
              "
            >
              {{ editPasswordStore.showPassword ? "Скрыть" : "Показать" }}
            </button>
            <button @click="copyPassword()">Копировать</button>
          </div>
        </div>
      </div>
      <!-- Метки -->
      <div class="flex gap-1">
        <p>Метки:</p>
        <div
          v-if="
            PasswordStore.selectedPassword.tags &&
            PasswordStore.selectedPassword.tags.length
          "
        >
          <span
            v-for="(tag, index) in PasswordStore.selectedPassword.tags"
            :key="index"
          >
            {{ tag }}
          </span>
        </div>
        <div v-else>
          <span>Нет меток</span>
        </div>
      </div>
      <p>Комментарий: {{ PasswordStore.selectedPassword.comment }}</p>
      <p>
        <span v-if="PasswordStore.selectedPassword.favorite === true"
          >В избранном</span
        >
        <span v-else>-</span>
      </p>
      <p>
        Создано: {{ PasswordStore.selectedPassword.createdAt.toLocaleString() }}
      </p>
      <p>
        Обновлено:
        {{ PasswordStore.selectedPassword.updatedAt.toLocaleString() }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useEditPasswordStore } from "../store/editPasswordStore";
import { usePasswordStore } from "../store/passwordStore";
import FormField from "./FormField.vue";
import { useModalRemoveStore } from "../store/modalRemoveStore";
import { copyPassword } from "../utils/copyPassword";
import CopyNotification from "./copyNotification.vue";
const modalStore = useModalRemoveStore();
const editPasswordStore = useEditPasswordStore();
const PasswordStore = usePasswordStore();
const props = defineProps({
  password: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>
