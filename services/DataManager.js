class DataManager {
  getTestData = () => {
    return testData;
  };
}

export default DataManager;

const testData = [
  {
    id: 1,
    name: "List 1",
    isTemplate: false,
    progress: 5,
    shops: [
      {
        name: "Albert",
        items: [
          { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 2 },
          { id: 2, name: "Item 2", measure: "pcs", checked: true, quantity: 1 },
          { id: 3, name: "Item 3", measure: "ml", checked: true, quantity: 3 },
        ],
      },
      {
        name: "Kaufland",
        items: [
          { id: 4, name: "Item 4", measure: "g", checked: false, quantity: 1 },
          { id: 5, name: "Item 5", measure: "pcs", checked: true, quantity: 2 },
          { id: 6, name: "Item 6", measure: "ml", checked: false, quantity: 4 },
        ],
      },
      {
        name: "Lidl",
        items: [
          { id: 7, name: "Item 7", measure: "kg", checked: false, quantity: 3 },
          { id: 8, name: "Item 8", measure: "pcs", checked: true, quantity: 3 },
          { id: 9, name: "Item 9", measure: "ml", checked: false, quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "List 2",
    isTemplate: true,
    progress: 4,
    shops: [
      {
        name: "Tesco",
        items: [
          {
            id: 10,
            name: "Item 10",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 11,
            name: "Item 11",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 12,
            name: "Item 12",
            measure: "ml",
            checked: false,
            quantity: 1,
          },
        ],
      },
      {
        name: "Sainsbury's",
        items: [
          {
            id: 13,
            name: "Item 13",
            measure: "kg",
            checked: true,
            quantity: 4,
          },
          {
            id: 14,
            name: "Item 14",
            measure: "pcs",
            checked: false,
            quantity: 1,
          },
          {
            id: 15,
            name: "Item 15",
            measure: "ml",
            checked: true,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "List 3",
    isTemplate: false,
    progress: 5,
    shops: [
      {
        name: "Lidl",
        items: [
          {
            id: 13,
            name: "Item 13",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 14,
            name: "Item 14",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 15,
            name: "Item 15",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Aldi",
        items: [
          {
            id: 16,
            name: "Item 16",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 17,
            name: "Item 17",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 18,
            name: "Item 18",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "List 4",
    isTemplate: false,
    progress: 6,
    shops: [
      {
        name: "Walmart",
        items: [
          {
            id: 19,
            name: "Item 19",
            measure: "kg",
            checked: true,
            quantity: 2,
          },
          {
            id: 20,
            name: "Item 20",
            measure: "pcs",
            checked: false,
            quantity: 3,
          },
          {
            id: 21,
            name: "Item 21",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Target",
        items: [
          {
            id: 22,
            name: "Item 22",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 23,
            name: "Item 23",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 24,
            name: "Item 24",
            measure: "ml",
            checked: false,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "List 5",
    isTemplate: false,
    progress: 1,
    shops: [
      {
        name: "Whole Foods",
        items: [
          {
            id: 25,
            name: "Item 25",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 26,
            name: "Item 26",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 27,
            name: "Item 27",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Trader Joe's",
        items: [
          {
            id: 28,
            name: "Item 28",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 29,
            name: "Item 29",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 30,
            name: "Item 30",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "List 6",
    isTemplate: false,
    progress: 2,
    shops: [
      {
        name: "Costco",
        items: [
          {
            id: 31,
            name: "Item 31",
            measure: "kg",
            checked: true,
            quantity: 2,
          },
          {
            id: 32,
            name: "Item 32",
            measure: "pcs",
            checked: false,
            quantity: 3,
          },
          {
            id: 33,
            name: "Item 33",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Sam's Club",
        items: [
          {
            id: 34,
            name: "Item 34",
            measure: "kg",
            checked: false,
            quantity: 1,
          },
          {
            id: 35,
            name: "Item 35",
            measure: "pcs",
            checked: true,
            quantity: 2,
          },
          {
            id: 36,
            name: "Item 36",
            measure: "ml",
            checked: false,
            quantity: 3,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "List 7",
    isTemplate: false,
    progress: 3,
    shops: [
      {
        name: "Home Depot",
        items: [
          {
            id: 37,
            name: "Item 37",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 38,
            name: "Item 38",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 39,
            name: "Item 39",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
      {
        name: "Lowe's",
        items: [
          {
            id: 40,
            name: "Item 40",
            measure: "kg",
            checked: false,
            quantity: 2,
          },
          {
            id: 41,
            name: "Item 41",
            measure: "pcs",
            checked: true,
            quantity: 3,
          },
          {
            id: 42,
            name: "Item 42",
            measure: "ml",
            checked: false,
            quantity: 2,
          },
        ],
      },
      {
        name: "Home Depot2",
        items: [
          {
            id: 37,
            name: "Item 37",
            measure: "kg",
            checked: true,
            quantity: 3,
          },
          {
            id: 38,
            name: "Item 38",
            measure: "pcs",
            checked: false,
            quantity: 2,
          },
          {
            id: 39,
            name: "Item 39",
            measure: "ml",
            checked: true,
            quantity: 1,
          },
        ],
      },
    ],
  },
];
