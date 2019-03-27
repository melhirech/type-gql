import { MyContext } from './../../../type/MyContext';
import {MiddlewareFn} from 'type-graphql'

export const isAuth: MiddlewareFn <MyContext> = async ({ context }, next) => {
    if(!context.req.session!.userId){
        throw new Error('User not authenticated.');        
    }
    return next();
};