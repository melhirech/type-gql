import { FORGOT_PASSWORD_PREFIX } from './../constants/redisPrefixes';
import { redis } from './../../../redis';
import { v4 } from 'uuid';
import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { sendEmail } from '../utils/sendEmail';

@Resolver()
export class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string
    ): Promise<boolean> {
        const user = await User.findOne({ where: { email } })

        if (!user) return true

        const token = v4();
        await redis.set(FORGOT_PASSWORD_PREFIX + token, user.id, "ex", 60 * 60 * 24); // 1 day expiration

        await sendEmail(email, `http://localhost:3000/user/confirm/${token}`);
        return true
    }
}
