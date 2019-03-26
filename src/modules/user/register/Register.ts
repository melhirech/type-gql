import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { RegisterInput } from './RegisterInput'
import { User } from '../../../entity/User'

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!"
    }

    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword }).save()

        return newUser
    }
}
