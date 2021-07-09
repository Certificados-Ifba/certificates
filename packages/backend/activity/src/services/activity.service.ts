import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { IActivityListParams } from 'src/interfaces/activity-list-params.interface'
import { DataResponse } from 'src/interfaces/activity-list-response.interface'

import { IActivityUpdateParams } from '../interfaces/activity-update-params.interface'
import { IActivity } from '../interfaces/activity.interface'

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel('Activity') private readonly ActivityModel: Model<IActivity>
  ) {}

  public async createActivity(activityBody: IActivity): Promise<IActivity> {
    const ActivityModel = new this.ActivityModel(activityBody)
    return await ActivityModel.save()
  }

  public async findActivityById(id: string): Promise<IActivity> {
    return await this.ActivityModel.findById(id).populate('type')
  }

  public async removeActivityById(id: string): Promise<IActivity> {
    return await this.ActivityModel.findOneAndDelete({ _id: id })
  }

  public async updateActivityById(
    id: string,
    params: IActivityUpdateParams
  ): Promise<IActivity> {
    return await this.ActivityModel.updateOne({ _id: id }, params).populate(
      'type'
    )
  }

  public async listActivities({
    event,
    name,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: IActivityListParams): Promise<DataResponse> {
    const query = {
      name: new RegExp(name ? '.*' + name + '.*' : '.*', 'i'),
      event: new Types.ObjectId(event)
    }

    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const activities = await this.ActivityModel.find(query)
      .populate('user')
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.ActivityModel.countDocuments(query)

    return {
      activities,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }
}
