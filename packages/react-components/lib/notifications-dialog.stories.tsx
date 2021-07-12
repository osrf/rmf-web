import { Button } from '@material-ui/core';
import { Meta, Story } from '@storybook/react';
import { format } from 'date-fns';
import React from 'react';
import { Notification, NotificationsDialog, Severity } from './notifications-dialog';

export default {
  title: 'Notifications Dialogue',
  component: NotificationsDialog,
} as Meta;

interface NotificationDialogHandlerProps {
  notifications: Notification[];
}

// temp data for display
const getDate = () => {
  return format(new Date(), 'MMM dd yyyy, h:mm:ss aaa');
};

const makeNotifications = (): Notification[] => {
  return [
    {
      id: 1,
      time: getDate(),
      error: 'coke_ingestor not sending states',
      severity: Severity.High,
    },
    {
      id: 2,
      time: getDate(),
      error: 'Lift is on fire',
      severity: Severity.High,
    },
    {
      id: 3,
      time: getDate(),
      error: 'Trajectory conflict with robot B and robot C',
      severity: Severity.Medium,
    },
    {
      id: 4,
      time: getDate(),
      error: 'Trajectory conflict with robot B and robot C',
      severity: Severity.Medium,
    },
    {
      id: 5,
      time: getDate(),
      error: 'Trajectory conflict with robot B and robot C',
      severity: Severity.Medium,
    },
    {
      id: 6,
      time: getDate(),
      error: 'Robot D not moving for over 10 seconds',
      severity: Severity.Low,
    },
    {
      id: 7,
      time: getDate(),
      error: 'Lift is offline',
      severity: Severity.Low,
    },
  ];
};

const NotificationDialogHandler = (props: NotificationDialogHandlerProps): JSX.Element => {
  const { notifications } = props;
  const [showDialogBox, setShowDialogBox] = React.useState(false);
  const [allNotifications, setAllNotifications] = React.useState(notifications);

  const handleDismissNotification = (id: number) => {
    const filteredNotifications = allNotifications.filter((n) => n.id !== id);
    setAllNotifications(filteredNotifications);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setShowDialogBox(true)}>
        Open Notificatins Dialog box
      </Button>
      <NotificationsDialog
        notifications={allNotifications}
        showNotificationsDialog={showDialogBox}
        onClose={() => setShowDialogBox(false)}
        onNotificationsDismiss={handleDismissNotification}
      />
    </>
  );
};

export const NotificationsDialogDisplay: Story = () => {
  return (
    <>
      <NotificationDialogHandler notifications={makeNotifications()} />
    </>
  );
};
