import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

export interface PositiveIntField
  extends Omit<TextFieldProps, 'type' | 'value' | 'inputProps' | 'onChange'> {
  value?: number;
  onChange?(ev: React.ChangeEvent, int: number): void;
}

export function PositiveIntField({ value = 0, onChange, ...props }: PositiveIntField): JSX.Element {
  const [valueInput, setValueInput] = React.useState(value.toString());

  React.useEffect(() => {
    setValueInput(value.toString());
  }, [value]);

  return (
    <TextField
      {...props}
      type="number"
      value={valueInput}
      inputProps={{ min: 0 }}
      onKeyDown={(ev) => {
        if ('-+.'.indexOf(ev.key) >= 0) {
          ev.preventDefault();
        }
        props.onKeyDown && props.onKeyDown(ev);
      }}
      onChange={(ev) => {
        const int = parseInt(ev.target.value);
        if (int > 0) {
          onChange && onChange(ev, int);
        }
        setValueInput(ev.target.value);
      }}
    />
  );
}
