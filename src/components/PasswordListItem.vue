<template>
  <div
    class="hover:bg-blue-200 p-3"
    @click="PasswordStore.selectPassword(props.password)"
  >
    <h3 class="font-bold">{{ password.title }}</h3>
    <p class="text-blue-500">{{ password.url }}</p>
    <p>{{ password.login }}</p>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { usePasswordStore } from "../store/passwordStore";
const PasswordStore = usePasswordStore();
const props = defineProps({
  password: {
    type: Object,
    required: true,
    default: () => {},
  },
});
</script>
