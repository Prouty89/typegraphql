import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailUnique } from "./IsEmailUnique";

@InputType()
export class RegisterInput {
    @Field() 
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255) 
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailUnique() 
    email: string;

    @Field() 
    password: string;
}