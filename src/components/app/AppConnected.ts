import { App } from './App'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { duckSelectors, duckActions } from 'features/duck-feature'

function mapStateToProps(state: RootState) {
  return {
    quaking: duckSelectors.checkIfDuckIsQuaking(state),
    distance: duckSelectors.duckDistance(state),
  }
}

const mapDispatchToProps = {
  quack: duckActions.quack,
  swim: duckActions.swim,
}

export const AppConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export type ConnectedProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps
