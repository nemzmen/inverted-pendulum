import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';


export const AlertComponent = ({
  severity = defaultProps.severity,
  title = defaultProps.title,
  description = defaultProps.description,
  strongDescription = defaultProps.strongDescription,
}) => {
  return (
    <div className='absolute-center'>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        {description}<strong>{strongDescription}</strong>
      </Alert>
    </div>
  );
};

const defaultProps = {
  severity: 'warning',
  title: 'Title',
  description: 'Description - ',
  strongDescription: 'strong!',
};

export default AlertComponent;