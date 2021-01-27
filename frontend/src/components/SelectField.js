import React from 'react';
import {TextField} from '@material-ui/core';


const SelectField = ({
  error = defaultProps.error,
  disabled = defaultProps.disabled,
  label = defaultProps.label,
  value = defaultProps.value,
  helperText = defaultProps.helperText,
  currencies = defaultProps.currencies,
  onChange = defaultProps.onChange,
}) => {
  return (
    <div className='margin-12 button-background'>
      <TextField
        select
        fullWidth
        variant='outlined'
        error={error}
        disabled={disabled}
        label={label}
        value={value}
        helperText={helperText}
        SelectProps={{native: true}}
        onChange={onChange}
      >
        {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </div>
  );
};

const defaultProps = {
  error: false,
  disabled: false,
  label: 'Select',
  value: '',
  helperText: '',
  currencies: [{value: '1', label: 'option 1'}, {value: '2', label: 'option 2'}],
  onChange: () => {},
};

export default SelectField;