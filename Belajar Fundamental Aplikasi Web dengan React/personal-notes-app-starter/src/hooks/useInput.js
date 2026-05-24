import React from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = React.useState(defaultValue);

  const onValueChange = (event) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue(defaultValue);
  };

  return [value, onValueChange, setValue, resetValue];
}

export default useInput;