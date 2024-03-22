import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import WrapperPaper from 'shared/components/mainPaper/wrapperPaper';
import classNames from 'classnames';
import Input from 'shared/components/formInput/inputForm'
import Email from 'shared/components/email/email'
import Header from 'shared/components/stateHeader/stateHeader'
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes, { func } from 'prop-types';
import styles from '../../../../../layout/panel/theme'
import DropDownComponent from 'shared/components/dropDown/dropDown';
import Form from 'shared/components/form/pureForm';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './BidAndAskComponent.css'
class BidAndAskComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      },
      {
        BestBuyPrice: 5012,
        BestBuyQuantity: 121156,
        BestSellPrice: 5730,
        BestSellQuantity: 10000,
        NoBestBuy: 21,
        NoBestSell: 1
      }]
    }




  }
  render() {
    return (
      <React.Fragment>
        
        <Table >
          <TableHead>
            <TableRow style={{ height: 31 }}>
              <TableCell style={{padding:0}} >تعداد</TableCell>
              <TableCell style={{padding:0}} >حجم</TableCell>
              <TableCell style={{padding:0, color: 'blue' }}>خرید</TableCell>
              <TableCell style={{padding:0, color: 'red' }}>فروش</TableCell>
              <TableCell style={{padding:0}} >حجم</TableCell>
              <TableCell style={{padding:0,width:40}} >تعداد</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{padding:0}}>
            {this.state.list.map(item => (
              <TableRow style={{ height: 31,padding:0}}>



                <TableCell style={{padding:0}} >{item.NoBestBuy}</TableCell>
                <TableCell style={{padding:0}} >{item.BestBuyQuantity}</TableCell>
                <TableCell style={{padding:0}} >{item.BestBuyPrice}</TableCell>
                <TableCell style={{padding:0}} >{item.BestSellPrice}</TableCell>
                <TableCell style={{padding:0}} >{item.BestSellQuantity}</TableCell>
                <TableCell style={{padding:0}} >{item.NoBestSell}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(BidAndAskComponent);
