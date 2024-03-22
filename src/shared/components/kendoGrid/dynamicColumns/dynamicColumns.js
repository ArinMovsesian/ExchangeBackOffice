import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import FaIcon from 'shared/components/Icon/Icon';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import {CustomColumnMenu} from 'shared/components/kendoGrid/kendoGrid';



class ColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onColumnsSubmit=this.onColumnsSubmit.bind(this);
    }
    componentDidMount(){
  
      }
    onColumnsSubmit = (columnsState) => {
        this.setState({
            columns: columnsState
        });
    }
    render() {
          console.log(this.props)
        return  (
            <React.Fragment> 
             { this.props.columns.map((column) =>
                     
                     column.isFixed ?
                     (
                         ! column.dynamicColumn ?
                         <Column
                             key={column.id}
                             field={column.field}
                             title={column.title}
                             className={column.class}
                             width={column.width}
                         
                         />
                         : <Column
                         key={column.id}
                         title={column.title}
                         width={column.width}
                         cell={(e)=>column.cell(e)}
                         
                     />):
                     column.show && (
                     ! column.dynamicColumn ?
                         <Column
                             key={column.id}
                             field={column.field}
                             title={column.title}
                             className={column.class}
                             width={column.width}
                             columnMenu={
                                 props =>
                                     <CustomColumnMenu {...props}
                                         columns={this.state.columns}
                                         onColumnsSubmit={this.onColumnsSubmit}
                                     />
             
                             }
                         />
                         : <Column
                         key={column.id}
                         title={column.title}
                         width={column.width}
                         cell={(e)=>column.cell(e)}
                         columnMenu={
                             props =>
                                 <CustomColumnMenu {...props}
                                     columns={this.state.columns}
                                     onColumnsSubmit={this.onColumnsSubmit}
                                 />
                         }
                         />
                        
                     ))}
                        
                        

        
            </React.Fragment> 
            
            )
    }
}
export default ColumnComponent;
