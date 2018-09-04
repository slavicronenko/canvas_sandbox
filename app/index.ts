import { Subject, timer } from 'rxjs';
import { map } from 'rxjs/operators';

const observer = {
  next: (value) => {
    console.log(`next: ${value}`);
  },
  complete: () => {
    console.log(`complete!`);
  }
};

const observable = timer(0, 1000)
  .pipe(
    map((x) => x * 2)
  );

const subj = new Subject();

subj.subscribe(observer);
observable.subscribe(subj);
