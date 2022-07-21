import { IsString } from 'class-validator';
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
