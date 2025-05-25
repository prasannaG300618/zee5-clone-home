import { Category } from 'src/upload/enum/upload.typesEnum';
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
export class uploadDocumentDto {
  @IsString()
  @IsNotEmpty()
  programName: string;
  @IsString()
  @IsNotEmpty()
  portraitImageSrc: String;
  @IsString()
  @IsNotEmpty()
  landscapeImageSrc: String;
  @IsString()
  @IsNotEmpty()
  type:
    | Category.movie
    | Category.kids
    | Category.news
    | Category.webSeries
    | Category.tvShow;
  @IsString()
  @IsNotEmpty()
  premium: boolean;
  @IsString()
  @IsOptional()
  genre: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  language: string;
  @IsBoolean()
  @IsNotEmpty()
  kids: boolean;

  @IsObject()
  @IsOptional()
  cast:{
    femaleCharacter: string;
    maleCharacter: string;
    actor: string;
    actress: string;
    director: string;
  };

  @IsString()
  @IsOptional()
  newsReader: string;
}
