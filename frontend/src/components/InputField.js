import React from 'react';
import {TextField} from '@material-ui/core';


export const InputField = ({
  error = defaultProps.error,
  disabled = defaultProps.disabled,
  label = defaultProps.label,
  value = defaultProps.value,
  helperText = defaultProps.helperText,
  placeholder = defaultProps.placeholder,
  onChange = defaultProps.onChange,
}) => {
  return (
    <div className='margin-12 button-background'>
      <TextField
        fullWidth
        variant='outlined'
        error={error}
        disabled={disabled}
        label={label}
        value={value}
        helperText={helperText}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

const defaultProps = {
  error: false,
  disabled: false,
  label: 'Text',
  value: '',
  helperText: '',
  placeholder: '',
  onChange: () => {},
};

export default InputField;