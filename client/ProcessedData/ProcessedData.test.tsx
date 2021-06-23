import { ProcessedData } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProcessedData component', () => {
  it('should allow you to toggle between datasets', () => {
    const mockData = {
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
    };

    render(<ProcessedData data={mockData} />);

    let tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toEqual(3);

    userEvent.click(screen.getByRole('toggle', { name: 'unique' }));
    tableRows = screen.getAllByRole('row');
    expect(tableRows.length).toEqual(4);
  });
});
