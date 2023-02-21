import { User } from '../entities/user.entity';

export type CreatePostDto = {
  title: string;
  body: string;
  published?: boolean;
  author: User;
};

export type EditPostDto = {
  title?: string;
  body?: string;
  published?: boolean;
};
