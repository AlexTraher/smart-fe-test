import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IndexPage from '../pages/index';

describe('index page', () => {
  let fetchMock: jest.Mock;
  beforeEach(() => {
    fetchMock = jest.fn().mockResolvedValue({
      json: () => {
        return Promise.resolve({
          orderedResult: [
            {
              visits: 90,
              path: '/about/2',
            },
            {
              visits: 89,
              path: '/contact',
            },
          ],
          uniqueOrderedResult: [
            {
              visits: 10,
              path: '/about/2',
              ip: '184.123.665.067',
            },
            {
              visits: 9,
              path: '/about/2',
              ip: '200.017.277.774',
            },
            {
              visits: 9,
              path: '/index',
              ip: '451.106.204.921',
            },
          ],
        });
      },
    });

    global.fetch = fetchMock;
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('should allow you to selected a file, upload it and return a set of data', async () => {
    const file = new File(['hello'], 'example.log');
    render(<IndexPage />);

    let toggles = screen.queryAllByRole('toggle');
    expect(toggles.length).toEqual(0);

    let tableRows = screen.queryAllByRole('row');
    expect(tableRows.length).toEqual(0);

    const input = screen.getByLabelText(/File upload/i);

    userEvent.upload(input, file);
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    await waitForElementToBeRemoved(() =>
      screen.getAllByTestId(/data-skeleton/i)
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]).toMatchSnapshot();

    toggles = screen.getAllByRole('toggle');
    expect(toggles.length).toEqual(2);

    tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toEqual(3);
  });
});
