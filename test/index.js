const { props } = require('../lib');
const { of, forkJoin, Subject, interval } = require('rxjs');
const { map, take } = require('rxjs/operators');
const { deepStrictEqual } = require('assert');

describe('props', () => {
  it('handles an empty object', async () => {
    const results = await props({}).toPromise();
    deepStrictEqual(results, {});
  });

  it('handles a plain object', async () => {
    const results = await props({
      str: 'str',
      num: 123,
    }).toPromise();
    deepStrictEqual(results, {
      str: 'str',
      num: 123,
    });
  });

  it('handles a simple observable object', async () => {
    const results = await props({
      str: of('str'),
      num: of(123),
    }).toPromise();
    deepStrictEqual(results, {
      str: 'str',
      num: 123,
    });
  });

  it('handles a hybrid object', async () => {
    const results = await props({
      str: 'str',
      num: of(123),
    }).toPromise();
    deepStrictEqual(results, {
      str: 'str',
      num: 123,
    });
  });

  it('combines latest by default', (done) => {
    const str$ = interval(10).pipe(take(2), map(index => ['str', 'str2'][index]))
    const num$ = interval(10).pipe(take(2), map(index => [123, 456][index]))
    const expected = [
      { str: 'str', num: 123 },
      { str: 'str2', num: 123 },
      { str: 'str2', num: 456 },
    ];
    props({
      str: str$,
      num: num$,
    }).subscribe(
      obj => deepStrictEqual(obj, expected.shift()),
      done,
      () => done(expected.length && new Error('Unasserted assertions!')),
    );
  });

  it('can specify a custom strategy', (done) => {
    const str$ = interval(10).pipe(take(2), map(index => ['str', 'str2'][index]))
    const num$ = interval(10).pipe(take(2), map(index => [123, 456][index]))
    props({
      str: str$,
      num: num$,
    }, forkJoin).subscribe(
      obj => deepStrictEqual(obj, {str: 'str2', num: 456}),
      done,
      done
    );
  });
});
