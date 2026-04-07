// Import required modules
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// This guard protects routes using JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
