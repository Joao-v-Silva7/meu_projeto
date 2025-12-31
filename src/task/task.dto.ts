import { IsUUID, IsString, MinLength, IsEnum, IsOptional, IsDateString, MaxLength } from "class-validator";


export enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class TaskDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    tittle: string;

    @IsString()
    @MinLength(5)
    @MaxLength(500)
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface FindAllParameters {
    title: string;
    status: string;
}