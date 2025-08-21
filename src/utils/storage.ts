import type { PasswordEntry } from "../utils/types";
const STORAGE_KEY = "passwords";

export function savePasswords(data: PasswordEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
export function loadPasswords(): PasswordEntry[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  const parsedData: PasswordEntry[] = JSON.parse(data);
  return parsedData.map((entry) => ({
    ...entry,
    createdAt: new Date(entry.createdAt),
    updatedAt: new Date(entry.updatedAt),
  }));
}
