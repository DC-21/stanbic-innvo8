import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';
import ThemesList from '../ThemesList';
import DeactivatedThemesList from '../DeactivatedThemesList';

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

export default function Applications() {
  const [searchParams, setSearchParams] = useSearchParams({ index: '0' });
  const value = parseInt(searchParams.get('index') || '0', 10);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSearchParams({ index: newValue.toString() });
  };

  return (
    <Box sx={{ width: '100%', paading: '10px' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="Theme">
          <Tab label="Active Themes" {...a11yProps(0)} />
          <Tab label="Deactivated Themes" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ThemesList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeactivatedThemesList />
      </TabPanel>
    </Box>
  );
}
