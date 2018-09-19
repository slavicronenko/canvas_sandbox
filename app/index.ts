import { interval, merge, of, timer } from 'rxjs';
import {
  bufferCount, bufferTime, concatMap,
  count,
  debounce,
  debounceTime,
  delay,
  distinct,
  elementAt,
  filter,
  last,
  map, max, min, reduce,
  take,
  takeLast
} from 'rxjs/operators';

function getObserver(name: string) {
  return {
    next: (value) => {
      console.log(`${name} - next: ${value}`);
    },
    complete: () => {
      console.log(`${name} - complete!`);
    }
  };
}

const observable1 = interval(1278)
  .pipe(
    take(5),
    map((x) => x * 2)
  );

const observable2 = interval(789)
  .pipe(
    take(5),
    map((x) => x * 3)
  );

/*merge(observable1, observable2)
  .pipe(
    bufferTime(1000)
  )
  .subscribe(getObserver('obs1'));*/

observable1.subscribe(getObserver('test1'));
observable1.subscribe(getObserver('test2'));
