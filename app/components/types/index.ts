export type User = {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | Date | null; 
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  followingIds: string[];
  hasNotification: boolean | null;
}