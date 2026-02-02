import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { IModelListParams } from '../interfaces/model-list-params.interface'
import { ModelDataResponse } from '../interfaces/model-list-response.interface'
import { IModel } from '../interfaces/model.interface'

@Injectable()
export class ModelService {
  constructor(
    @InjectModel('Model')
    private readonly ModelModel: Model<IModel>
  ) { }

  public async createModel(modelBody: IModel): Promise<IModel> {
    const ModelModel = new this.ModelModel(modelBody)
    return await ModelModel.save()
  }

  public async findModelById(id: string): Promise<IModel> {
    return await this.ModelModel.findById(id)
  }

  public async removeModelById(id: string): Promise<IModel> {
    return await this.ModelModel.findOneAndDelete({ _id: id })
  }

  public async listModels({
    event,
    page = 1,
    perPage = 10,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: IModelListParams): Promise<ModelDataResponse> {
    const query = {
      event: new Types.ObjectId(event)
    }

    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const models = await this.ModelModel.find(query)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.ModelModel.countDocuments(query)

    return {
      models,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }
}
