import { Typography } from '@material-ui/core';
import React from 'react';
import styles from './styles.module.css';

interface SubheaderProps {
  icon?: React.ReactNode;
}

const Subheader: React.FC<SubheaderProps> = (props) => {
  const { children, icon } = props;

  return (
    <div className={styles.subheader}>
      <Typography variant="h6">{children}</Typography>
      {icon}
    </div>
  );
};

export default Subheader;
