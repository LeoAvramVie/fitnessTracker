import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Exercise} from '../exercise.model';
import {UiServiceService} from '../../shared/ui.service.service';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$: Observable<Exercise[]>;
  isLoaded$: Observable<boolean>;


  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UiServiceService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.isLoaded$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercise() {
    this.trainingService.fetchAvailableExercises();

  }
}
