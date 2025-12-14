import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkshopUserDto } from './create-workshop-user.dto';

export class UpdateWorkshopUserDto extends PartialType(CreateWorkshopUserDto) {}

