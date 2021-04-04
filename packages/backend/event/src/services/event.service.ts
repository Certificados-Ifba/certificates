import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { IEventUpdateParams } from '../interfaces/event-update-params.interface'
import { IEvent } from '../interfaces/event.interface'

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly EventModel: Model<IEvent>
  ) {}

  public async getEventsByUserId(userId: string): Promise<IEvent[]> {
    return this.EventModel.find({ user_id: userId }).exec()
  }

  public async createEvent(eventBody: IEvent): Promise<IEvent> {
    const EventModel = new this.EventModel(eventBody)
    return await EventModel.save()
  }

  public async findEventById(id: string): Promise<IEvent> {
    return await this.EventModel.findById(id)
  }

  public async removeEventById(id: string): Promise<IEvent> {
    return await this.EventModel.findOneAndDelete({ _id: id })
  }

  public async updateEventById(
    id: string,
    params: IEventUpdateParams
  ): Promise<IEvent> {
    return await this.EventModel.updateOne({ _id: id }, params)
  }
}
