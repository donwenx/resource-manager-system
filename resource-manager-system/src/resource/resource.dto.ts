export class CreateResourceDto {
  readonly uid: number;
  readonly cid: number;
  readonly name: string;
  readonly keywords: string;
}

export class UpdateResourceDto {
  readonly rid: number;
  readonly name?: string;
  readonly img?: string;
  readonly state?: number;
  readonly keywords?: string;
}
