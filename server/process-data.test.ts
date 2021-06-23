import {
  generateOrderedList,
  generateOrderedUniqueList,
  preprocessData,
  IDataItem,
} from './process-data';

describe('process data', () => {
  let rawData: string;
  let preprocessedData: IDataItem[];
  beforeEach(() => {
    rawData = [
      '/help_page/1 126.318.035.038',
      '/contact 184.123.665.067',
      '/home 184.123.665.067',
      '/about/2 444.701.448.104',
      '/help_page/1 929.398.951.889',
      '/index 444.701.448.104',
      '/index 444.701.448.104',
      '/help_page/1 722.247.931.582',
      '/about 061.945.150.735',
      '/help_page/1 646.865.545.408',
    ].join('\n');

    preprocessedData = [
      {
        path: '/help_page/1',
        ip: '126.318.035.038',
      },
      {
        path: '/contact',
        ip: '184.123.665.067',
      },
      {
        path: '/home',
        ip: '184.123.665.067',
      },
      {
        path: '/about/2',
        ip: '444.701.448.104',
      },
      {
        path: '/help_page/1',
        ip: '929.398.951.889',
      },
      {
        path: '/index',
        ip: '444.701.448.104',
      },
      {
        path: '/index',
        ip: '444.701.448.104',
      },
      {
        path: '/help_page/1',
        ip: '722.247.931.582',
      },
      {
        path: '/about',
        ip: '061.945.150.735',
      },
      {
        path: '/help_page/1',
        ip: '646.865.545.408',
      },
    ];
  });

  it('should preprocess a set of data', () => {
    const result = preprocessData(rawData);
    expect(result).toEqual(preprocessedData);
  });

  it('should generate an ordered list from preprocessed data', () => {
    const result = generateOrderedList(preprocessedData);
    expect(result[0]).toEqual({
      path: '/help_page/1',
      visits: 4,
    });

    expect(result[5]).toEqual({
      path: '/about',
      visits: 1,
    });
  });

  it('should generate a unique ordered list from preprocessed data', () => {
    const result = generateOrderedUniqueList(preprocessedData);
    expect(result[0]).toEqual({
      visits: 2,
      ip: '444.701.448.104',
      path: '/index',
    });

    expect(result[8]).toEqual({
      visits: 1,
      ip: '646.865.545.408',
      path: '/help_page/1',
    });
  });
});
