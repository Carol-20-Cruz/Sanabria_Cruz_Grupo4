import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  nombre_evento: string;

  @IsDateString()
  fecha: string;

  @IsString()
  ubicacion: string;

  @IsNumber()
  asistentes_esperados: number;

  @IsString()
  artista_principal: string;

  @IsNumber()
  duracion_horas: number;

  @IsNumber()
  precio_entrada: number;
}
