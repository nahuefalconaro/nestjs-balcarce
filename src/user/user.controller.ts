import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {


  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    // loginUserDTO contiene los datos que me pasa el usuario
    return this.userService.login(loginUserDTO);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

}
