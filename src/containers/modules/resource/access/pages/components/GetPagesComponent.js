import React from 'react';
import Paper from '@material-ui/core/Paper';
import Header from 'shared/components/stateHeader/stateHeader';
import Grid from '@material-ui/core/Grid';
import Input from 'shared/components/formInput/inputForm';
import { GridServer } from '../../../../../../shared/components/kendoGrid/kendoGrid';
import GetPagesService from '../services/GetPagesService';
import styles from '../../../../../layout/panel/theme';
import { withStyles } from '@material-ui/core/styles';
import Columns from '../constants/GetPagesColumns'
import '../../menus/components/Menu.css';

class GetPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "",
            sort: [
                {
                    field: "pageTitle",
                    dir: "asc"
                }
            ]
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    };

    handleChangeTitle(item) {
        this.setState({ 
            pageTitle: item.value 
        });
    };


    render() {
        return (
            <React.Fragment>
                <Header {...this.props} />
                <Paper className={"main-paper-container menu-page "} >
                <GridServer
                    reportFilter={{
                        pageTitle : this.state.pageTitle
                    }}
                    service={GetPagesService.getAllPageResources}
                    Columns={Columns}
                    sort={this.state.sort}
                    classHeightOpenPanel={"height-open-grid"}
                >
                    <div classPage={"height-search"}>
                        <Grid container spacing={8} className="m-0">
                            <Grid item md={4} className="padding-right-10">
                                <Input label="عنوان صفحه" handleChange={this.handleChangeTitle} value={this.state.pageTitle} />
                            </Grid>
                        </Grid>
                    </div>
                </GridServer>
                </Paper>
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(GetPages);;