import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkshopService } from './workshop.service';
import { CreateWorkshopUserDto } from './dto/create-workshop-user.dto';
import { UpdateWorkshopUserDto } from './dto/update-workshop-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Controller('users')
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateWorkshopUserDto) {
    return this.workshopService.create(createDto);
  }

  @Put('activate')
  @HttpCode(HttpStatus.OK)
  activate(@Body() activateDto: ActivateUserDto) {
    return this.workshopService.activateUser(
      activateDto.email,
      activateDto.password,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workshopService.findOneById(id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.workshopService.findOneByEmail(email);
  }

  @Get('active/list')
  findActive() {
    return this.workshopService.findActive();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateWorkshopUserDto) {
    return this.workshopService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.workshopService.remove(id);
  }
}

