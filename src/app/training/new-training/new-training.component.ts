import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Exercise} from '../exercise.model';
import {UiServiceService} from '../../shared/ui.service.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoaded = true;
  private loadingSub: Subscription;


  constructor(private trainingService: TrainingService,
              private db: AngularFirestore,
              private uiService: UiServiceService) {
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoaded = isLoading;
    });
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
    if (this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSub){
      this.loadingSub.unsubscribe();
    }
  }
  fetchExercise(){
    this.trainingService.fetchAvailableExercises();

  }
}
