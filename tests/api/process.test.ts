import handler from '../../pages/api/process';
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from 'node-mocks-http';
import formidable, { IncomingForm } from 'formidable';
import { mocked } from 'ts-jest/utils';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('formidable');
jest.mock('fs');

describe('process api', () => {
  let req: MockRequest<NextApiRequest>;
  let res: MockResponse<NextApiResponse>;
  let errorSpy: jest.SpyInstance;
  beforeEach(() => {
    // surpess logs
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mockFs = mocked(fs, true);
    mockFs.readFileSync.mockReturnValue(
      [
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
      ].join('\n')
    );

    req = createRequest({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

    res = createResponse();
  });

  afterEach(() => {
    errorSpy.mockRestore();
    jest.resetAllMocks();
  });

  it('should return a processed JSON object when a file is uploaded', async () => {
    const mockedFormidable = mocked(formidable, true);
    const mockParse = jest.fn().mockImplementation((req, cb) => {
      cb(null, null, { file: {} });
    });

    const mockIncomingForm = new IncomingForm();
    mockIncomingForm.parse = mockParse;

    mockedFormidable.mockReturnValue(mockIncomingForm);

    await handler(req, res);

    expect(res._getJSONData()).toMatchSnapshot();
  });

  it('should return an error code if the parsing fails', async () => {
    const mockedFormidable = mocked(formidable, true);
    const errMsg = 'something went wrong';
    const mockParse = jest.fn().mockImplementation((req, cb) => {
      cb(errMsg, null, null);
    });

    const mockIncomingForm = new IncomingForm();
    mockIncomingForm.parse = mockParse;

    mockedFormidable.mockReturnValue(mockIncomingForm);

    await handler(req, res);

    expect(res.statusCode).toEqual(500);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(errMsg);
  });
});
