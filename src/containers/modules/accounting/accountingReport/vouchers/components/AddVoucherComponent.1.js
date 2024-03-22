import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Form from '../../../../../../shared/components/form/form';
import AddVouchersService from '../services/AddVouchersService';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import Button from '@material-ui/core/Button';
import { detailLedgerTemplate, detailLedgerHeaderTemplate } from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../../accountingBase/detailLedger/services/GetDetailLedgerService';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Input from 'shared/components/formInput/inputForm'

import { GridCell } from '@progress/kendo-react-grid';



export class DragCell extends React.Component {
  render() {
    return (
      <td onDragOver={() => { DragCell.reorder(this.props.dataItem); }}>
        <span
          className="k-icon k-i-reorder"
          draggable="true"
          style={{ cursor: "move" }}
          onDragStart={(e) => {
            DragCell.dragStart(this.props.dataItem);
            e.dataTransfer.setData("dragging", "");
          }}
        >
        </span>
      </td>
    );
  }
}
export class CreateVoucher extends React.Component {
  constructor(props) {
    super(props)


    this.state = {
      activeItem: null,
      data: [
        { inEdit: false, id: 1, detailLedger: { detailLedgerCode: '100001', detailLedgerTitle: 'احمدی', subsidiaryLedgerTitle: 'کریم' }, description: "شرح", debit: 1578931, credit: 543721 },
        { inEdit: false, id: 2, detailLedger: { detailLedgerCode: '100002', detailLedgerTitle: 'احمدی', subsidiaryLedgerTitle: 'کریم' }, description: "شرح", debit: 1578931, credit: 543721 },

      ],
      dataItem:{
        credit:0,
        debit:0,
        description:'',
        detailLedger: { detailLedgerCode: '', detailLedgerTitle: '', subsidiaryLedgerTitle: '' }

      }
    };

    this.enterInsert = this.enterInsert.bind(this);
    this.itemChange = this.itemChange.bind(this);

    this.enterEdit = this.enterEdit.bind(this);
   this.save = this.save.bind(this);
   this.cancel = this.cancel.bind(this);
   this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.getCredit = this.getCredit.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getDebit = this.getDebit.bind(this);
    this.pureData = this.pureData.bind(this);
    this.commandCell = this.commandCell.bind(this);
    this.getDetailLedger = this.getDetailLedger.bind(this);
    DragCell.reorder = this.reorder.bind(this);
    DragCell.dragStart = this.dragStart.bind(this);
  }

  reorder(dataItem) {
    if (this.state.activeItem === dataItem) {
      return;
    }
    let reorderedData = this.state.data.slice();
    let prevIndex = reorderedData.findIndex(p => (p === this.state.activeItem));
    let nextIndex = reorderedData.findIndex(p => (p === dataItem));
    reorderedData.splice(prevIndex, 1);
    reorderedData.splice(nextIndex, 0, this.state.activeItem);

    this.setState({
      data: reorderedData,
      active: this.state.activeItem
    });
  }

  dragStart(dataItem) {
    this.setState({
      data: this.state.data,
      activeItem: dataItem
    });
  }
  commandCell = (event) => {
    console.log("event", event)
    return <td>   <button
      className="k-primary k-button k-grid-edit-command"
      onClick={(e) => this.edit(e, event)}>
      ویرایش
</button>
      {/* <button
        className="k-danger k-button k-grid-edit-command"
        onClick={(event) => this.edit(event.dataItem)}>
        حذف
</button> */}
    </td>
  }

  pureData(data){
  
    data= data.map(d=>{
      d.inEdit=false
    return d
    });
    return data;
  }

  enterInsert(e) {
    e.preventDefault();
    const dataItem ={
      inEdit:true,
      credit:0,
      debit:0,
      description:'',
      detailLedger: { detailLedgerCode: '', detailLedgerTitle: '', subsidiaryLedgerTitle: '' }

    };
    let data =this.pureData(this.state.data)
    data.push(dataItem)
   
    this.setState({
      data: data
    });
  }

  enterEdit(dataItem) {
    this.update(this.state.data, dataItem).inEdit = true;
    this.setState({
      data: this.state.data.slice()
    });
  }

  save(dataItem) {
    dataItem.inEdit = undefined;
    dataItem.ProductID = this.update(this.state.data, dataItem).ProductID;
    this.setState({
      data: this.state.data.slice()
    });
  }

  cancel(dataItem) {
    if (dataItem.ProductID) {
      let originalItem = this.state.data.find(p => p.ProductID === dataItem.ProductID);
      this.update(this.state.data, originalItem);
    } else {
      this.update(this.state.data, dataItem, !dataItem.ProductID);
    }
    // this.setState({
    this.state.data = this.state.data.slice()
    // });
  }

