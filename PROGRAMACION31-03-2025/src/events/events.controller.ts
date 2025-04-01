import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './interface/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-events.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Event[] {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event | null {
    const event = this.eventsService.findOne(Number(id));
    if (!event) {
      // Puedes retornar un error o un valor por defecto si no se encuentra el evento
      return null; // O puedes manejarlo con un error HTTP adecuado
    }
    return event;
  }

  @Post()
  create(@Body() createEventDto: CreateEventDto): Event {
    return this.eventsService.create(createEventDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto): Event | null {
    const updatedEvent = this.eventsService.update(Number(id), updateEventDto);
    if (!updatedEvent) {
      // Retorna null si el evento no se encontró para actualizar
      return null; // O puedes manejarlo con un error HTTP adecuado
    }
    return updatedEvent;
  }

  @Delete(':id')
  delete(@Param('id') id: string): boolean {
    return this.eventsService.delete(Number(id));
  }
}
