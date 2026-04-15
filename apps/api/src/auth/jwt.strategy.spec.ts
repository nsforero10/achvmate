import { JwtStrategy, cookieExtractor } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    // Override console.log for silent tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
    strategy = new JwtStrategy();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should map the payload sub directly to userId', async () => {
    const payload = { sub: 'user-123', email: 'test@example.com' };
    const validated = await strategy.validate(payload);
    
    expect(validated.userId).toBe('user-123');
    expect(validated.email).toBe('test@example.com');
  });

  describe('cookieExtractor', () => {
    it('returns null if there are no headers', () => {
      expect(cookieExtractor({})).toBeNull();
      expect(cookieExtractor({ headers: {} })).toBeNull();
    });

    it('extracts token properly from session-token strings safely bypassing missing quotes', () => {
      const req = { headers: { cookie: 'next-auth.session-token=my-secret-token; other=false' } };
      expect(cookieExtractor(req)).toBe('my-secret-token');
    });

    it('extracts tokens with surrounding double quotes and drops them cleanly', () => {
      const req = { headers: { cookie: '__Secure-next-auth.session-token="quoted-token"' } };
      expect(cookieExtractor(req)).toBe('quoted-token');
    });
  });
});
