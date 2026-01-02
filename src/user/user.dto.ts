import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;
}