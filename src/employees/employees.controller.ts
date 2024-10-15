import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  [x: string]: any;
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);
  @Post()
  create(@Body() createEmployeeDto: Prisma.UserCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }
  @Get()
  @SkipThrottle({ default: false })
  async findAll(
    @Ip() Ip: string,
    @Query('role') role?: 'INTERN' | 'SOFTWARE_DEVELOPER' | 'ADMIN',
  ) {
    this.logger.log(`Request For All Employee\t${Ip}`);
    return this.employeesService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.UserUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
