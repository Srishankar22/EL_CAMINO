import { IsString, Length,IsInt } from "class-validator";


export class RegisterUsersDto {
     
     @IsString()
     @Length(5,10)
     username: string;

     @IsString()
     @Length(6,12)
     password: string

     @IsString()
     @Length(5,10)
     name: string

     @IsString()
     @Length(5,10)
     email:string
     
     @IsString()
     @Length(1,1000)
     interest:string; 

     @IsInt()
     points:number;
}