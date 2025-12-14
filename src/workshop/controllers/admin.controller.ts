import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WorkshopService } from '../workshop.service';
import { RoleSerializationInterceptor } from '../interceptors/role-serialization.interceptor';
import { PaginationDto } from '../dto/pagination.dto';
import { UserRole } from '../entities/workshop-user.entity';

@Controller('admin/users')
@UseInterceptors(RoleSerializationInterceptor)
export class AdminController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  findAll() {
    return this.workshopService.findAll();
  }

  @Get('not-updated')
  findNotUpdatedSince(@Query('months') months: number = 6) {
    return this.workshopService.findUsersNotUpdatedSince(months);
  }

  @Get('by-domain/:domain')
  findByDomain(@Param('domain') domain: string) {
    return this.workshopService.findUsersByEmailDomain(domain);
  }

  @Get('recent')
  findRecentUsers(@Query('days') days: number = 7) {
    return this.workshopService.findUsersCreatedInLastDays(days);
  }

  @Get('stats/by-role')
  countByRole() {
    return this.workshopService.countUsersByRole();
  }

  @Get('stats/between-dates')
  findBetweenDates(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.workshopService.findUsersBetweenDates(
      new Date(startDate),
      new Date(endDate),
    );
  }

  @Get('stats/most-recent')
  findMostRecent(@Query('limit') limit: number = 10) {
    return this.workshopService.findMostRecentUsers(limit);
  }

  @Get('stats/average-days')
  getAverageDays() {
    return this.workshopService.getAverageDaysBetweenCreatedAndUpdated();
  }

  @Get('paginated')
  findPaginated(@Query() paginationDto: PaginationDto) {
    return this.workshopService.findUsersPaginated(
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Get('sorted/created')
  findSortedByCreated(@Query('order') order: 'ASC' | 'DESC' = 'DESC') {
    return this.workshopService.findUsersSortedByCreatedAt(order);
  }

  @Get('sorted/multiple')
  findWithMultipleSorting() {
    return this.workshopService.findUsersWithMultipleSorting();
  }

  @Put('deactivate-inactive')
  deactivateInactive(@Query('months') months: number = 12) {
    return this.workshopService.deactivateInactiveUsers(months);
  }

  @Put('bulk-update-role')
  bulkUpdateRole(
    @Query('domain') domain: string,
    @Body('role') role: UserRole,
  ) {
    return this.workshopService.bulkUpdateRoleByDomain(domain, role);
  }
}