  remove(dataItem) {
    dataItem.inEdit = undefined;
    this.update(this.state.data, dataItem, true);
    this.update(this.state.data, dataItem, true);
    this.setState({
      data: this.state.data.slice()
    });
  }

  itemChange(event) {
    const value = event.value;
    const name = event.field;
    if (!name) {
      return;
    }
    const updatedData = this.state.data.slice();
    const item = this.update(updatedData, event.dataItem);
    item[name] = value;
    this.setState({
      data: updatedData
    });
  }

  update(data, item, remove) {
    let updated;
    let index = data.findIndex(p => p === item || item.ProductID && p.ProductID === item.ProductID);
    if (index >= 0) {
      updated = Object.assign({}, item);
      data[index] = updated;
    } else {
      let id = 1;
      data.forEach(p => { id = Math.max(p.ProductID + 1, id); });
      updated = Object.assign({}, item, { ProductID: id });
      data.unshift(updated);
      index = 0;
    }

    if (remove) {
      data = data.splice(index, 1);
    }

    return data[index];
  }
  handleChangeAutoComplete(value){

  }
  handleChange(value){

  }
  getDetailLedger(event) {

    return <td>

      {event.dataItem.inEdit ? <div className="k-rtl">
        <AutoCompleteComponent
          handleChange={(value) => this.handleChangeAutoComplete(value)}
          headerTemplate={detailLedgerHeaderTemplate}
          template={detailLedgerTemplate}
          fieldSearch={"searchPhrase"}
          // label="کد حساب"
          field="fullTitle"

          value={this.state.dataItem.detailLedger.detailLedgerTitle}
          placeholder="کد حسساب یا کد تفصیل را وارد کنید"
          service={GetDetailLedgerService.getNormalDetailedgerAndSubsidiaryLedgerBalanceSheet} />
      </div> :
        <b>{event.dataItem.detailLedger.detailLedgerCode}</b>}

    </td>
  }
  getDescription(event) {
    return <td>

      {event.dataItem.inEdit ?
        <Input label="توضیحات" required handleChange={(e) => this.handleChange(e, 'description')} id="description" value={this.state.dataItem.description} />
        :
        <b>{event.dataItem.description}</b>}

    </td>

  }


 
  getDebit(event) {
    return <td>

      {event.dataItem.inEdit ?
        <Input label="بدهکار" required handleChange={(e) => this.handleChange(e, 'debit')} id="debit" value={this.state.dataItem.debit} />
        :
        <b>{event.dataItem.debit}</b>}

    </td>

  }

  
  getCredit(event) {
    return <td>

    {event.dataItem.inEdit ?
      <Input label="بستانکار" required handleChange={(e) => this.handleChange(e, 'credit')} id="credit" value={this.state.dataItem.credit} />
      :
      <b>{event.dataItem.credit}</b>}

  </td>



  }
  edit(e, event) {
    e.preventDefault();
    let data = this.pureData(this.state.data);
    console.log("dataItem",data)
   
    let dataItem = data.filter(d => d.id === event.dataItem.id)[0];
    dataItem.inEdit = true;
    data[data.indexOf(dataItem)].inEdit = true;
    this.setState({ data: data,dataItem:dataItem })

  }
  render() {
    return (
      <React.Fragment>
        <Header {...this.props} />
        <Form
          {...this.props}
          {...this.state}
          service={AddVouchersService}
        >
          <div>
            <Grid
              style={{ height: '420px' }}
              data={this.state.data}
              onItemChange={this.itemChange}

            >
              <GridToolbar>
                <button
                  title="افزودن سند"
                  className="k-button k-success"
                  onClick={this.enterInsert}
                >اضافه کردن سند
                        </button>


              </GridToolbar>
              <Column field="voucherNumber" cell={DragCell} title="شماره ردیف سند" width="50px" />
              <Column field="detailLedger.detailLedgerCode" title="کد حساب" cell={this.getDetailLedger} />
              <Column field="detailLedger.detailLedgerTitle" title="عنوان حساب" />
              <Column field="detailLedger.subsidiaryLedgerTitle" title="عنوان حساب معین" width="150px" />
              <Column field="description" title="شرح" cell={this.getDescription} />
              <Column field="debit" cell={this.getDebit} title="بدهکار" />
              <Column field="credit" cell={this.getCredit} title="بستانکار" />
              <Column cell={this.commandCell} width="150px" title="عملیات" />
            </Grid>
          </div>
        </Form>

      </React.Fragment>

    )
  }
}

