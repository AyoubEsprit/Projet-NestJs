import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MongoRepository } from 'typeorm';
import { WorkshopUser, UserRole } from './entities/workshop-user.entity';
import { CreateWorkshopUserDto } from './dto/create-workshop-user.dto';
import { UpdateWorkshopUserDto } from './dto/update-workshop-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class WorkshopService {
  private readonly logger = new Logger(WorkshopService.name);

  constructor(
    @InjectRepository(WorkshopUser)
    private readonly userRepository: MongoRepository<WorkshopUser>,
  ) {}

  async create(dto: CreateWorkshopUserDto): Promise<WorkshopUser> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepository.create({
      ...dto,
      active: false,
      role: dto.role || UserRole.CLIENT,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<WorkshopUser[]> {
    return this.userRepository.find();
  }

  async findOneById(id: string): Promise<WorkshopUser> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) } as any,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<WorkshopUser> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async findActive(): Promise<WorkshopUser[]> {
    return this.userRepository.find({
      where: { active: true },
    });
  }

  async update(id: string, dto: UpdateWorkshopUserDto): Promise<WorkshopUser> {
    const user = await this.findOneById(id);

    this.logger.log(`Updating user ${id}: ${JSON.stringify(dto)}`);

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  async activateUser(email: string, password: string): Promise<WorkshopUser> {
    const user = await this.findOneByEmail(email);

    if (user.password !== password) {
      throw new ConflictException('Invalid password');
    }

    user.active = true;
    return this.userRepository.save(user);
  }

  async findUsersExcludingFields(
    role: UserRole,
    excludeFields: string[],
  ): Promise<any[]> {
    const users = await this.userRepository.find();

    return users.map((user) => {
      const userObj = { ...user };
      excludeFields.forEach((field) => delete userObj[field]);
      return userObj;
    });
  }

  async findUsersNotUpdatedSince(months: number): Promise<WorkshopUser[]> {
    const date = new Date();
    date.setMonth(date.getMonth() - months);

    return this.userRepository.find({
      where: {
        updatedAt: { $lt: date } as any,
      },
    });
  }

  async findUsersByEmailDomain(domain: string): Promise<WorkshopUser[]> {
    const regex = new RegExp(`@${domain}$`, 'i');

    return this.userRepository.find({
      where: {
        email: { $regex: regex } as any,
      },
    });
  }

  async findUsersCreatedInLastDays(days: number): Promise<WorkshopUser[]> {
    const date = new Date();
    date.setDate(date.getDate() - days);

    return this.userRepository.find({
      where: {
        createdAt: { $gte: date } as any,
      },
    });
  }

  async countUsersByRole(): Promise<any> {
    const users = await this.userRepository.find();

    const counts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return counts;
  }

  async findUsersBetweenDates(
    startDate: Date,
    endDate: Date,
  ): Promise<WorkshopUser[]> {
    return this.userRepository.find({
      where: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        } as any,
      },
    });
  }

  async findMostRecentUsers(limit: number = 10): Promise<WorkshopUser[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' } as any,
      take: limit,
    });
  }

  async getAverageDaysBetweenCreatedAndUpdated(): Promise<number> {
    const users = await this.userRepository.find();

    if (users.length === 0) return 0;

    const totalDays = users.reduce((sum, user) => {
      const diffTime = Math.abs(
        user.updatedAt.getTime() - user.createdAt.getTime(),
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return sum + diffDays;
    }, 0);

    return totalDays / users.length;
  }

  async findUsersPaginated(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: WorkshopUser[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.userRepository.find({
        skip,
        take: limit,
      }),
      this.userRepository.count(),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findUsersSortedByCreatedAt(
    order: 'ASC' | 'DESC' = 'DESC',
  ): Promise<WorkshopUser[]> {
    return this.userRepository.find({
      order: { createdAt: order } as any,
    });
  }

  async findUsersWithMultipleSorting(): Promise<WorkshopUser[]> {
    return this.userRepository.find({
      order: {
        role: 'ASC',
        createdAt: 'DESC',
      } as any,
    });
  }

  async createWithDuplicateCheck(
    dto: CreateWorkshopUserDto,
  ): Promise<WorkshopUser> {
    return this.create(dto);
  }

  async updateWithLogging(
    id: string,
    dto: UpdateWorkshopUserDto,
  ): Promise<WorkshopUser> {
    const oldUser = await this.findOneById(id);
    this.logger.log(
      `Updating user ${id}. Old data: ${JSON.stringify(oldUser)}`,
    );

    const updatedUser = await this.update(id, dto);

    this.logger.log(
      `User ${id} updated. New data: ${JSON.stringify(updatedUser)}`,
    );

    return updatedUser;
  }

  async deactivateInactiveUsers(months: number = 12): Promise<number> {
    const date = new Date();
    date.setMonth(date.getMonth() - months);

    const inactiveUsers = await this.userRepository.find({
      where: {
        updatedAt: { $lt: date } as any,
        active: true,
      },
    });

    for (const user of inactiveUsers) {
      user.active = false;
      await this.userRepository.save(user);
    }

    this.logger.log(
      `Deactivated ${inactiveUsers.length} users inactive for more than ${months} months`,
    );

    return inactiveUsers.length;
  }

  async bulkUpdateRoleByDomain(
    domain: string,
    newRole: UserRole,
  ): Promise<number> {
    const users = await this.findUsersByEmailDomain(domain);

    for (const user of users) {
      user.role = newRole;
      await this.userRepository.save(user);
    }

    this.logger.log(
      `Updated role to ${newRole} for ${users.length} users with domain @${domain}`,
    );

    return users.length;
  }
}

