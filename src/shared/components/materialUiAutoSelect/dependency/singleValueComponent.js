import Typography from '@material-ui/core/Typography';
import React from 'react';
function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
      export default SingleValue;