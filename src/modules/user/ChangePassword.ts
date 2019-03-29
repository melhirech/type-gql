import { MyContext } from './../../../types/MyContext';
import { FORGOT_PASSWORD_PREFIX } from './../constants/redisPrefixes';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { redis } from './../../../redis';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'

@Resolver()
export class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Ctx() ctx: MyContext,
        @Arg("data") {
            token,
            password
        }: ChangePasswordInput,
    ): Promise<User | null> {

        const userId = await redis.get(FORGOT_PASSWORD_PREFIX + token)
        if (!userId) return null

        const user = await User.findOne(userId)
        if (!user) return null

        await redis.del(FORGOT_PASSWORD_PREFIX + token)

        user.password = password
        user.save()

        ctx.req.session!.userId = user.id
        return user
    }
}
