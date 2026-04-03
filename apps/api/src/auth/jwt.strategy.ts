import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: any) => {
          let token: string | null = null;
          if (req && req.headers && req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');
            for (const cookie of cookies) {
              const [name, val] = cookie.split('=').map(c => c.trim());
              if (name.endsWith('session-token')) {
                token = decodeURIComponent(val);
                if (token.startsWith('"') && token.endsWith('"')) {
                  token = token.slice(1, -1);
                }
                console.log(`[API JWT Extractor] Found Matching Cookie: ${name} -> ${token.substring(0, 15)}...`);
                break;
              }
            }
          }
          if (!token) console.log(`[API JWT Extractor] No token found in incoming headers: ${JSON.stringify(req?.headers?.cookie)}`);
          return token;
        },
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
