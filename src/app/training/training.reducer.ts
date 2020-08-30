import {SET_AVAILABLETRAINING, SET_FINISHEDAVAILABLETRAINING, START_TRAINING, STOP_TRAINING, TrainingActions} from './training.actions';
import {Exercise} from './exercise.model';
import * as fromRoot from '../app.reducer';

export interface TrainingState {
  availableExercise: Exercise [];
  finishedExercise: Exercise [];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercise: [],
  finishedExercise: [],
  activeTraining: null
};

export function authReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLETRAINING:
      return {
        ...state,
        availableExercise: action.payload;
      };
    case SET_FINISHEDAVAILABLETRAINING:
      return {
        ...state,
        finishedExercise: action.payload;
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: action.payload
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null
      };
    default: {
      return state;
    }
  }
};

export const getAvailableExercises = (state: TrainingState) => state.availableExercise;
export const getAFinishedExercises = (state: TrainingState) => state.finishedExercise;
export const getActiveExercises = (state: TrainingState) => state.activeTraining;
