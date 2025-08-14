import jwt from "jsonwebtoken";

export class JwtUtils {
  static sign(
    payload: object,
    secret: string,
    options?: jwt.SignOptions
  ): string {
    return jwt.sign(payload, secret, options);
  }

  static verify(token: string, secret: string): object | string {
    return jwt.verify(token, secret);
  }
}
