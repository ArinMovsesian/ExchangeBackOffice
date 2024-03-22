import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import styles from 'containers/layout/panel/theme';
import { th } from 'date-fns/esm/locale';

class EditButtonComponents extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
    }

    edit() {
      
        if (this.props.routeEdit) {
            this.props.history.push(
                {
                    pathname: this.props.routeEdit.path,
                    state: this.props.sateParams
                }
            )
        } else {
            this.props.history.push(
                {
                    pathname: this.props.edit.path,
                    state: this.props.sateParams
                }
            )
        }

    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <td>
                    <Button size="small"  color="primary" className={classNames(classes.margin, classes.btnEdit,"btn-td")}  onClick={this.edit}>
                        <FaIcon name="fas fa-edit" size={15} />
                    </Button>
                </td>
            </React.Fragment>
        )
    }
}
const Edit = withStyles(styles)(EditButtonComponents);

export default Edit;