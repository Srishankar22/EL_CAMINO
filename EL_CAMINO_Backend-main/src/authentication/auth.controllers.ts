import { Controller, Post, Body, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express';
import { RegisterUsersDto } from "./dto/register-user.dto";
import { NotFoundException } from "@nestjs/common";
import { UnauthorizedException } from "@nestjs/common";

@Controller('/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
    try {
      const { token } = await this.authService.login(loginDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully login!',
        token
      });
    } catch (err) {
      console.log(err);
      if (err instanceof NotFoundException) {
        return response.status(200).json({
          status: 'Error!',
          message: 'User not found'
        });
      } else if (err instanceof UnauthorizedException) {
        return response.status(200).json({
          status: 'Error!',
          message: 'Invalid password'
        });
      } else {
        return response.status(500).json({
          status: 'Error!',
          message: 'Internal Server Error!'
        });
      }
    }
  }


  @Post('/register')
  async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
    try {
      const { user, token, sessionData } = await this.authService.register(registerDto);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully register user!',
        result: { user, token, sessionData },
      });
    } catch (err) {
      console.log(err);
      if (err.message === 'Username already exists') {
        return response.status(200).json({
          status: 'Error!',
          message: 'Username already exists.'
        });
      } else if (err.message === 'Email already exists') {
        return response.status(200).json({
          status: 'Error!',
          message: 'Email already exists.'
        });
      } else {
        return response.status(500).json({
          status: 'Error!',
          message: 'Internal Server Error!'
        });
      }
    }
  }
}
