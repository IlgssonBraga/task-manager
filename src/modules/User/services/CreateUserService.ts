import { IUsersRepository } from '../repositories/IUsersRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../../Database/entities/User';

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new Error('User not found');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}