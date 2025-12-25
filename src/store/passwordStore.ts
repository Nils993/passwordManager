import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { PasswordEntry } from "../utils/types";
import { loadPasswords, savePasswords } from "../utils/storage";
import { useEditPasswordStore } from "./editPasswordStore";

export const usePasswordStore = defineStore("password", () => {
  const passwords = ref<PasswordEntry[]>([]);
  const selectedPassword = ref<PasswordEntry | null>(null);
  const showModal = ref(false);
  const searchPassword = ref("");
  const selectedTag = ref("All");
  const isCopy = ref(false);

  const form = ref({
    title: "",
    login: "",
    password: "",
    url: "",
    tagsInput: "",
    comment: "",
    favorite: false,
  });
  function load() {
    passwords.value = loadPasswords();
    updateSelectedPassword();
  }

  load();
  function updateSelectedPassword() {
    if (passwords.value.length > 0) {
      selectedPassword.value = passwords.value[0];
    } else {
      selectedPassword.value = null;
    }
  }
  async function addPassword() {
    const tagsArray = form.value.tagsInput
      ? form.value.tagsInput.split(",").map((tag) => tag.trim())
      : [];
    passwords.value.push({
      id: Date.now().toString(),
      title: form.value.title,
      login: form.value.login,
      password: form.value.password,
      url: form.value.url,
      tags: tagsArray,
      comment: form.value.comment,
      favorite: form.value.favorite,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    resetForm();
    showModal.value = false;
    savePasswords(passwords.value);
    updateSelectedPassword();
  }
  function resetForm() {
    form.value = {
      title: "",
      login: "",
      password: "",
      url: "",
      tagsInput: "",
      comment: "",
      favorite: false,
    };
  }
  function selectPassword(password: PasswordEntry) {
    selectedPassword.value = password;
    const editPasswordStore = useEditPasswordStore();
    editPasswordStore.isEditing = false;
  }
  const searchAndFilter = computed(() => {
    let password = passwords.value;
    if (searchPassword.value) {
      const search = searchPassword.value.toLocaleLowerCase();
      return password.filter(
        (item) =>
          item.title.toLocaleLowerCase().includes(search) ||
          item.login.toLocaleLowerCase().includes(search) ||
          item.url?.toLocaleLowerCase().includes(search)
      );
    }
    if (!selectedTag.value.includes("All")) {
      return password.filter((item) => item.tags.includes(selectedTag.value));
    }

    return password;
  });

  const groupedByTags = computed(() => {
    const groups: Record<string, PasswordEntry[]> = {};
    passwords.value.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!groups[tag]) {
          groups[tag] = [];
        }
        groups[tag].push(item);
      });
    });
    return groups;
  });
  return {
    showModal,
    passwords,
    form,
    selectedPassword,
    searchPassword,
    selectedTag,
    groupedByTags,
    searchAndFilter,
    isCopy,
    addPassword,
    resetForm,
    load,
    selectPassword,
    updateSelectedPassword,
  };
});
