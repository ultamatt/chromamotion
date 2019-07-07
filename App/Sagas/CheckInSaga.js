import { put, call } from 'redux-saga/effects'
import CheckInActions from 'App/Stores/CheckIn/Actions'
import { checkInService } from 'App/Services/CheckInService'

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake checkIn informations.
 * Feel free to remove it.
 */
export function* fetchCheckIn() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CheckInActions.fetchCheckInLoading())

  // Fetch checkIn informations from an API
  const checkIn = yield call(checkInService.fetchCheckIn)
  if (checkIn) {
    yield put(CheckInActions.fetchCheckInSuccess(checkIn))
  } else {
    yield put(CheckInActions.fetchCheckInFailure('There was an error while fetching check ins.'))
  }
}

export function* listCheckIns() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CheckInActions.listCheckInsLoading())

  // Fetch checkIn informations from an API
  const checkIns = yield call(checkInService.listCheckIns)
  if (checkIns) {
    yield put(CheckInActions.listCheckInsSuccess(checkIns))
  } else {
    yield put(CheckInActions.listCheckInsFailure('There was an error while fetching check ins.'))
  }
}

export function* postCheckIn(daCheckIn) {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(CheckInActions.postCheckInLoading())

  // Fetch checkIn informations from an API
  const checkIn = yield call(checkInService.postCheckIn, daCheckIn)
  if (checkIn) {
    yield put(CheckInActions.postCheckInSuccess(checkIn))
  } else {
    yield put(CheckInActions.postCheckInFailure('There was an error while posting check ins.'))
  }
}
