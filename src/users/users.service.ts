// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  email: string;
  status: string; // 'active' | 'inactive'
};

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  findAll(filterStatus?: string): User[] {
    if (filterStatus) {
      return this.users.filter(u => u.status === filterStatus);
    }
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(data: Omit<User, 'id'>): User {
    const id = Math.max(...this.users.map(u => u.id)) + 1;
    const newUser: User = { id, ...data };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, partial: Partial<Omit<User, 'id'>>): User {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`User with id ${id} not found`);
    this.users[idx] = { ...this.users[idx], ...partial };
    return this.users[idx];
  }

  remove(id: number): void {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFoundException(`User with id ${id} not found`);
    this.users.splice(idx, 1);
  }
}
