import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // We will look for AUTH_SECRET first (NextAuth standard), then fallback to JWT_SECRET
      secretOrKey: process.env.AUTH_SECRET || process.env.JWT_SECRET || "default_secret",
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    // This payload matches the decoded JWT. NextAuth sets 'sub' to the user's ID
    return { userId: payload.sub, ...payload };
  }
}
