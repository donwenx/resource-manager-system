import { IsIn, IsNumber, IsOptional, Length, Max, Min } from 'class-validator';
import { ResourceState } from './resource.enum';

export class CreateResourceDto {
  @IsNumber()
  uid: number;

  @IsNumber()
  cid: number;

  @Length(2, 255)
  name: string;

  @Length(1, 255)
  @IsOptional()
  keywords?: string;
}

export class ListResourceDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  take: number;

  keyword: string;
}

export class ListAuditResourceDto {
  @IsNumber()
  @Min(0)
  skip: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  take: number;

  keyword: string;

  @IsNumber()
  @IsIn([ResourceState.AUDIT, ResourceState.DELETE, ResourceState.NORMAL])
  @IsOptional()
  state?: number;
}

export class UpdateResourceDto {
  @IsNumber()
  rid: number;

  @IsOptional()
  name?: string;

  @IsOptional()
  img?: string;

  @IsOptional()
  @IsIn([ResourceState.AUDIT, ResourceState.DELETE, ResourceState.NORMAL])
  state?: number;

  @Length(1, 255)
  @IsOptional()
  keywords?: string;
}
