// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: "Le nom d'utilisateur doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le champ username est requis." })
  username: string;

  @IsEmail({}, { message: "L'email fourni n'est pas valide." })
  @IsNotEmpty({ message: "Le champ email est requis." })
  email: string;

  // status peut être fourni à la création si tu veux l'autoriser
  @IsString()
  status?: string;

  @IsString({ message: "Le mot de passe doit être une chaîne de caractères." })
  password: string;
}
