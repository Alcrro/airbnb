export interface ISearchData {
  id: number;
  category: string;
  name: string;
  inputPlaceholder: string;
}
export const searchData: ISearchData[] = [
  {
    id: 0,
    category: "where",
    name: "where",
    inputPlaceholder: "search destination",
  },
  {
    id: 1,
    category: "check-in",
    name: "check in",
    inputPlaceholder: "add states",
  },
  {
    id: 2,
    category: "check-out",
    name: "check out",
    inputPlaceholder: "add states",
  },
  {
    id: 3,
    category: "who-guest",
    name: "who",
    inputPlaceholder: "Add guests",
  },
  {
    id: 4,
    category: "experience",
    name: "people experience",
    inputPlaceholder: "Search experiences by other people",
  },
];
