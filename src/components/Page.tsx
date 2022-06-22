/* eslint-disable react/display-name */
/* eslint-disable no-undef */

import { makeStyles } from '@mui/styles';
import { forwardRef } from 'react';
import * as React from 'react';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme: any) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3)
    // paddingTop: theme.spacing(3)
  }
}));

type Ref = HTMLDivElement;
interface PageProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Page = forwardRef<Ref, PageProps>(
  ({ children, title, className, ...rest }, ref): JSX.Element => {
    const classes = useStyles();
    return (
      <div className={clsx(classes.root, className)} ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default Page;
