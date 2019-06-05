import { duckActions } from 'features/duck'
import { apiActions } from 'features/api'

export const rootAction = {
  duck: duckActions,
  api: apiActions,
}
