import { usePasswordStore } from "../store/passwordStore";

export function copyPassword() {
  const store = usePasswordStore();

  if (store.selectedPassword && store.selectedPassword.password) {
    navigator.clipboard.writeText(store.selectedPassword.password).then(() => {
      store.isCopy = true;

      setTimeout(() => {
        store.isCopy = false;
      }, 2000);
    });
  }
}
