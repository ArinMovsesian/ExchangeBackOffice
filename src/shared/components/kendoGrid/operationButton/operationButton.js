import React from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';
import css from './operationButton.css';
import { connect } from "react-redux";
import { setDelete } from 'store/actions';
import toastr from 'toastr';
import MenuPopupState from '../../../menuePropsState/menuePropsState';
class OperationButton extends React.Component {
    state = {

    };
    constructor(props) {
        super(props);
        console.log("prooop")

    }


    render() {

        return (
            <React.Fragment>
                <td>
                    <MenuPopupState name="more" icon="fas fa-ellipsis-h">*/}
                   {this.props.children}
                    </MenuPopupState>
                </td>


            </React.Fragment>
        )
    }
}


export default withStyles(styles)(OperationButton);

