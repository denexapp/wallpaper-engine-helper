import { Typography } from '@material-ui/core';
import React from 'react';
import styles from './styles.module.css';

const Title: React.FC = (props) => {
  const { children } = props;

  return (
    <div className={styles.title}>
      <Typography variant="h5">{children}</Typography>
    </div>
  );
};

export default Title;
