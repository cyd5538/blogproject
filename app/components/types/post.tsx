export type SinglePostType = {
  id: string;
  title: string;
  updatedAt?: string;
  createdAt?: string;
  content: string;
  user: {
    id: string;
    image: string;
    name: string;
    email: string;
  }
  comments?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
}