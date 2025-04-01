import { Module } from '@nestjs/common';
import { EventsModule } from './events.module'; // Ruta corregida

@Module({
  imports: [EventsModule],
})
export class AppModule {}
