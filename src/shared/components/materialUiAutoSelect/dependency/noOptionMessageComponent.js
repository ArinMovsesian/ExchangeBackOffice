import React from 'react';
import Typography from '@material-ui/core/Typography';
function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        نتیجه جستجو یافت نشد
      </Typography>
    );
  }
  export default NoOptionsMessage;
