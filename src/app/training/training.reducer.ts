import {Exercise} from './exercise.model';
import * as fromRoot from '../app.reducer';
import {SET_AVAILABLE_TRAININGS, SET_FINISHED_TRAININGS, START_TRAINING, STOP_TRAINING, TrainingActions} from './training.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export interface TrainingState {
  availableExercise: Exercise[];
  finishedExercise: Exercise[];
  activeTrainig: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availableExercise: [],
  finishedExercise: [],
  activeTrainig: null
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercise: action.payload
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercise: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        activeTrainig: {...state.availableExercise.find(ex => ex.id === action.payload)}
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTrainig: null
      };
    default: {
      return state;
    }
  }
}


export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercise);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercise);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTrainig);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTrainig != null);

