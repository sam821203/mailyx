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
  authenticated: boolean;
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
  ): Promise<{ username: string; authenticated: boolean }> {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // 自動產生 Email
    const email = `${username}@sandboxa26776d6a94041b4b6026cbab4b8661c.mailgun.org`;

    const newUser = new this.userModel({
      username: username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    const token = jwt.sign(
      { username: newUser.username },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1h' },
    );

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    const responseData = {
      username: newUser.username,
      authenticated: true,
    };
    res.json(responseData);
    return responseData;
  }

  async signin(body: SigninBody, res: Response): Promise<Response> {
    let token: string;
    const user = await this.userModel.findOne({ username: body.username });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    try {
      const generatedToken = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET || 'default_secret',
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(200).json({ message: 'Signed in successfully' });
  }

  async checkUsername(username: string): Promise<{ available: boolean }> {
    const userExists = await this.userModel.findOne({ username });
    return { available: !userExists };
  }

  checkSignedIn(
    req: CustomRequest,
  ): { message: string } | { username: string; authenticated: boolean } {
    const token = req.cookies?.jwt;
    if (!token) return { message: 'Not signed in' };
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_secret',
      ) as JwtPayload;
      return { username: decoded.username, authenticated: true };
    } catch {
      return { message: 'Invalid token' };
    }
  }

  signout(res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({ message: 'Signed out successfully' });
  }
}
