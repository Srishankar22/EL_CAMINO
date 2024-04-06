import { Prisma } from "@prisma/client";


export class Users implements Prisma.UsersCreateInput{
     name: string;
     password: string;
     username: string;
     email: string;
     interest: string;
     id: any;
     points: number;
}