import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';

@Injectable()
export class isAdminGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
      return true;
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return true;
    }
    const payload = this.decode(token);
    console.log(payload);

    if (!payload['profileId']) {
      return true;
    }
    if (payload['profileId'] == 1) {
      return true;
    }

    throw new ForbiddenError('Only Admins can acess this route');
  }

  private decode(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = Buffer.from(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    return JSON.parse(payloadinit);
  }
}
