export interface Post {
    _id: string;
    userId: string;
    title: string;
    description: string;
    likes?: object;
    comments?: any[]; // You can specify a more specific type for comments if needed
    __v?: number;
    createdAt: Date;
    updatedAt: Date;
  }
  