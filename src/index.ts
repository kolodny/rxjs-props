import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

type ObservableObject<T> = {
  [K in keyof T]: Observable<T[K]> | T[K]
}

export function props<T>(obj: ObservableObject<T>): Observable<T> {
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return of({}) as any;
  }
  const values = keys.map(key => (obj as any)[key]);
  values.forEach((value, index) => {
    if (!(value instanceof Observable)) {
      values[index] = of(value); // Don't judge me!
    }
  });
  return combineLatest(values).pipe(map(results => {
    const resolved = {};
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      (resolved as any)[keys[keyIndex]] = results[keyIndex];
    }
    return resolved as T;
  }));
}
