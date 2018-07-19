import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const decorate = withStyles(() => ({
  center: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

interface Props {
  loading: boolean,
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
}

enum sizes {
  xxs = 20,
  xs = 30,
  s = 40,
  m = 50,
  l = 60,
  xl = 70,
  xxl = 80
}

const Spinner = decorate<Props>(({ loading, size, classes }) => {
  const sizeNumber = size ? sizes[size] : sizes.m;
  return (
    loading
      ?
      (
        <div className={classes.center}>
          <CircularProgress
            size={sizeNumber}
          />
        </div>
      )
      : null
  );
});

export default Spinner;
