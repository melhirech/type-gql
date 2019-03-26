import { MyContext } from './../../../type/MyContext';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'

@Resolver()
export class LoginResolver {
    @Mutation(() => User, {nullable: true})
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {

        const user = await User.findOne({where: {email}})
        if (!user) return null
        
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) return null

        ctx.req.session!.userId = user.id
        return user
    }
}
