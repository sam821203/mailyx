import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './auth/schemas/user.schema';
import { EmailsModule } from './emails/emails.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://raystyle32613:5bYfLXI10WeaAeHk@cluster0.wgop4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    EmailsModule,
    ConfigModule.forRoot({
      isGlobal: true, // 設為全局，這樣可以在所有地方使用 ConfigService
      envFilePath: '.env', // 指定讀取 .env 文件
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
