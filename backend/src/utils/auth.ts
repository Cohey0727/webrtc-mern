import jwt, { SignOptions } from "jsonwebtoken";
import { logger } from "src/configs";

const generateToken = async (
  payload: string | object | Buffer,
  expiresIn: string | number,
  secret: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const options: SignOptions = { expiresIn: expiresIn };
    jwt.sign(payload, secret, options, (error, token) => {
      if (error) {
        logger.error(error);
        reject(error);
      } else if (token) {
        resolve(token);
      }
    });
  });
};

const verifyToken = async (
  token: string,
  secret: string,
): Promise<string | jwt.JwtPayload | null> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error || !decoded) {
        logger.error(error);
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};

export { generateToken, verifyToken };
