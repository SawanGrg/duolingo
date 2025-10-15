import { plainToInstance, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class AppConfig {
  @Type(() => DatabaseConfig)
  database: DatabaseConfig;
}

export class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  host: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  port: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export function validateConfig(config: Record<string, unknown>): AppConfig {
  const validatedConfig = plainToInstance(AppConfig, {
    database: {
      host: config.DB_HOST,
      port: Number(config.DB_PORT),
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      name: config.DB_NAME,
    },
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.error('❌ Invalid environment configuration!');
    console.error(errors);
    process.exit(1);
  }

  return validatedConfig;
}
