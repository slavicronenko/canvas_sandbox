import { interval, merge, of, timer, concat, zip, fromEvent } from 'rxjs';
import {
  bufferCount, bufferTime, concatAll, concatMap,
  count,
  debounce,
  debounceTime,
  delay,
  distinct,
  elementAt,
  filter,
  last,
  map, max, mergeAll, min, pluck, reduce, switchAll, switchMap, mergeMap,
  take,
  takeLast, timeout
} from 'rxjs/operators';

function getObserver(name: string) {
  return {
    next: (value) => {
      console.log(`${name} - next:`, value);
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

const obs1 = getObserver('obs1');

fromEvent(document, 'click')
  .pipe(
    switchMap(() => interval(1000).pipe(take(3)))
  )
  .subscribe(obs1);
