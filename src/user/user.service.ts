import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UserService {
  private user = [
    {
      id: 1,
      name: 'shashank',
      age: '24',
      role: 'Sofware developer',
    },
    {
      id: 2,
      name: 'shanthos',
      age: '30',
      role: 'intern',
    },
    {
      id: 3,
      name: 'ajay',
      age: '26',
      role: 'admin',
    },
    {
      id: 4,
      name: 'arun',
      age: '33',
      role: 'intern',
    },
    {
      id: 5,
      name: 'vinay',
      age: '35',
      role: 'Sofware developer',
    },
  ];

  findAll(role?: 'software developer' | 'admin' | 'intern') {
    if (role) {
      const roleArray = this.user.filter((user) => user.role === role);
      if (roleArray.length === 0) throw new NotFoundException('Role Not Found');
      return roleArray;
    }
    return this.user;
  }
  findOne(id: number) {
    const user = this.user.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHigestId = [...this.user].sort((a, b) => b.id - a.id);
    const newer = {
      id: userByHigestId[0].id + 1,
      ...createUserDto,
    };
    this.user.push(newer);

    return newer;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.user.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.user = this.user.filter((user) => user.id != id);

    return removeUser;
  }
}
