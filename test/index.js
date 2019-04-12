const { props } = require('../lib');
const { of } = require('rxjs');
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
});
