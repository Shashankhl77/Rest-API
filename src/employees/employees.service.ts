import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseServices: DatabaseService) {}
  async create(createEmployeeDto: Prisma.UserCreateInput) {
    return this.databaseServices.user.create({
      data: createEmployeeDto,
    });
  }
  async findAll(role?: 'INTERN' | 'SOFTWARE_DEVELOPER' | 'ADMIN') {
    // Convert to lowercase to match Prisma enum format
    const roleFilter = role
      ? { equals: role.toLowerCase() as Role }
      : undefined;

    return this.databaseServices.user.findMany({
      where: {
        role: roleFilter, // Applying the EnumRoleFilter with lowercase role
      },
    });
  }

  findOne(id: number) {
    return this.databaseServices.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, UpdateEmployeeDto: Prisma.UserUpdateInput) {
    return this.databaseServices.user.update({
      where: {
        id,
      },
      data: UpdateEmployeeDto,
    });
  }

  remove(id: number) {
    return this.databaseServices.user.delete({
      where: {
        id,
      },
    });
  }
}
