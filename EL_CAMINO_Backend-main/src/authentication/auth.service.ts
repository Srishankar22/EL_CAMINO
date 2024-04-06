import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterUsersDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";
import { UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService {

  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService) { }

  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;

    const user = await this.prismaService.users.findUnique({
      where: { username },
    });

    // Check if user exists and username matches (case-sensitive)
    if (!user || user.username !== username) {
      throw new NotFoundException('User not found');
    }

    console.log(password)
    console.log(user.password)
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(passwordMatch)

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    const sessionData = { sessionId: uuidv4() };

    return {
      status: 'Ok!',
      token: this.jwtService.sign({ username, ...sessionData }),
    };
  }


     async validateUserByToken(token: string) {
          const decoded = this.jwtService.verify(token);
          return this.usersService.findUserById(decoded.sub);
        }

     async register (createDto: RegisterUsersDto): Promise<any>{
          const createUser = new Users();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.username = createDto.username;
    createUser.password = await bcrypt.hash(createDto.password, 10);
    createUser.interest = createDto.interest;
    createUser.points= createDto.points;

    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign({ username: user.username }),
    };
  }
     
}