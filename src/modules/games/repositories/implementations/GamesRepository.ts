import { getRepository, Like, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("games")
      .where("title ilike '%" + param + "%'")
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string; }]> {
    const count = await this.repository.query("select count(*) from games");
    // Complete usando raw query
    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    const game = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "user")
      .where("games.id = :id", { id: id })
      .getOneOrFail();

    const users = game.users;

    return users;

    // Complete usando query builder
  }
}
