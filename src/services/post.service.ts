import { Post } from '../entities/post.entity';
import PaginationDto from '../dto/pagination';
import { CreatePostDto, EditPostDto } from '../dto/posts';
import { DI } from '../utils/database';
import { User } from '../entities/user.entity';
import { wrap } from '@mikro-orm/core';
import AccessDeniedError from '../errors/access-denied.error';
import BadRequestError from '../errors/bad-request.error';

class PostService {
  async findPost(post_id: number, author_id: number) {
    const repository = DI.em.getRepository(Post);
    return repository.findOne({ id: post_id, author: author_id });
  }

  async findPostsByAuthor(author_id: number, pagination: PaginationDto) {
    const repository = DI.em.getRepository(Post);
    return repository.findAndCount({ author: author_id }, pagination);
  }

  /**
   * @param author_id
   * @param dto
   *
   * @return post_id
   */
  async create(author_id: number, dto: CreatePostDto): Promise<number> {
    const repository = DI.em.getRepository(Post);
    dto.author = new User(author_id);

    const post = repository.create(dto);

    return repository.nativeInsert(post);
  }

  async edit(
    post_id: number,
    author_id: number,
    dto: EditPostDto,
  ): Promise<boolean> {
    const repository = DI.em.getRepository(Post);
    const post = await repository.findOne({ id: post_id });

    if (!post) {
      throw new BadRequestError('Post not found');
    }

    if (post.author.id !== author_id) {
      throw new AccessDeniedError('The post can be edited only by the author');
    }

    wrap(post).assign(dto);

    await repository.flush();

    return true;
  }

  async dropPost(post_id: number, author_id?: number): Promise<boolean> {
    const repository = DI.orm.em.getRepository(Post);
    const post = await repository.findOne({ id: post_id });

    if (post) {
      if (author_id && post.author.id !== post_id) {
        throw new AccessDeniedError(
          'The post can be deleted only by the author',
        );
      }

      await repository.removeAndFlush(post);

      return true;
    }

    return false;
  }
}

export default new PostService();
