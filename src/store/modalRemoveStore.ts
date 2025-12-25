import { defineStore } from "pinia";
import { ref } from "vue";
import { usePasswordStore } from "./passwordStore";
import { savePasswords } from "../utils/storage";
import { useEditPasswordStore } from "./editPasswordStore";

export const useModalRemoveStore = defineStore("modalRemove", () => {
  const isOpen = ref(false);
  const openModal = () => {
    isOpen.value = true;
    document.body.classList.add("overflow-hidden");
  };
  const closeModal = () => {
    isOpen.value = false;
    document.body.classList.remove("overflow-hidden");
  };
  const remove = (id: string) => {
    const PasswordStore = usePasswordStore();
    const editPasswordStore = useEditPasswordStore();
    PasswordStore.passwords = PasswordStore.passwords.filter(
      (r) => r.id !== id
    );
    savePasswords(PasswordStore.passwords);
    PasswordStore.updateSelectedPassword();
    closeModal();
    editPasswordStore.isEditing = false;
    PasswordStore.selectedTag = "All";
  };
  return { isOpen, openModal, closeModal, remove };
});
