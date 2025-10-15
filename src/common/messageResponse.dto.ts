import { IsNotEmpty, IsString } from 'class-validator';

export class MessageResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
