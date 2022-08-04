import {
  List,
  Box,
  ListItemText,
  ListItem,
  ListItemButton,
  Divider
} from '@mui/material';
import React from 'react';
import Login from './login';

interface DrawerProps {
  setMobileNavOpen: any;
}

function DrawerComponent({ setMobileNavOpen }: DrawerProps) {
  return (
    <Box onClick={() => setMobileNavOpen((state) => !state)}>
      <List>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Menu" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Eligibility Criteria" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary=" Benefits" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Stages" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary=" FAQ" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary="Contacts" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText>
              <Login />
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default DrawerComponent;
