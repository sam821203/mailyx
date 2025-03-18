import { Injectable, Request } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

interface SignupBody {
  username: string;
  password: string;
}

interface SigninBody {
  username: string;
  password: string;
}

interface JwtPayload {
  username: string;
}

interface CustomRequest extends Request {
  cookies: { [key: string]: string };
}

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(
    body: SignupBody,
    res: Response,
  ): Promise<{ username: string; message: string }> {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new this.userModel({
      username: body.username,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ username: newUser.username }, 'secretKey', {
      expiresIn: '1h',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    const responseData = {
      username: newUser.username,
      message: 'User created and logged in',
    };
    res.json(responseData);
    return responseData;
  }

  async signin(body: SigninBody, res: Response): Promise<{ message: string }> {
    let token: string;
    const user = await this.userModel.findOne({ username: body.username });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return { message: 'Invalid credentials' };
    }
    try {
      const generatedToken = jwt.sign(
        { username: user.username },
        'secretKey',
        { expiresIn: '1h' },
      );

      if (typeof generatedToken !== 'string') {
        throw new Error('Invalid token');
      }

      token = generatedToken;
    } catch (error) {
      console.error('JWT signing error:', error);
      throw new Error('Internal server error');
    }
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message: 'Signed in successfully' };
  }

  async checkUsername(username: string): Promise<{ available: boolean }> {
    const userExists = await this.userModel.findOne({ username });
    return { available: !userExists };
  }

  checkSignedIn(
    req: CustomRequest,
  ): { message: string } | { username: string } {
    const token = req.cookies?.jwt;
    if (!token) return { message: 'Not signed in' };

    try {
      const decoded = jwt.verify(token, 'secretKey') as JwtPayload;
      return { username: decoded.username };
    } catch {
      return { message: 'Invalid token' };
    }
  }

  signout(res: Response): { message: string } {
    res.clearCookie('jwt');
    return { message: 'Signed out successfully' };
  }
}
