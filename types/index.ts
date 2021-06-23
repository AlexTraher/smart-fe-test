export interface IOrderedListItem {
  path: string;
  visits: number;
}

export interface IOrderedUniqueListItem extends IOrderedListItem {
  ip: string;
}

export interface IDataItem {
  path: string;
  ip: string;
}

export interface IProcessDataResponse {
  orderedResult: IOrderedListItem[];
  uniqueOrderedResult: IOrderedUniqueListItem[];
}
