import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
      },
      input: {
        display: 'flex',
        padding: 0,
      },
      valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
      },
      chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
      },
      chipFocused: {
        backgroundColor: emphasize(
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
          0.08,
        ),
      },
      noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
      },
      singleValue: {
        fontSize: 16,
      },
      placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
      },
      paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
      },
      divider: {
        height: theme.spacing.unit * 2,
      }
    }


    );
        export default styles;