import { toStructualItems, toEntities } from '../transformer';
import { createRegEntity } from '../../mocks';

describe('transformer', () => {
  test('toStructualItems', () => {
    const variant = 'new';
    const raw = 'raw';
    const encoded = 'encoded';
    const dirs = {
      diff: 'diff/',
      expected: 'expected/',
      actual: 'actual/',
    };

    expect(toEntities(variant, dirs, [{ raw, encoded }])).toEqual([
      {
        id: `${variant}-${encoded}`,
        variant,
        name: raw,
        diff: `${dirs.diff}${raw}`,
        before: `${dirs.expected}${raw}`,
        after: `${dirs.actual}${raw}`,
      },
    ]);
  });

  test('toStructualItems', () => {
    const entities = [
      createRegEntity({
        id: 'id1',
        name: 'foo/bar/baz1.jpg',
      }),
      createRegEntity({
        id: 'id2',
        name: 'foo/bar/baz2.jpg',
      }),
      createRegEntity({
        id: 'id3',
        name: 'foo/hoge/fuga.jpg',
      }),
      createRegEntity({
        id: 'id4',
        name: 'hoge/fuga/piyo.jpg',
      }),
    ];

    expect(toStructualItems(entities)).toEqual([
      {
        id: entities[0].id,
        path: entities[0].name,
        name: 'foo',
        children: [
          {
            id: entities[0].id,
            path: entities[0].name,
            name: 'bar',
            children: [
              {
                id: entities[0].id,
                path: entities[0].name,
                name: 'baz1.jpg',
                children: [],
              },
              {
                id: entities[1].id,
                path: entities[1].name,
                name: 'baz2.jpg',
                children: [],
              },
            ],
          },
          {
            id: entities[2].id,
            path: entities[2].name,
            name: 'hoge',
            children: [
              {
                id: entities[2].id,
                path: entities[2].name,
                name: 'fuga.jpg',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: entities[3].id,
        path: entities[3].name,
        name: 'hoge',
        children: [
          {
            id: entities[3].id,
            path: entities[3].name,
            name: 'fuga',
            children: [
              {
                id: entities[3].id,
                path: entities[3].name,
                name: 'piyo.jpg',
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });
});
