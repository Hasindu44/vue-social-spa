export interface Project {
  id: number;
  title: string;       // Project Title
  body: string;        // Technical Description
  tags: string[];      // Tech Stack (Languages/Tools)
  reactions: {
    likes: number;    
    dislikes: number;
  };
  views: number;       // Project popularity
  userId: number;      // Lead Developer ID
}