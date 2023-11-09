import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt-config';
import * as fs from 'fs';

interface Storage {
  tokenBlackList: string[];
}

export default class Auth {
  static async generatePasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(6);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  static generateToken(login: string, userId: number): string {
    const token = jwt.sign(
      {
        login,
        userId,
      },
      jwtConfig,
      { expiresIn: 3600 },
    );

    return token;
  }

  static validatePassword(
    userPassword: string,
    requestPassword: string,
  ): boolean {
    return bcrypt.compareSync(requestPassword, userPassword);
  }

  static async getTokenBlackListFromStorage(): Promise<Storage> {
    return new Promise((resolve, reject) => {
      fs.readFile('storage.json', 'utf-8', (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(JSON.parse(data));
      });
    });
  }

  static setTokenToBlackList(storage): void {
    fs.writeFile('storage.json', JSON.stringify(storage), (error) => {
      if (error) {
        console.log(error.message);
      }
    });
  }
}
