import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const cookieExtractor = (req: any) => {
  let token: string | null = null;
  if (req && req.headers && req.headers.cookie) {
    const cookies = req.headers.cookie.split(';');
    for (const cookie of cookies) {
      const [name, val] = cookie.split('=').map((c: string) => c.trim());
      if (name.endsWith('session-token')) {
        token = decodeURIComponent(val);
        if (token.startsWith('"') && token.endsWith('"')) {
          token = token.slice(1, -1);
        }
        break;
      }
    }
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_SECRET || process.env.JWT_SECRET || "default_secret",
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, ...payload };
  }
}
