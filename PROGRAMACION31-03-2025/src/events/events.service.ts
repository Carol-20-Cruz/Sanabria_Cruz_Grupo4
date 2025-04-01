import { Injectable } from '@nestjs/common';
import { Event } from './interface/event.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EventsService {
  private filePath = path.join(__dirname, '..', 'data', 'events.json');
  private events: Event[] = this.loadEvents();

  private loadEvents(): Event[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8'); // Leer archivo JSON
      return JSON.parse(data);
    } catch (error) {
      return []; // Si hay un error (archivo vacío o no existe), devolver un array vacío
    }
  }

  private saveEvents(): void {
    fs.writeFileSync(this.filePath, JSON.stringify(this.events, null, 2), 'utf-8'); // Guardar en JSON
  }

  findAll(): Event[] {
    return this.events;
  }

  findOne(id: number): Event | null {
    return this.events.find(event => event.id === id) || null;
  }

  create(event: Event): Event {
    event.id = this.events.length + 1;
    this.events.push(event);
    this.saveEvents(); // Guarda en el archivo JSON
    return event;
  }

  update(id: number, updatedEvent: Partial<Event>): Event | null {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return null;

    this.events[index] = { ...this.events[index], ...updatedEvent };
    this.saveEvents(); // Guarda en el archivo JSON
    return this.events[index];
  }

  delete(id: number): boolean {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;

    this.events.splice(index, 1);
    this.saveEvents(); // Guarda en el archivo JSON
    return true;
  }
}


