import { registerDtoMain } from './registermain.dto';
import { PartialType } from '@nestjs/mapped-types';
export class registerDto extends PartialType(registerDtoMain) {}
