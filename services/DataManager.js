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
    progress: 1,
    items: [
      { id: 1, name: "Item 1", measure: "kg", checked: false, quantity: 2 },
      { id: 2, name: "Item 2", measure: "pcs", checked: true, quantity: 1 },
      { id: 3, name: "Item 3", measure: "ml", checked: false, quantity: 3 },
    ],
  },
  {
    id: 2,
    name: "List 2",
    isTemplate: true,
    progress: 2,
    items: [
      { id: 1, name: "Item 1", measure: "l", checked: true, quantity: 1 },
      { id: 2, name: "Item 2", measure: "pcs", checked: false, quantity: 2 },
    ],
  },
  {
    id: 3,
    name: "List 3",
    isTemplate: false,
    progress: 2,
    items: [
      { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 3 },
      { id: 2, name: "Item 2", measure: "l", checked: true, quantity: 1 },
      { id: 3, name: "Item 3", measure: "pcs", checked: false, quantity: 2 },
      { id: 4, name: "Item 4", measure: "ml", checked: true, quantity: 2 },
    ],
  },
  {
    id: 4,
    name: "List 4",
    isTemplate: false,
    progress: 3,
    items: [
      { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 3 },
      { id: 2, name: "Item 2", measure: "l", checked: true, quantity: 1 },
      { id: 3, name: "Item 3", measure: "pcs", checked: false, quantity: 2 },
      { id: 4, name: "Item 4", measure: "ml", checked: true, quantity: 2 },
    ],
  },
  {
    id: 5,
    name: "List 5",
    isTemplate: false,
    progress: 3,
    items: [
      { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 3 },
      { id: 2, name: "Item 2", measure: "l", checked: true, quantity: 1 },
      { id: 3, name: "Item 3", measure: "pcs", checked: false, quantity: 2 },
      { id: 4, name: "Item 4", measure: "ml", checked: true, quantity: 2 },
    ],
  },
  {
    id: 6,
    name: "List 6",
    isTemplate: false,
    progress: 4,
    items: [
      { id: 1, name: "Item 1", measure: "kg", checked: true, quantity: 3 },
      { id: 2, name: "Item 2", measure: "l", checked: true, quantity: 1 },
      { id: 3, name: "Item 3", measure: "pcs", checked: false, quantity: 2 },
      { id: 4, name: "Item 4", measure: "ml", checked: true, quantity: 2 },
    ],
  },
];
