import { PrismaService } from "src/prisma/prisma.service";
import { Users } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getAllUser():Promise<Users[]> {
        return this.prisma.users.findMany();
    }
     
    async createUser(data: Users): Promise<Users> {
        const { username, email } = data;
      
        // Check if the user already exists by username
        const existingUsername = await this.prisma.users.findUnique({
          where: { username: username },
        });
      
        if (existingUsername) {
          throw new ConflictException('Username already exists');
          //console.log("username already exists")
        }     
      
        // Check if the user already exists by email
        const existingEmail = await this.prisma.users.findUnique({
          where: { email: email },
        });
      
        if (existingEmail) {
          throw new ConflictException('Email already exists');
          //console.log("email already exists")
        }
      
        // If neither username nor email exists, proceed with creating a new user
        return this.prisma.users.create({ data });
    }

    async findUserById(id: number) {
        return this.prisma.users.findUnique({ where: { id } });
    }

    async findOne(username: string): Promise<Users | null> {
      return this.prisma.users.findUnique({ where: { username } });
    }

    async updateUserPoints(name: string, points: number) {
        return this.prisma.users.update({
            where: { username: name },
            data: { points }
        });
    }

    getUserById(id: number) {
      return this.prisma.users.findUnique({ where: { id: id } });
  }
}
