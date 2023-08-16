import * as React from 'react';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useSetRecoilState } from 'recoil';
import {typeuser} from '../atoms/typeuser'

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();
  const setTypeUser = useSetRecoilState(typeuser);

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
    if(checked){setTypeUser(radioGroup.value)}
  }

  return <StyledFormControlLabel checked={checked} {...props}/>;
}

export default function UserAdmin() {
  return (
    <RadioGroup row>
      <MyFormControlLabel value="user" label="Student" control={<Radio />} />
      <pre>           </pre>
      <MyFormControlLabel value="admin" label="Educator" control={<Radio />} />
    </RadioGroup>
  );
}
