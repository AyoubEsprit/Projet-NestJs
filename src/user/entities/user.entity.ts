import {
  Entity,
  ObjectIdColumn,
  Column,
  BeforeInsert,
  BeforeRemove,
  AfterInsert,
  AfterUpdate
} from 'typeorm';
import { Logger } from '@nestjs/common';

@Entity()
export class User {
  private readonly logger = new Logger(User.name);

  @ObjectIdColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  active: boolean;

  @BeforeInsert()
  logBeforeInsert() {
    this.logger.log(`BeforeInsert : Creating user ${this.email}`);
  }

  @AfterInsert()
  logAfterInsert() {
    this.logger.log(`AfterInsert : User created with id ${this.id}`);
  }

  @AfterUpdate()
  logAfterUpdate() {
    this.logger.log(`AfterUpdate : User updated with id ${this.id}`);
  }

  @BeforeRemove()
  logBeforeRemove() {
    this.logger.log(`BeforeRemove : Removing user id ${this.id}`);
  }
}
