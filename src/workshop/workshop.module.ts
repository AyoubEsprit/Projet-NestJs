import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopUser } from './entities/workshop-user.entity';
import { WorkshopService } from './workshop.service';
import { WorkshopController } from './workshop.controller';
import { AdminController } from './controllers/admin.controller';
import { ClientController } from './controllers/client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopUser])],
  controllers: [WorkshopController, AdminController, ClientController],
  providers: [WorkshopService],
  exports: [WorkshopService],
})
export class WorkshopModule {}

