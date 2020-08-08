import { Injectable } from '@nestjs/common';
// import { User } from '../../database/entities/User';
// import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
// import { IUsersRepository } from '../repositories/IUsersRepository';

@Injectable()
export class CreateUserService {
  getHello(): string {
    return 'Hello World!';
  }
  // constructor(private usersRepository: IUsersRepository) {}

  // public async execute({
  //   name,
  //   email,
  //   password,
  // }: ICreateUserDTO): Promise<User> {
  //   const checkUserExists = await this.usersRepository.findByEmail(email);

  //   if (!checkUserExists) {
  //     throw new Error('User not found');
  //   }

  //   const user = await this.usersRepository.create({
  //     name,
  //     email,
  //     password,
  //   });

  //   return user;
  // }
}
