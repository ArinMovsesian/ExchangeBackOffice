import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FaIcon from '../Icon/Icon'
import '../../../utils/fonts/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';


class CheckBoxList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            list: this.props.list,
            reload: 0
        };
        this.handleChangeCheck = this.handleChangeCheck.bind(this)

    }
    componentDidMount() {
        this.setState({ reload: 1 });
    }

    componentDidUpdate(prevProp, prevState) {


        if (prevState.reload !== this.state.reload) {
            let list = this.state.list.map(l => {
                l.checked = false;

                this.state.value.map(v => {
                    if (l.code == v)
                        l.checked = true;
                })
                return l;
            })
            this.setState({ list: list })


        }
        if (prevProp.value !== this.props.value || prevProp.list !== this.props.list) {

            let list = [];
            this.props.value.map(v => {
                list = this.props.list.map(item => {
                    if (item[this.props.field] === v) {
                        item.checked = true;
                        return item;
                    }
                })
            })

            // if (this.props.value.length < 1)
            list = this.props.list;
            this.setState({ value: this.props.value, list: list });

        }
    }
    handleChangeCheck(e, name, code, index) {
        let list = this.state.list;
        list[index].checked = !list[index].checked
        let value = this.state.value;
        if (value.indexOf(Number(e.target.value)) < 0) {
            value.push(code);

        }
        else {
            let index = value.indexOf(Number(code));
            if (index >= 0)
                value.splice(index, 1);
        }

        this.setState({ list: list, value: value }, function () {
            this.props.handleChange({ value: this.state.value }, this.props.name);

        });
    }
    render() {

        return (
            <React.Fragment>

                {this.state.list.map((item, index) =>
                    <Grid item md={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={item.checked === true}
                                    onChange={(e) => this.handleChangeCheck(e, item[this.props.displayField], item[this.props.submitField], index)}
                                    value={item.code}
                                    color="primary"
                                />
                            }
                            label={item.title}
                        />
                    </Grid>









                )}
            </React.Fragment>


        )
    }

};
CheckBoxList.defaultProps = {
    displayField: 'title',
    submitField: 'code'
}
export default CheckBoxList