import {NgModule} from '@angular/core';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingComponent} from './past-training/past-training.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {SharedModule} from '../shared/shared.module';
import {TrainingRouterModule} from './training-router.module';
import {StoreModule} from '@ngrx/store';
import { trainingReducer} from './training.reducer';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,

  ],
  imports: [
    SharedModule,
    TrainingRouterModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: []
})
export class TrainingModule {

}



//test
