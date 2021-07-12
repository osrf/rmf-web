import { createStyles, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TabContext from '@material-ui/lab/TabContext';
import TabPanel from '@material-ui/lab/TabPanel';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { HeaderBar } from '../lib/header-bar';
import { LogoButton } from './logo-button';
import { NavigationBar } from './navigation-bar';

export default {
  title: 'Header Bar',
  component: HeaderBar,
} as Meta;

export const NavBar: Story = () => {
  const [value, setValue] = React.useState('building');

  const onTabChange = (event: React.ChangeEvent<unknown>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <HeaderBar>
          <NavigationBar onTabChange={onTabChange} value={value}>
            <Tab
              key={'building-tab'}
              label={'Building'}
              value={'building'}
              aria-label={`building-tab`}
            />
            <Tab key={'robots'} label={'Robots'} value={'robots'} aria-label={`building-tab`} />
          </NavigationBar>
        </HeaderBar>
        <TabPanel key={'building-panel'} value={'building'}>
          <Typography variant="caption">tab panel data</Typography>
        </TabPanel>
        <TabPanel key={'robots-panel'} value={'robots'}>
          <Typography variant="caption">other tab panel data</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
};

export const FullHeaderBar: Story = () => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      toolbar: {
        textAlign: 'right',
        flexGrow: -1,
      },
      avatar: {
        flexGrow: 1,
        minWidth: theme.spacing(16),
        overflow: 'auto',
      },
      logo: {
        maxWidth: 120,
        opacity: 1,
      },
    }),
  );
  const [value, setValue] = React.useState('building');
  const classes = useStyles();

  const onTabChange = (event: React.ChangeEvent<unknown>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value}>
        <HeaderBar>
          <LogoButton logoPath="/assets/roshealth-logo-white.png" />
          <NavigationBar onTabChange={onTabChange} value={value}>
            <Tab key="building-tab" label="Building" value="building" aria-label="building-tab" />
            <Tab key={'robots'} label={'Robots'} value={'robots'} aria-label={`building-tab`} />
          </NavigationBar>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="caption">Powered by OpenRMF</Typography>
            <IconButton id="user-btn" aria-label={'user-btn'} color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </HeaderBar>
        <TabPanel key={'building-panel'} value={'building'}>
          <Typography variant="caption">tab panel data</Typography>
        </TabPanel>
        <TabPanel key={'robots-panel'} value={'robots'}>
          <Typography variant="caption">other tab panel data</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
};
