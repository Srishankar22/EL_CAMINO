import { Controller, Get, Req, Res, UseGuards, Param, Put, Body, NotFoundException, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import {Request,Response} from 'express'
import { JwtAuthGuard } from "src/authentication/auth.guard";
import { Users } from './users.model';




@Controller('users')
export class UsersController {
     constructor(private readonly userService : UsersService){}

     @Get()
     @UseGuards(JwtAuthGuard)
     async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
          try{
               const sessionData = (request as any).user?.sessionData; // Access the session data from the request
               const result = await this.userService.getAllUser();
               return response.status(200).json({
                    status: 'Ok!',
                    message: 'Successfully fetch data!',
                    result: result,
                    sessionData: sessionData, // Include the session data in the response
               })
          }catch(err){
               return response.status(500).json({
                    status: 'Ok!',
                    message : 'Internal Server Error!'
               })
          }
     }

     @Get(':username')
     async findOne(@Param('username') username: string): Promise<Users | null> {
     return this.userService.findOne(username);
     }

     @Put(':username/points')
     async updateUserPoints(
     @Param('username') username: string,
     @Body('points') points: number,
     ): Promise<void> {
     // Call the updateUserPoints method from the service
     const updatedUser = await this.userService.updateUserPoints(username, points);

     // Handle the case where the user is not found
     if (!updatedUser) {
          throw new NotFoundException(`User with username ${username} not found`);
     }
     }

     @Get(':courseId/owner')
     getCourseById(@Param('courseId', ParseIntPipe) courseId: number){
         return this.userService.getUserById(courseId)
     }
}