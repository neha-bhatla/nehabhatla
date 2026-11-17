import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoleGame from './MoleGame';

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  jest.spyOn(Math, 'random').mockReturnValue(0);
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test('only a live mole scores, including keyboard play and double clicks', () => {
  render(<MoleGame />);
  fireEvent.click(screen.getByRole('button', { name: /let’s play/i }));
  const first = screen.getByRole('button', { name: 'Hole 1, mole here' });
  expect(first).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: 'Hole 2, empty' }));
  expect(screen.getByTestId('mole-score')).toHaveTextContent('00');
  fireEvent.click(first);
  fireEvent.click(first);
  expect(screen.getByTestId('mole-score')).toHaveTextContent('01');
  act(() => jest.advanceTimersByTime(900));
  const second = screen.getByRole('button', { name: 'Hole 2, mole here' });
  fireEvent.keyDown(second, { key: '2', repeat: true });
  expect(screen.getByTestId('mole-score')).toHaveTextContent('01');
  fireEvent.keyDown(second, { key: '2' });
  expect(screen.getByTestId('mole-score')).toHaveTextContent('02');
});

test('the round ends at 20 seconds, saves the best, and can restart cleanly', () => {
  const { unmount } = render(<MoleGame />);
  fireEvent.click(screen.getByRole('button', { name: /let’s play/i }));
  fireEvent.click(screen.getByRole('button', { name: 'Hole 1, mole here' }));
  act(() => jest.advanceTimersByTime(20000));
  expect(screen.getByRole('status')).toHaveTextContent('You bonked 1 mole.');
  expect(screen.getByRole('button', { name: 'Hole 1, empty' })).toBeDisabled();
  expect(localStorage.getItem('neha-mole-best')).toBe('1');
  expect(jest.getTimerCount()).toBe(0);
  fireEvent.click(screen.getByRole('button', { name: /one more round/i }));
  expect(screen.getByTestId('mole-score')).toHaveTextContent('00');
  expect(screen.getByRole('button', { name: /end round/i })).toBeEnabled();
  unmount();
  expect(jest.getTimerCount()).toBe(0);
  render(<MoleGame />);
  expect(screen.getByText('best').nextElementSibling).toHaveTextContent('01');
});

test('ending early stops play and unavailable browser storage does not break the game', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  render(<MoleGame />);
  fireEvent.click(screen.getByRole('button', { name: /let’s play/i }));
  fireEvent.click(screen.getByRole('button', { name: 'Hole 1, mole here' }));
  fireEvent.click(screen.getByRole('button', { name: /end round/i }));
  expect(screen.getByRole('status')).toHaveTextContent('You bonked 1 mole.');
  expect(jest.getTimerCount()).toBe(0);
  act(() => jest.advanceTimersByTime(30000));
  expect(screen.getByTestId('mole-score')).toHaveTextContent('01');
});
