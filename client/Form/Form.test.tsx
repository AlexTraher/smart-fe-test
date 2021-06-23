import { Form } from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Form component', () => {
  it('should not call the handle submit function if a file has not been selected', () => {
    const handleSubmitMock = jest.fn();
    render(<Form handleSubmit={handleSubmitMock} />);

    expect(handleSubmitMock).not.toHaveBeenCalled();
    userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(handleSubmitMock).not.toHaveBeenCalled();
  });
});
