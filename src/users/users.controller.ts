// src/users/users.controller.ts
import {
  Controller, Get, Post, Put, Delete,
  Param, Query, Body, Headers, ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  

  // GET /users?status=active
  @Get()
  getAll(@Query('status') status?: string): User[] {
    return this.usersService.findAll(status);
  }

  // GET /users/:id
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findOne(id);
  }

  // GET /users/active/:status  (route demandée par l'atelier)
  @Get('active/:status')
  getActiveByStatus(@Param('status') status: string): User[] {
    return this.usersService.findAll(status);
  }

  // POST /users  (ex: inclure un header Authorization)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Headers('authorization') auth?: string,
  ): User {
    // tu peux vérifier auth ici si besoin
    const created = this.usersService.create({ ...createUserDto, status: 'active' });
    return created;
  }

  // PUT /users/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateUserDto>,
  ): User {
    return this.usersService.update(id, updateDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    this.usersService.remove(id);
    return { message: `User ${id} deleted` };
  }
}
