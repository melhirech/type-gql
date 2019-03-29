import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate } from "typeorm";
import {ObjectType, Field, ID, Root} from 'type-graphql'
import bcrypt from 'bcryptjs';


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()    
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`
    }

    @Field()
    @Column('text', {unique: true})
    email: string;

    @Column()
    password: string;

    @Column('bool', {default: false})
    confirmed: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }﻿

}