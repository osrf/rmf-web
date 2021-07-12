import { render, screen } from '@testing-library/react';
import userEvent, { TargetElement } from '@testing-library/user-event';
import { format } from 'date-fns';
import React from 'react';
import { NotificationsDialog } from '../lib';
import { Notification, Severity } from './notifications-dialog';

const notifications: Notification[] = [
  {
    id: 1,
    time: format(new Date(), 'MM/dd/yyyy HH:mm'),
    error: 'message',
    severity: Severity.High,
  },
  {
    id: 2,
    time: format(new Date(), 'MM/dd/yyyy HH:mm'),
    error: 'message',
    severity: Severity.Medium,
  },
  { id: 3, time: format(new Date(), 'MM/dd/yyyy HH:mm'), error: 'message', severity: Severity.Low },
];

it('should call onClose when close button is clicked', () => {
  const mockOnClose = jasmine.createSpy();
  const mockOnDismiss = jasmine.createSpy();
  render(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={notifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );
  userEvent.click(screen.getByText(/CLOSE/i));
  expect(mockOnClose).toHaveBeenCalled();
});

it('should call onClose when close icon at the top is clicked', () => {
  const mockOnClose = jasmine.createSpy();
  const mockOnDismiss = jasmine.createSpy();
  render(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={notifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );
  userEvent.click(screen.getByLabelText(/close/i));
  expect(mockOnClose).toHaveBeenCalled();
});

it('should not render other severity levels when a particular level is selected', () => {
  const mockOnClose = jasmine.createSpy();
  const mockOnDismiss = jasmine.createSpy();
  render(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={notifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );

  userEvent.paste(screen.getByLabelText('filter-input').childNodes[1] as TargetElement, 'High');

  expect(screen.queryByText('Medium')).toBeNull();
  expect(screen.queryByText('Low')).toBeNull();
});

it('should update rmfNotifications state when props are updated', () => {
  const mockOnClose = jasmine.createSpy();
  const mockOnDismiss = jasmine.createSpy();
  // add one more notification
  const updatedNotifications: Notification[] = [
    ...notifications,
    {
      id: 4,
      time: format(new Date(), 'MM/dd/yyyy HH:mm'),
      error: 'message',
      severity: Severity.Low,
    },
  ];

  const { rerender } = render(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={notifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );
  expect(screen.getAllByText('message').length).toEqual(3);

  rerender(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={updatedNotifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );
  expect(screen.getAllByText('message').length).toEqual(4);
});

it('should call mockOnDismiss when onNotificationsDismiss button is clicked', () => {
  const mockOnClose = jasmine.createSpy();
  const mockOnDismiss = jasmine.createSpy();
  render(
    <NotificationsDialog
      onClose={mockOnClose}
      showNotificationsDialog={true}
      notifications={notifications}
      onNotificationsDismiss={mockOnDismiss}
    />,
  );
  userEvent.click(screen.getAllByLabelText('dismiss-button')[0]);
  expect(mockOnDismiss).toHaveBeenCalled();
});
