import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [JwtModule.registerAsync({
    global:true, //para ser acessível em qualquer outro modulo da aplicação
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        // O "+" converte a string do .env para número
        expiresIn: +(configService.get<number>('JWT_EXPIRATION_TIME') ?? 3600)
      }
    }),
    inject: [ConfigService],
  }), UserModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
