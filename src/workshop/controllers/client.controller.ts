import {
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { WorkshopService } from '../workshop.service';
import { RoleSerializationInterceptor } from '../interceptors/role-serialization.interceptor';
import { PaginationDto } from '../dto/pagination.dto';

@Controller('client/users')
@UseInterceptors(RoleSerializationInterceptor)
export class ClientController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Get()
  findAll() {
    return this.workshopService.findAll();
  }

  @Get('paginated')
  findPaginated(@Query() paginationDto: PaginationDto) {
    return this.workshopService.findUsersPaginated(
      paginationDto.page,
      paginationDto.limit,
    );
  }
}

