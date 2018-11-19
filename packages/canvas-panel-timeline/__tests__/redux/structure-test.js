import {
  CurrentLevel,
  depthOf,
  findLevel,
  flattenAll,
  getBreadCrumbs,
  levelKeys,
  manifestToStructure,
  mapDepths,
  matchesRange,
  matchRangeReducer,
  processStructure,
  sortByKey,
} from '../../src/redux/structure.utility';
import memoir2 from '../../fixtures/memoir-2';

describe('redux/structure.utility', () => {
  test('manifestToStructure', () => {
    const structure = manifestToStructure(memoir2);

    expect(structure).toMatchInlineSnapshot(`
Array [
  Object {
    "children": Array [
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r2",
        "label": "California Midwinter Exposition - Hawaii exhibit",
        "range": 0,
        "temporal": Array [
          1893,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r3",
        "label": "First voyage to Hawaii",
        "range": Array [
          1,
          3,
        ],
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r4",
        "label": "Overview of the sugar business in Hawaii",
        "range": 4,
        "temporal": Array [
          1899,
        ],
      },
    ],
    "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r1",
    "label": "Introduction to the Hawaiian journey",
    "range": Array [
      0,
      4,
    ],
    "temporal": Array [
      1893,
      1899,
    ],
  },
  Object {
    "children": Array [
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r6",
        "label": "Geographical and geological features",
        "range": Array [
          4,
          7,
        ],
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r7",
        "label": "Moku'aweoweo and notable eruptions",
        "range": Array [
          8,
          11,
        ],
        "temporal": Array [
          1855,
          1887,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r8",
        "label": "Kilauea, notable eruptions and seismic activity",
        "range": Array [
          12,
          16,
        ],
        "temporal": Array [
          1790,
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r9",
        "label": "Population statistics",
        "range": 17,
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r10",
        "label": "Discovery of Honolulu, arrival of New England Missionaries, and establishment of laws",
        "range": 18,
        "temporal": Array [
          1794,
          1827,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r11",
        "label": "Establishment of sugar plantations and development of trade",
        "range": Array [
          19,
          21,
        ],
        "temporal": Array [
          1851,
          1880,
        ],
      },
    ],
    "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r5",
    "label": "The Hawaiian Islands",
    "range": Array [
      4,
      21,
    ],
    "temporal": Array [
      1790,
      1900,
    ],
  },
  Object {
    "children": Array [
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r13",
        "label": "Eventful voyage to the Wailuku plantation ",
        "range": Array [
          22,
          24,
        ],
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r14",
        "label": "Experience of the Malihini / newcomer ",
        "range": Array [
          NaN,
          NaN,
        ],
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r15",
        "label": "Wailuku plantation survey",
        "range": Array [
          NaN,
          NaN,
        ],
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r16",
        "label": "Flora and fauna",
        "range": undefined,
        "temporal": Array [
          1900,
        ],
      },
    ],
    "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r12",
    "label": "First visit to Hawaii",
    "range": Array [
      NaN,
      NaN,
    ],
    "temporal": Array [
      1899,
      1900,
    ],
  },
  Object {
    "children": Array [
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r18",
        "label": "Water irrigation projects",
        "range": undefined,
        "temporal": Array [
          1899,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r19",
        "label": "Observations on the immigrant",
        "range": undefined,
        "temporal": Array [
          1900,
        ],
      },
      Object {
        "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r20",
        "label": "Ambassador, Bush",
        "range": Array [
          NaN,
          NaN,
        ],
        "temporal": Array [
          1900,
        ],
      },
    ],
    "id": "https://iiif.library.nuigalway.ie/manifests/p135/memoir-hawaii/range/r17",
    "label": "Subsequent visits to Hawaii",
    "range": Array [
      NaN,
      NaN,
    ],
    "temporal": Array [
      1899,
      1906,
    ],
  },
]
`);
  });
});
