import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';

export const SET_AVAILABLETRAINING = '[TRAINING] Set Available Training';
export const SET_FINISHEDAVAILABLETRAINING = '[TRAINING] Set Finished Training';
export const START_TRAINING = '[TRAINING] Start Training';
export const STOP_TRAINING = '[TRAINING] Stop Training';

export class SetAvailableTrainings implements Action{
  readonly type = SET_AVAILABLETRAINING;
    constructor(public payload: Exercise) {

    }
}
export class SetFinishedTrainings implements Action{
  readonly type = SET_FINISHEDAVAILABLETRAINING;
  constructor(public payload: Exercise) {
  }
}
export class StartTraining implements Action{
  readonly type = START_TRAINING;
  constructor(public payload: Exercise) {
  }
}
export class StopTraining implements Action{
  readonly type = STOP_TRAINING;
  constructor(public payload: Exercise) {
  }
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
