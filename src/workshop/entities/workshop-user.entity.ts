import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  AfterLoad,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { Logger } from '@nestjs/common';

export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

@Entity('workshop_users')
export class WorkshopUser {
  private readonly logger = new Logger(WorkshopUser.name);

  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  logBeforeInsert() {
    this.logger.log(`[BeforeInsert] Preparing to create user: ${this.email}`);
  }

  @AfterInsert()
  logAfterInsert() {
    this.logger.log(`[AfterInsert] User created successfully - ID: ${this.id}, Email: ${this.email}`);
  }

  @AfterUpdate()
  logAfterUpdate() {
    this.logger.log(`[AfterUpdate] User updated - ID: ${this.id}, Email: ${this.email}`);
  }

  @BeforeRemove()
  logBeforeRemove() {
    this.logger.warn(`[BeforeRemove] About to delete user - ID: ${this.id}, Email: ${this.email}`);
  }

  @AfterLoad()
  logAfterLoad() {
    this.logger.debug(`[AfterLoad] User retrieved from database - ID: ${this.id}`);
  }
}

