import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



const BasicTextFields = ({
  classes = useStyles(),
  error = defaultProps.error,
  disabled = defaultProps.disabled,
  label = defaultProps.label,
  value = defaultProps.value,
  helperText = defaultProps.helperText,
  placeholder = defaultProps.placeholder,
  onChange = defaultProps.onChange,
}) => {
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField


      size='small'
        variant='outlined'

        error={error}
        disabled={disabled}
        label={label}
        value={value}
        helperText={helperText}
        placeholder={placeholder}
        onChange={onChange}
      />
      <TextField


      size='small'
        variant='outlined'

        error={error}
        disabled={disabled}
        label={label}
        value={value}
        helperText={helperText}
        placeholder={placeholder}
        onChange={onChange}
      />
    </form>
  );
}

const defaultProps = {
  error: false,
  disabled: false,
  value: '',
  helperText: '',
  currencies: [{value: '1', label: 'option 1'}, {value: '2', label: 'option 2'}],
  onChange: () => {},
};
export default BasicTextFields;