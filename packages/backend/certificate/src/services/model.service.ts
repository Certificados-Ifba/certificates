import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { IModel } from '../interfaces/model.interface'

@Injectable()
export class ModelService {
  constructor(
    @InjectModel('Model')
    private readonly ModelModel: Model<IModel>
  ) {}

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

  // public async listModels({
  //   event,
  //   page,
  //   perPage,
  //   sortBy = 'created_at',
  //   orderBy = 'ASC'
  // }: IModelListParams): Promise<DataResponse> {
  //   const query = {
  //     event: new Types.ObjectId(event)
  //   }

  //   const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

  //   const certificates = await this.ModelModel.find(query)
  //     .populate('function')
  //     .populate('activity')
  //     .populate('participant')
  //     .skip(perPage * (page - 1))
  //     .limit(perPage)
  //     .sort(sort)
  //     .exec()

  //   const count = await this.ModelModel.countDocuments(query)

  //   return {
  //     certificates,
  //     totalPages: Math.ceil(count / perPage),
  //     totalCount: count
  //   }
  // }
}
