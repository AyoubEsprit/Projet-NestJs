import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.repo.create({ ...dto, active: false });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOneById(id: string) {
    return this.repo.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  findActive() {
    return this.repo.findBy({ active: true });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.repo.update(id, dto);
    return this.findOneById(id);
  }

  async remove(id: string) {
    const user = await this.findOneById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.remove(user);
  }

  async activate(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== password)
      throw new Error('Password incorrect');

    user.active = true;
    return this.repo.save(user);
  }
}
