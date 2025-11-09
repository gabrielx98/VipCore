import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtAutenticacao } from './security.jwt';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StringValue } from 'ms';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow<string>('JWT_EXPIRATION') as StringValue },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [SecurityService, JwtAutenticacao],
  exports: [SecurityService]
})
export class SecurityModule {}
