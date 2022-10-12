import { IsIn, IsNumber, Length, Max, Min } from 'class-validator';
import { CategoryState } from './category.enum';

export class UpdateDto {
  @IsNumber()
  cid: number;

  @Length(2, 255)
  name: string;

  @IsIn([CategoryState.NORMAL, CategoryState.DELETE])
  state: number;
}

export class ListCategoryDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  take: number;

  keyword: string;
}
