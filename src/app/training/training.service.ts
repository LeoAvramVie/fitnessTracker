import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {

  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.db.collection<Exercise>('availableExercises')
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Exercise;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });

  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'complete'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  8;

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercise() {
    this.db.collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercises = exercises;
        this.finishedExercisesChanged.next(exercises);
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);

  }

}
