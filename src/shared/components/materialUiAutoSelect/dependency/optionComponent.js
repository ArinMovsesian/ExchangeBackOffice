import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
function Option(props) {
  console.log(props,props)
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        label="title"
      
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
      export default Option;