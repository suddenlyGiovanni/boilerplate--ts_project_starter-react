import * as axios from 'axios'
import { apiTypes } from './index'

interface ApiActionFactory<
  OnSuccess extends Function = (success: any) => any,
  OnFailure extends Function = (error: any) => any
> {
  (
    options: axios.AxiosRequestConfig & {
      onSuccess: OnSuccess
      onFailure: OnFailure
      label: string
      accessToken?: null | string
    }
  ): {
    type: typeof apiTypes.API
    payload: axios.AxiosRequestConfig & {
      onSuccess: OnSuccess
      onFailure: OnFailure
      label: string
      accessToken: null | string
    }
  }
}

export const apiActionFactory: ApiActionFactory = ({
  url = '',
  method = 'GET',
  data = null,
  onSuccess = function(success) {},
  onFailure = function(error) {},
  label = '',
  accessToken = null,
}) => {
  return {
    type: apiTypes.API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      accessToken,
    },
  }
}
