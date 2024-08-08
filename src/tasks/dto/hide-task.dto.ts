import { IsBoolean } from 'class-validator';

export class HideTaskDto {
  @IsBoolean()
  hide: Boolean;
}
