import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }


  async login(loginUserDTO: LoginUserDTO): Promise<any> {

    const emailUsuario = loginUserDTO.email;
    const passwordUsuario = loginUserDTO.password;

    //esta tecnica me permite extraer a constantes los atributos del objeto y se completa automaticamente
    // const { email, password } = loginUserDTO;

    const user = await this.userRepository.findOneBy({email: emailUsuario});

    if (user === null || user === undefined) return { message: "Invalid credentials" };

    // compare devuelve un boolean(true o false) si la contraseña encriptada coincide con la sin encriptar
    if (bcrypt.compareSync(passwordUsuario, user.password)) {
      return { message: "Login successful", user };
    }

    // if(user.password === passwordUsuario){ version vieja sin encriptacion
    //   return { message: "Login successful", user };
    // }

    return { message: "Invalid credentials" };
  }


  async create(createUserDto: CreateUserDto): Promise<any> {

    // SaltRounds indica la complejidad del hash para encriptar la contraseña,
    //  lo que hace es, escriptar la encriptacion X veces
    const saltRounds = 2;

    // esta linea escripta la contraseña, le pasamos la contraseña del usuario y el nivel de complejidad
    const passwordHashed = bcrypt.hashSync(createUserDto.password, saltRounds);

    // seteamos la contraseña encriptada en el DTO del usuario
    createUserDto.password = passwordHashed;

    // creamos y guardamos el nuevo usuario
    const newUser = this.userRepository.create(createUserDto);
    const res = await this.userRepository.save(newUser);

    return {
      code: HttpStatus.CREATED,
      message: 'User save successfully',
      data: res
    }
  }
}
