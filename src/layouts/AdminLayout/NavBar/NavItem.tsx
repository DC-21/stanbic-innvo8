/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-key */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemIcon, ListItemText } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { v4 as uuid } from 'uuid';
// @ts-ignore
import CustomLink from '../../CustomLink';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'transparent'
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  arrow: { marginLeft: theme.spacing(2) },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));
export interface NavItemProps {
  href: string;
  icon: any;
  title: string;
  nestedItems?: NavItemProps[];
}
interface Props {
  items: NavItemProps[];
  className?: string;
}
const NavItem: React.FunctionComponent<Props> = ({ items, className }) => {
  console.log(className);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState<null | number>(null);

  const handleClickIndex = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      setSelectedIndex(index);
    }
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {items.map(({ title, icon: Icon, nestedItems, href }, index: any) => (
        <>
          <CustomLink
            key={uuid()}
            index={index}
            nestedItems={nestedItems}
            handleClickIndex={handleClickIndex}
            to={href}
          >
            <ListItemIcon>
              {/* @ts-ignore */}
              <Icon />
            </ListItemIcon>
            <ListItemText primary={title} />
            {nestedItems ? (
              index === selectedIndex ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )
            ) : null}
          </CustomLink>
          {nestedItems
            ? nestedItems.map((item) => (
                <Collapse
                  in={index === selectedIndex}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <CustomLink
                      handleClickIndex={handleClickIndex}
                      index={index}
                      className={classes.nested}
                      to={item.href}
                    >
                      <ListItemIcon style={{ marginLeft: '20px' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.title} />
                    </CustomLink>
                  </List>
                </Collapse>
              ))
            : null}
        </>
      ))}
    </List>
  );
};
export default NavItem;
