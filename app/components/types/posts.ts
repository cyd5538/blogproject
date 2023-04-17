export type AllPostType = {
  id: string;
  title: string;
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
  tags : string[]
  likedIds : string[]
}