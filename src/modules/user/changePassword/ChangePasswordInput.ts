import { PasswordInput } from './../../shared/PasswordInput';
import { InputType, Field } from "type-graphql";
import { MinLength } from 'class-validator';

    
@InputType()
export class ChangePasswordInput extends PasswordInput{
    
    @Field()
    @MinLength(5)
    token: string

}