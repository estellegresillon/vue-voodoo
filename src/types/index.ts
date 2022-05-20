import { Dayjs } from "dayjs";

interface Dictionary<T> {
  [key: string]: T;
}

export type Placement = {
  country: string;
  game: string;
  platform: string;
  revenue: number;
};

export type ReactiveDashboard = {
  countryNames: string[];
  gameNames: string[];
  groupedCountries: Dictionary<Placement[]>;
  groupedGames: Dictionary<Placement[]>;
};

export type ReactiveRoot = {
  data: Placement[];
  date: Dayjs[];
  filteredData: Placement[];
  hasFilteredData: boolean;
  os: string[];
};
