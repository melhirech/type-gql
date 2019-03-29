import { PasswordInput } from './../../shared/PasswordInput';
import {Length, IsEmail} from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist';

@InputType()
export class RegisterInput extends PasswordInput {

    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message: "Email already in use."})
    email: string;
}