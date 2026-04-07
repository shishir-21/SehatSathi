// Import modules
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Import service & controller
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Import Users module
import { UsersModule } from '../users/users.module';

// Import JWT Strategy
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,

    // Configure JWT
    JwtModule.register({
      secret: 'mysecretkey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],

  // FIX HERE
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
