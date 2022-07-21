import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateNoticeDto {

    @IsString()
    readonly title: string;

    @IsString()
    readonly author: string;

    @IsString()
    readonly comment_text: string;
  }

  export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {}
