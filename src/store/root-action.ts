import * as duckActions from 'features/duck-feature/actions'
import * as apiActions from 'store/api/actions'

export const rootAction = {
  duck: duckActions,
  api: apiActions,
}
