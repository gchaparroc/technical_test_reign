import { IsString, IsOptional, IsPositive, Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {

    @IsString()
    @ApiProperty({ description: 'Titulo de la noticia' })
    readonly title: string;

    @IsString()
    @ApiProperty({ description: 'Autor de la noticia' })
    readonly author: string;

    @IsString()
    @ApiProperty({ description: 'Comentario del texto de la noticia' })
    readonly comment_text: string;
  }

  export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {}

  export class FilterNewsDto {

    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @Min(0)
    offset: number;

    @IsOptional()
    @IsString()
    autor: string;

    @IsOptional()
    @IsString()
    titulo: string;

    @IsOptional()
    @IsString()
    tag: string;
  }
