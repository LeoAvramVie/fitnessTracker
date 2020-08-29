import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import {Exercise} from '../exercise.model';
import {UiServiceService} from '../../shared/ui.service.service';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoaded$: Observable<boolean>;


  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UiServiceService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit(): void {
    this.isLoaded$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
      });
    this.fetchExercise();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  fetchExercise() {
    this.trainingService.fetchAvailableExercises();

  }
}
