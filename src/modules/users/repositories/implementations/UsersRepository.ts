import { getRepository, Repository, IsNull } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    const user = await this.repository.findOneOrFail(user_id, {
      relations: ['games'],
    });

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return await this.repository.query("select * from users order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return await this.repository.query("select * from users where first_name ilike $1 and last_name ilike $2", [first_name, last_name]); // Complete usando raw query
  }
}
