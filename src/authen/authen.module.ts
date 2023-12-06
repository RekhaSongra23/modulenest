
import { Module } from "@nestjs/common"; 
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthenController } from "./authen.controller";
import { authenService } from "./authen.service";
import { Auth, AuthSchema } from "./auth.schema";
@Module({

    imports :[MongooseModule.forFeature([{name :Auth.name, schema :AuthSchema}]),
    JwtModule.register({
        secret: `${process.env.JWT_SECRET}`,
        signOptions :{expiresIn :'1h',}
    })
    ],
    controllers :[AuthenController],
    providers :[authenService,JwtService]

})
export class AuthenModule{}