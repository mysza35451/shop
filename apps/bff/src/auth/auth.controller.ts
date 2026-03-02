import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';
import { ZodValidationPipe } from '../common/zod.pipe';

const loginSchema = z.object({ username: z.string(), password: z.string() });

@Controller('api/v1/auth')
export class AuthController {
  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: { username: string; password: string }, @Res({ passthrough: true }) res: Response) {
    if (body.username !== process.env.ADMIN_USER || body.password !== process.env.ADMIN_PASS) {
      return { authenticated: false };
    }

    res.cookie('admin_session', 'valid', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 8,
    });

    return { authenticated: true, username: body.username };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin_session');
    return { ok: true };
  }

  @Get('me')
  me(@Res({ passthrough: true }) res: Response) {
    const authenticated = res.req.cookies?.admin_session === 'valid';
    return { authenticated };
  }
}
