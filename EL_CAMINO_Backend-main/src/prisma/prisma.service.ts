import { Injectable,OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    sessions: any;
    onModuleInit(){
        this.$connect()
            .then(() => console.log('Connected to DB'))
            .catch((err) => console.log(err));
    }
    
}

