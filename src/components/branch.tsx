import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FieldError } from 'react-hook-form';

const branch = [
  'Arcades Branch',
  'Chingola Branch',
  'Chipata Branch',
  'Choma Branch',
  'Cosmopolitan Mall Branch',
  'East Park Mall Branch',
  'Industrial Branch',
  'Kabwata Branch',
  'Kabulonga Branch',
  'Kabwe Branch',
  'Kafubu Mall',
  'Kafue Branch',
  'Kitwe Main',
  'Livingstone Branch',
  'Lusaka Main',
  'Head Office',
  'Lumwana Branch',
  'Manda Hill Branch',
  'Matero Branch',
  'Mazabuka Branch',
  'Mufulira Branch',
  'Mkushi Branch',
  'Mukuba Mall Branch',
  'Ndola Main',
  'Private Banking Suite - Head Office',
  'Private Banking Suite - Quorum',
  'Solwezi Branch',
  'Woodlands Branch',
  'Waterfalls Branch'
];
export default branch;

interface BranchAutocompleteProps<T> {
  options: T[];
  error?: FieldError;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string | null) => void;
  // eslint-disable-next-line no-unused-vars
  getOptionLabel: (option: T) => string;
  label: string;
}

export function BranchAutocomplete<T>({
  options,
  getOptionLabel,
  onChange,
  label,
  error
}: BranchAutocompleteProps<T>) {
  return (
    <Autocomplete
      disablePortal
      size="small"
      fullWidth
      onChange={(event, value) => {
        // @ts-ignore
        onChange(value);
      }}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          error={error && Boolean(error.message)}
          name="branch"
          margin="normal"
          helperText={error?.message}
          {...params}
          label={label}
        />
      )}
    />
  );
}
