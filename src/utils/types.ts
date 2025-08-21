export interface PasswordEntry {
  id: string;
  title: string;
  url?: string;
  login: string;
  password: string;
  tags: string[];
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
}
