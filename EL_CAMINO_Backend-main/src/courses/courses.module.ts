import { Module } from "@nestjs/common";
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { PrismaModule } from "src/prisma/prisma.module";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service"; // Import UsersService

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [CoursesController],
    providers: [CoursesService, UsersService], // Include UsersService in the providers array
    exports: [CoursesService]
})
export class CoursesModule {}
