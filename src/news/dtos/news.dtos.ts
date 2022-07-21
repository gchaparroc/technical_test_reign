//import { PartialType } from '@nestjs/mapped-types';
export class CreateNoticeDto {
    readonly title: string;
    readonly author: string;
    readonly comment_text: string;
  }

  //export class UpdateProductDto extends PartialType(CreateProductDto) {}
