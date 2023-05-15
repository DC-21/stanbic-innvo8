import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import UserList from '../users/components/UserList';
import TeamMemberList from '../teams/components/TeamMember/TeamMemberList';
import Page from '../../../components/Page';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function BasicTabs() {
  const [searchParams, setSearchParams] = useSearchParams({ index: '0' });
  const value = parseInt(searchParams.get('index') || '0', 10);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSearchParams({ index: newValue.toString() });
  };

  return (
    <Page title="Users">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="User Management"
          >
            <Tab label="Users" {...a11yProps(0)} />
            <Tab label="Team Members" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <UserList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TeamMemberList />
        </TabPanel>
      </Box>
    </Page>
  );
}
