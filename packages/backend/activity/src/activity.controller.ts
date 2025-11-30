import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { IActivityByIdResponse } from './interfaces/activity-by-id-response.interface'
import { IActivityCreateResponse } from './interfaces/activity-create-response.interface'
import { IActivityDeleteResponse } from './interfaces/activity-delete-response.interface'
import { IActivityListParams } from './interfaces/activity-list-params.interface'
import { IActivityListResponse } from './interfaces/activity-list-response.interface'
import { IActivityUpdateByIdResponse } from './interfaces/activity-update-by-id-response.interface'
import { IActivityUpdateParams } from './interfaces/activity-update-params.interface'
import { IActivity } from './interfaces/activity.interface'
import { ActivityService } from './services/activity.service'

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @MessagePattern('activity_list')
  public async activityList(
    params: IActivityListParams
  ): Promise<IActivityListResponse> {
    const activities = await this.activityService.listActivities(params)

    return {
      status: HttpStatus.OK,
      message: 'activity_list_success',
      data: activities
    }
  }

  @MessagePattern('activity_get_by_id')
  public async getActivityById(params: {
    id: string
  }): Promise<IActivityByIdResponse> {
    let result: IActivityByIdResponse

    if (params?.id) {
      const activity = await this.activityService.findActivityById(params.id)
      if (activity) {
        result = {
          status: HttpStatus.OK,
          message: 'activity_get_by_id_success',
          data: { activity }
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'activity_get_by_id_not_found',
          data: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'activity_get_by_id_bad_request',
        data: null
      }
    }

    return result
  }

  @MessagePattern('activity_update_by_id')
  public async activityUpdateById({
    activity,
    id
  }: {
    activity: IActivityUpdateParams
    id: string
  }): Promise<IActivityUpdateByIdResponse> {
    if (!activity || id)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'activity_update_by_id_bad_request',
        activity: null,
        errors: null
      }
    try {
      const activityOld = await this.activityService.findActivityById(id)
      if (!activityOld)
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'activity_update_by_id_not_found',
          activity: null,
          errors: null
        }

      const existActivity = await this.activityService.searchActivity(
        activityOld?.event,
        activity?.type,
        activity?.name
      )
      if (existActivity)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'activity_update_by_id_conflict',
          activity: null,
          errors: null
        }
      const updatedActivity = await this.activityService.updateActivityById(
        id,
        activity
      )
      return {
        status: HttpStatus.OK,
        message: 'activity_update_by_id_success',
        activity: updatedActivity,
        errors: null
      }
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'activity_update_by_id_precondition_failed',
        activity: null,
        errors: e.errors
      }
    }
  }

  @MessagePattern('activity_create')
  public async activityCreate(
    activityBody: IActivity
  ): Promise<IActivityCreateResponse> {
    if (!activityBody)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'activity_create_bad_request',
        activity: null,
        errors: null
      }
    try {
      const existActivity = await this.activityService.searchActivity(
        activityBody?.event,
        activityBody?.type,
        activityBody?.name
      )
      if (existActivity)
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'activity_create_conflict',
          activity: null,
          errors: null
        }

      const activity = await this.activityService.createActivity(activityBody)
      return {
        status: HttpStatus.CREATED,
        message: 'activity_create_success',
        activity,
        errors: null
      }
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: 'activity_create_precondition_failed',
        activity: null,
        errors: e.errors
      }
    }
  }

  @MessagePattern('activity_delete_by_id')
  public async activityDeleteForUser(params: {
    id: string
    permission: boolean
  }): Promise<IActivityDeleteResponse> {
    let result: IActivityDeleteResponse

    if (params && params.id) {
      try {
        const activity = await this.activityService.findActivityById(params.id)

        if (activity) {
          if (params.permission) {
            await this.activityService.removeActivityById(params.id)
            result = {
              status: HttpStatus.OK,
              message: 'activity_delete_by_id_success',
              errors: null
            }
          } else {
            result = {
              status: HttpStatus.FORBIDDEN,
              message: 'activity_delete_by_id_forbidden',
              errors: null
            }
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'activity_delete_by_id_not_found',
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'activity_delete_by_id_forbidden',
          errors: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'activity_delete_by_id_bad_request',
        errors: null
      }
    }

    return result
  }
}
