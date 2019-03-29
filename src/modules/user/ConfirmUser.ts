import { CONFIRM_EMAIL_PREFIX } from './../constants/redisPrefixes';
import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from './../../../redis'

@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser( @Arg("token") token: string ): Promise<boolean> {
        const userId = await redis.get(CONFIRM_EMAIL_PREFIX + token)

        if(!userId) return false
        User.update({ id: parseInt(userId, 10) }, { confirmed: true })
        await redis.del(CONFIRM_EMAIL_PREFIX + token)

        return true
    }
}
