import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { ICertificateListParams } from '../interfaces/certificate-list-params.interface'
import { DataResponse } from '../interfaces/certificate-list-response.interface'
import { ICertificate } from '../interfaces/certificate.interface'

@Injectable()
export class CertificateService {
  constructor(
    @InjectModel('Certificate')
    private readonly CertificateModel: Model<ICertificate>
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

  public async removeCertificateById(id: string): Promise<ICertificate> {
    return await this.CertificateModel.findOneAndDelete({ _id: id })
  }

  public async listCertificates({
    event,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: ICertificateListParams): Promise<DataResponse> {
    const query = {
      event: new Types.ObjectId(event)
    }

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
}
