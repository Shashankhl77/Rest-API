import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto } from './dto/create-user.dto';
export enum UserRole {
  Intern = 'intern',
  SoftwareDeveloper = 'software developer',
  Admin = 'admin',
}

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  //Getting all details
  @Get()
  findAll(@Query('role') role?: UserRole) {
    return this.UserService.findAll(role);
  }

  // Getting one details
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.UserService.findOne(id);
  }

  // Adding details
  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.UserService.create(createUserDto);
  }

  // Updating details
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    return { id, CreateUserDto };
  }

  // Delete the one details
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.UserService.delete(+id);
  }
}
