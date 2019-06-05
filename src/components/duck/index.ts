import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'

import { duckSelectors, duckActions } from 'features/duck'
import { Duck } from './Duck'

function mapStateToProps(state: RootState) {
  return {
    quacking: duckSelectors.checkIfDuckIsQuaking(state),
    distance: duckSelectors.duckDistance(state),
  }
}

const mapDispatchToProps = {
  quack: duckActions.quack,
  swim: duckActions.swim,
  fetchDucks: duckActions.fetchDucks,
}

export const ConnectedDuck = connect(
  mapStateToProps,
  mapDispatchToProps
)(Duck)

export type DuckProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps
