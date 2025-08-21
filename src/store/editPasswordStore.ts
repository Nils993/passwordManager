import { defineStore } from "pinia";
import { ref } from "vue";
import { usePasswordStore } from "./passwordStore";
import { savePasswords } from "../utils/storage";
export const useEditPasswordStore = defineStore("editedpassword", () => {
  const isEditing = ref(false); //передать в remove
  const showPassword = ref(false);
  const editForm = ref({
    title: "",
    login: "",
    password: "",
    url: "",
    tagsInput: "",
    comment: "",
    favorite: false,
  });
  function startEditing() {
    const PasswordStore = usePasswordStore();
    if (!PasswordStore.selectedPassword) {
      console.warn("Нет выбранного пароля");
      return;
    }
    isEditing.value = true;
    Object.assign(editForm.value, {
      id: PasswordStore.selectedPassword.id,
      title: PasswordStore.selectedPassword.title,
      login: PasswordStore.selectedPassword.login,
      password: PasswordStore.selectedPassword.password,
      url: PasswordStore.selectedPassword.url,
      tagsInput: PasswordStore.selectedPassword.tags.join(", "),
      comment: PasswordStore.selectedPassword.comment,
      favorite: PasswordStore.selectedPassword.favorite,
    });
  }

  function closeEditing() {
    //добавить в выбор
    isEditing.value = false;
    showPassword.value = false;
  }
  function saveEdits() {
    const PasswordStore = usePasswordStore();

    const index = PasswordStore.passwords.findIndex(
      (p) => p.id === PasswordStore.selectedPassword?.id
    );
    const updatedTags = editForm.value.tagsInput
      ? editForm.value.tagsInput.split(",").map((tag) => tag.trim())
      : [];

    // Обновляем объект пароля
    PasswordStore.passwords[index] = {
      ...PasswordStore.passwords[index],
      title: editForm.value.title,
      login: editForm.value.login,
      password: editForm.value.password,
      url: editForm.value.url,
      tags: updatedTags,
      comment: editForm.value.comment,
      favorite: editForm.value.favorite,
      updatedAt: new Date(),
    };
    PasswordStore.selectedPassword = PasswordStore.passwords[index];
    savePasswords(PasswordStore.passwords);
    closeEditing();
  }
  return {
    isEditing,
    editForm,
    showPassword,
    startEditing,
    closeEditing,
    saveEdits,
  };
});
