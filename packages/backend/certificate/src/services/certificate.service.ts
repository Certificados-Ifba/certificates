import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { IGeneric } from 'src/interfaces/generic.interface'

import { ICertificateListParams } from '../interfaces/certificate-list-params.interface'
import { DataResponse } from '../interfaces/certificate-list-response.interface'
import { ICertificate } from '../interfaces/certificate.interface'

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel('Certificate')
    private readonly CertificateModel: Model<ICertificate>,
    @InjectModel('Generic')
    private readonly GenericModel: Model<IGeneric>
  ) {}

  public async createCertificate(
    certificateBody: ICertificate
  ): Promise<ICertificate> {
    const CertificateModel = new this.CertificateModel(certificateBody)
    return await CertificateModel.save()
  }

  public async findCertificateById(id: string): Promise<ICertificate> {
    return await this.CertificateModel.findById(id)
  }

  public async findCertificateByKey(key: string): Promise<ICertificate> {
    return await this.CertificateModel.findOne({ key })
      .populate('function')
      .populate('activity')
      .populate('participant')
      .populate('event')
  }

  public async removeCertificateById(id: string): Promise<ICertificate> {
    return await this.CertificateModel.findOneAndDelete({ _id: id })
  }

  public async listCertificates({
    user,
    event,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: ICertificateListParams): Promise<DataResponse> {
    const query: any = {}

    if (event) query.event = new Types.ObjectId(event)
    if (user) query.user = new Types.ObjectId(user)

    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const certificates = await this.CertificateModel.find(query)
      .populate('function')
      .populate('activity')
      .populate('participant')
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.CertificateModel.countDocuments(query)

    return {
      certificates,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }

  public async findGenericById(id: string): Promise<IGeneric> {
    return this.GenericModel.findById(id).exec()
  }
}
