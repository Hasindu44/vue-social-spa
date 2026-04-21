export interface Project {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  imageUrl?: string;
  reactions: {
    likes: number;
    dislikes: number;
  };
  isLiked?: boolean;
  views: number;
}