import { IOrderedUniqueListItem, IDataItem, IOrderedListItem } from '../types';

interface ICountHash {
  [key: string]: number;
}

interface IUniqueCountHash {
  [key: string]: IOrderedUniqueListItem;
}

export const generateOrderedList = (data: IDataItem[]): IOrderedListItem[] => {
  const listCountHash: ICountHash = {};

  data.forEach(({ path }) => {
    if (!listCountHash[path]) {
      listCountHash[path] = 1;
    } else {
      listCountHash[path]++;
    }
  });

  const result = Object.keys(listCountHash)
    .map((key) => ({
      visits: listCountHash[key],
      path: key,
    }))
    .filter(({ path }) => path);

  result.sort(({ visits: aVisits }, { visits: bVisits }) => bVisits - aVisits);

  return result;
};

export const generateOrderedUniqueList = (
  data: IDataItem[]
): IOrderedUniqueListItem[] => {
  const listCountHash: IUniqueCountHash = {};

  data.forEach(({ path, ip }) => {
    const key = `${path}-${ip}`;

    if (!listCountHash[key]) {
      listCountHash[key] = { visits: 1, path, ip };
    } else {
      listCountHash[key].visits++;
    }
  });

  const result = Object.keys(listCountHash)
    .map((key) => ({
      ...listCountHash[key],
    }))
    .filter(({ path }) => path);

  result.sort(({ visits: aVisits }, { visits: bVisits }) => bVisits - aVisits);

  return result;
};

export const preprocessData = (data: string) =>
  data.split('\n').map((row: string) => {
    const [path, ip] = row.split(' ');
    return { path, ip };
  });
