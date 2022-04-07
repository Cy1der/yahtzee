import React from 'react';
import { TextInput, TextInputProps } from '@mantine/core';

export default function EmailTextField({ classes }: { classes?: TextInputProps }) {
  return (
    <TextInput
      label="Email"
      type="email"
      {...classes}
    />
  );
}