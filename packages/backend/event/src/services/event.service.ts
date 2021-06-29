import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { model, Model } from 'mongoose'
import { IEventListParams } from 'src/interfaces/event-list-params.interface'
import { DataResponse } from 'src/interfaces/event-list-response.interface'

import { IEventUpdateParams } from '../interfaces/event-update-params.interface'
import { IEvent } from '../interfaces/event.interface'

@Injectable()
export class EventService {
  constructor(
    @InjectModel('Event') private readonly EventModel: Model<IEvent> // private readonly EventModel = model('', )
  ) {}

  public async getEventsByUserId(userId: string): Promise<IEvent[]> {
    return this.EventModel.find({ user: userId }).exec()
  }

  public async searchEventById(id: string): Promise<IEvent> {
    return this.EventModel.findById(id).populate('user').exec()
  }

  public async createEvent(eventBody: IEvent): Promise<IEvent> {
    const EventModel = new this.EventModel(eventBody)
    return await EventModel.save()
  }

  public async findEventById(id: string): Promise<IEvent> {
    return this.EventModel.findById(id).exec()
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

  public async listEvents({
    name,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: IEventListParams): Promise<DataResponse> {
    const pattern = name ? '.*' + name + '.*' : '.*'
    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const events = await this.EventModel.find({
      name: new RegExp(pattern, 'i')
    })
      .populate('user')
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.EventModel.countDocuments({
      name: new RegExp(pattern, 'i')
    })

    return {
      events,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }
}
