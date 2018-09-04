import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

timer(0, 1000)
  .pipe(
    map((x) => x * 2)
  )
  .subscribe(console.log);
