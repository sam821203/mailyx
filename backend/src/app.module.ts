import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth/schemas/user.schema';
import { EmailsModule } from './emails/emails.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://raystyle32613:5bYfLXI10WeaAeHk@cluster0.wgop4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
