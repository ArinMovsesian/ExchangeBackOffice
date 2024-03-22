import React from 'react';
import Header from 'shared/components/stateHeader/stateHeader'
import Form from '../../../../../../shared/components/form/form';
import AddVouchersService from '../services/AddVouchersService';
import { Grid as KendoGrid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import Button from '@material-ui/core/Button';
import { getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetTemplate, getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetHeaderTemplate, costCenterHeaderTemplate, costCenterTemplate } from '../../../../../../constants/autoCompleteTemplate';
import GetDetailLedgerService from '../../../accountingBase/detailLedger/services/GetDetailLedgerService';
import AutoCompleteComponent from 'shared/components/dropDown/autocomplete';
import Input from 'shared/components/formInput/inputForm'
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import toastr from 'toastr';
import { HotKeys } from "react-hotkeys";
import Grid from '@material-ui/core/Grid';
import PersianDatePicker from "shared/components/persianDatePicker/imrcDatePicker";
import ComboBoxComponent from 'shared/components/dropDown/comboBox/comboBox';
import DropDownComponent from 'shared/components/dropDown/dropDown';
import DropDownListDataProvider from "core/dropDownListDataProvider";

import GetEnum from 'services/getEnum'
import GetVoucherTypeService from '../../../accountingBase/voucherType/services/GetVoucherTypeService';
import GetVouchersDetailService from '../services/GetVoucherDetailService';
import NumberFormatComponent from 'shared/components/numberFormat/numberFormat';
import GetCostCentersService from '../../../accountingBase/costCenter/services/GetCostCentersService';

import { GridCell } from '@progress/kendo-react-grid';
import FaIcon from 'shared/components/Icon/Icon';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import GetVouchersMasterService from '../services/GetVouchersMasterService';

import faMessages from 'constants/fa.json';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import SearchCostCentersService from '../services/SearchCostCentersService';

loadMessages(faMessages, 'fa-FA');
const keyMap = {
  ADD_NEW: "ctrl+enter",
  DELETE_ROW: 'del',
  EDIT: 'f2',
  ESC: 'esc',
  ENTER: 'enter',
  SUBMIT: 'shift+enter',
  CANCEL: 'f3'

};

export class Renderers {
  constructor(enterEdit, exitEdit, editFieldName) {
    this.enterEdit = enterEdit;


    this.exitEdit = exitEdit;
    this.editFieldName = editFieldName;
    this.editFieldName = editFieldName;

    this.cellRender = this.cellRender.bind(this);
    this.rowRender = this.rowRender.bind(this);

  }



  cellRender(tdElement, cellProps) {
    const dataItem = cellProps.dataItem;
    const field = cellProps.field;
    const additionalProps = (cellProps.dataItem[this.editFieldName] && (cellProps.field === cellProps.dataItem[this.editFieldName])) ?
      {
        ref: (td) => {
          const input = td && td.querySelector('input');
          if (!input || (input === document.activeElement)) { return; }
          if (input.type === 'checkbox') {
            input.focus();
          } else {
            input.select();
          }
        }
      } : {
        onClick: () => { this.enterEdit(dataItem, field); }
      };

    return React.cloneElement(tdElement, { ...tdElement.props, ...additionalProps }, tdElement.props.children);
  }



  rowRender(trElement, dataItem) {
    console.log("ajj",trElement)
    const trProps = {
      ...trElement.props,
      onMouseDown: () => {
        this.preventExit = true;
        clearTimeout(this.preventExitTimeout);
        this.preventExitTimeout = setTimeout(() => { this.preventExit = undefined; });
      },
      onBlur: () => {
        clearTimeout(this.blurTimeout);
        if (!this.preventExit) {
          this.blurTimeout = setTimeout(() => { this.exitEdit(); });
        }
      },
      onFocus: () => { clearTimeout(this.blurTimeout); }
    };

    return React.cloneElement(trElement, { ...trProps }, trElement.props.children);
  }
}
export class DragCell extends React.Component {
  render() {
    return (
      <td onDragOver={() => { DragCell.reorder(this.props.dataItem); }}>
        <span

          draggable="true"
          style={{ cursor: "move" }}
          onDragStart={(e) => {
            DragCell.dragStart(this.props.dataItem);
            e.dataTransfer.setData("dragging", "");
          }}
        >
          {this.props.dataItem.id > 0 ? this.props.dataItem.id : 'ردیف جدید'}
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
      voucherMasterId: this.props.location.state && this.props.location.state.id ? this.props.location.state.id : 0,
      voucherMasterDescription: '',
      voucherMasterDate: new Date(),
      voucherMasternumber: '',
      dailyNumber: '',
      voucherTypeList: {
        name: "voucherType",
        field: "title",
        label: "نوع سند",
        list: [],
        dataItemKey: 'code'
      },
      voucherType: { code: '' },
      voucherStateList: {
        name: "voucherState",
        field: "title",
        label: "وضعیت سند",
        dataItemKey: 'code',
        list: []
      },
      costCenterList: {
        name: "costCenter",
        label: "مرکز هزینه",
        field: "title",
        list: []
      },
      tempDataItem: {
        creditString: 0,
        debitString: 0,
        description: '',
        detailLedgerCode: '',
        costCenterId: 0,
        costCenterTitle: '',
        detailLedgerTitle: '',
        detailLedgerId: 0,
        subsidiaryLedgerTitle: '',
        subsidiaryLedgerCode: '',
        subsidiaryLedgerId: 0,

      },
      voucherState: { code: '' },
      data: [],
      dataItem: {
        creditString: 0,
        debitString: 0,
        description: '',
        detailLedgerCode: '',
        costCenterId: 0,
        costCenterTitle: '',
        detailLedgerTitle: '',
        detailLedgerId: 0,
        subsidiaryLedgerTitle: '',
        subsidiaryLedgerCode: '',
        subsidiaryLedgerId: 0,

      },

      openDeleteModal: false,
      iniDataItem: {
        creditString: 0,
        debitString: 0,
        description: '',
        detailLedgerCode: '',
        costCenterId: 0,
        costCenterTitle: '',
        detailLedgerTitle: '',
        detailLedgerId: 0,
        subsidiaryLedgerTitle: '',
        subsidiaryLedgerCode: '',
        subsidiaryLedgerId: 0,
        id: -1,
        inEdit: true,

      }

    };

    this.enterInsert = this.enterInsert.bind(this);
    this.enterInsertButton = this.enterInsertButton.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.enterEdit = this.enterEdit.bind(this);
    // this.save = this.save.bind(this);
    // this.cancel = this.cancel.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.getCredit = this.getCredit.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getDebit = this.getDebit.bind(this);
    this.deleteByKeyboard = this.deleteByKeyboard.bind(this);
    this.pureData = this.pureData.bind(this);
    this.commandCell = this.commandCell.bind(this);
    this.successSaveDraft = this.successSaveDraft.bind(this);
    this.escapeButton = this.escapeButton.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeVoucherMaster = this.handleChangeVoucherMaster.bind(this);
    this.getVoucherDetailById = this.getVoucherDetailById.bind(this);
    this.successGetVoucherDetail = this.successGetVoucherDetail.bind(this);
    this.getDetailLedger = this.getDetailLedger.bind(this);
    this.enter = this.enter.bind(this);
    DragCell.reorder = this.reorder.bind(this);
    DragCell.dragStart = this.dragStart.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.editByKeyboard = this.editByKeyboard.bind(this);
    this.saveManualVoucher = this.saveManualVoucher.bind(this);
    this.successSaveManualVoucher = this.successSaveManualVoucher.bind(this);
    this.goBack = this.goBack.bind(this);
    this.getCostCenter = this.getCostCenter.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.saveDraft = this.saveDraft.bind(this);
    this.inputKeyDownPress = this.inputKeyDownPress.bind(this);
    this.getVoucherMasterInformation = this.getVoucherMasterInformation.bind(this);
    this.successGetVoucherMasterInformation = this.successGetVoucherMasterInformation.bind(this);
    this.getFromTempDataItem = this.getFromTempDataItem.bind(this);
    this.renderers = new Renderers(this.enterEdit.bind(this), this.exitEdit.bind(this), 'inEdit');



    this.costCenter = this.costCenter.bind(this);
  }

  componentDidMount() {
    this.getVoucherDetailById();
    this.getCostCenter();
    this.getVoucherMasterInformation();
    GetEnum('voucherMasterState', response => DropDownListDataProvider(this, "voucherStateList", response))
    GetVoucherTypeService(null, (response) => DropDownListDataProvider(this, "voucherTypeList", response));


  }
  getCostCenter() {
    GetCostCentersService.getCostCenters(null, (response) => {
      DropDownListDataProvider(this, "costCenterList", response);
    });
  }


  getVoucherMasterInformation() {
    let command = {
      entity: this.state.voucherMasterId
    }
    if (this.state.voucherMasterId !== 0)
      GetVouchersMasterService.getVoucherMasterById(command, this.successGetVoucherMasterInformation)

  }

  successGetVoucherMasterInformation(response) {
    if (response.success) {
      console.log("this.state.voucherStateList", this.state.voucherStateList)
      let description = response.result.description;
      let voucherDate = response.result.voucherDate;
      let voucherStateId = response.result.voucherStateId;
      let voucherStateTitle = response.result.voucherStateEnumTitle;

      let voucherCategoryId = response.result.voucherCategoryId;
      let voucherCategoryTitle = response.result.voucherCategoryTitle;
      this.setState({ voucherMasterDescription: description, voucherMasterDate: voucherDate, voucherType: { code: voucherCategoryId, title: voucherCategoryTitle }, voucherState: { code: voucherStateId, title: voucherStateTitle } })
    }


  }

  getVoucherDetailById() {

    var command = {
      reportFilter: {
        voucherMasterId: this.state.voucherMasterId

      }
    }
    if (this.state.voucherMasterId !== 0)
      GetVouchersDetailService.getVoucherDetailList(command, this.successGetVoucherDetail)
    else {
   
      this.setState({
        data: [],
        dataItem: {
          creditString: 0,
          debitString: 0,
          description: '',
          detailLedgerCode: '',
          costCenterId: 0,
          costCenterTitle: '',
          detailLedgerTitle: '',
          detailLedgerId: 0,
          subsidiaryLedgerTitle: '',
          subsidiaryLedgerCode: '',
          subsidiaryLedgerId: 0
        }
      })
    }
  }
  successGetVoucherDetail(response) {
    if (response.success)
      this.setState({ data: response.result });
  }
  componentDidUpdate(revProps, prevState) {
    
  }

  saveDraft(data) {
    console.log("saveDraft");
    let dataClone = data !== undefined ? JSON.parse(JSON.stringify(data)) : undefined;


    if (this.state.voucherMasterDescription !== '' && this.state.voucherState.code > 0 && this.state.voucherType.code > 0) {
      var command = {
        entity: {
          voucherMaster: {
            description: this.state.voucherMasterDescription,
            voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
            voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
            voucherDate: this.state.voucherMasterDate,
            id: this.state.voucherMasterId
          },
          voucherDetails: dataClone !== undefined ? dataClone : this.state.data
        }


      }
      AddVouchersService.saveDraftManualVoucher(command, this.successSaveDraft)
    }
    else {
      console.log("getVoucherDetailById")
      this.getVoucherDetailById();

      if (this.state.voucherMasterDescription === '')
        toastr.error("شرح سند نباید خالی باشد")
      if (this.state.voucherState.code === '')
        toastr.error("وضعیت سند نباید خالی باشد")
      if (this.state.voucherType.code === '')
        toastr.error("نوع سند نباید خالی باشد")
    }


  }
  successSaveDraft(response) {
    if (response.success) {

      this.setState({ voucherMasterId: response.result });
      toastr.success(response.message);
      this.setState({
        dataItem: {
          id:undefined,
          creditString: 0,
          debitString: 0,
          description: '',
          detailLedgerCode: '',
          detailLedgerTitle: '',
          detailLedgerId: 0,
          subsidiaryLedgerTitle: '',
          subsidiaryLedgerCode: '',
          subsidiaryLedgerId: 0
        }
      })
    }
    else {
      this.setState({
        dataItem: {
        
          creditString: 0,
          debitString: 0,
          description: '',
          detailLedgerCode: '',
          detailLedgerTitle: '',
          detailLedgerId: 0,
          subsidiaryLedgerTitle: '',
          subsidiaryLedgerCode: '',
          subsidiaryLedgerId: 0
        }
      })

      this.getVoucherDetailById();
    }
  }

  saveManualVoucher() {
    var command = {
      entity: {
        voucherMaster: {
          description: this.state.voucherMasterDescription,
          voucherStateId: this.state.voucherState.code,
          voucherCatagoryId: this.state.voucherType.code,
          voucherDate: this.state.voucherMasterDate,
          id: this.state.voucherMasterId
        },
        voucherDetails: this.state.data
      }


    }
    AddVouchersService.saveDraftManualVoucher(command, this.successSaveManualVoucher)
  }

  successSaveManualVoucher(response) {
    if (response.success) {

      toastr.success(response.message);
      this.props.history.push(this.props.back.path);

    }
  }

  goBack() {
    this.props.history.push(this.props.back.path);

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
  handleCancel(e, event) {
    e.preventDefault();

    let data = this.pureData(this.state.data)
    if (event.dataItem.id === -1) {
      data.splice(data.indexOf(event.dataItem), 1);
      this.setState({
        data: data, dataItem: {
          creditString: 0,
          debitString: 0,
          description: '',
          detailLedgerCode: '',
          costCenterId: 0,
          costCenterTitle: '',

          detailLedgerTitle: '',
          detailLedgerId: 0,
          subsidiaryLedgerTitle: '',
          subsidiaryLedgerCode: '',
          subsidiaryLedgerId: 0,

        },
      });

    }
    else {

      this.setState({ data: data });
    }


  }
  commandCell = (event) => {

    return <td>
      {!event.dataItem.inEdit ?
        <React.Fragment>
          <button
            disabled={this.state.dataItem.inEdit}
            className="k-primary k-button k-grid-edit-command"
            onClick={(e) => this.edit(e, event)}>
            ویرایش
  </button>
          <button
            disabled={this.state.dataItem.inEdit}
            className="k-danger k-button k-grid-edit-command"
            onClick={(e) => this.delete(e, event)}>
            حذف
  </button>
        </React.Fragment>
        :
        <React.Fragment>
          <button
            className="k-primary k-button k-grid-edit-command"
            onClick={(e) => this.saveChanges(e, event)}>
            تایید
</button>
          <button
            className="k-button k-grid-edit-command"
            onClick={(e) => this.handleCancel(e, event)}>
            انصراف
</button>
        </React.Fragment>
      }

    </td>
  }

  pureData(data) {

    let dataItem = this.state.dataItem;

    if (data.length > 0 && data[data.indexOf(dataItem)] !== undefined) {
      data[data.indexOf(dataItem)].inEdit = false;
    }

    return data;
  }
  enterInsertButton(e){
    e.preventDefault();
    const dataItem = {
      creditString: 0,
      debitString: 0,
      description: '',
      detailLedgerCode: '',
      costCenterId: 0,
      costCenterTitle: '',

      detailLedgerTitle: '',
      detailLedgerId: 0,
      subsidiaryLedgerTitle: '',
      subsidiaryLedgerCode: '',
      subsidiaryLedgerId: 0,
      id: -1,
      inEdit: true,


    };



    if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem)) {

      let data = this.pureData(this.state.data)
      if (data.length > 0) {
       

        data[data.length - 1].id = data.length;

      }
      if (data.length > 0) {

        data[data.length - 1].inEdit = false
      }
      // dataItem.debitString=dataItem.debitString!==0 ? parseInt(dataItem.debitString.replace(/,/g, '')):0;
      // dataItem.creditString=dataItem.creditString!==0?parseInt(dataItem.creditString.replace(/,/g, '')):0;
      data.push(dataItem)
      this.setState({
        data: data, dataItem: dataItem
      });

    }
    else {
      toastr.error("یکی از اسناد نامعتبر است ");
    }
  }
  enterInsert(e) {

    e.preventDefault();
    const dataItem = {
      creditString: 0,
      debitString: 0,
      description: '',
      detailLedgerCode: '',
      costCenterId: 0,
      costCenterTitle: '',

      detailLedgerTitle: '',
      detailLedgerId: 0,
      subsidiaryLedgerTitle: '',
      subsidiaryLedgerCode: '',
      subsidiaryLedgerId: 0,
      id: -1,
      inEdit: true,


    };



    if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem)) {

      let data = this.pureData(this.state.data)
      if (data.length > 0) {
        if (this.state.dataItem.id){
          
          this.saveDraft(data);

        }

        data[data.length - 1].id = data.length;

      }
      if (data.length > 0) {

        data[data.length - 1].inEdit = false
      }
      // dataItem.debitString=dataItem.debitString!==0 ? parseInt(dataItem.debitString.replace(/,/g, '')):0;
      // dataItem.creditString=dataItem.creditString!==0?parseInt(dataItem.creditString.replace(/,/g, '')):0;
      data.push(dataItem)
      this.setState({
        data: data, dataItem: dataItem
      });

    }
    else {
      toastr.error("یکی از اسناد نامعتبر است ");
    }

  }

  enterEdit(dataItem) {
    this.update(this.state.data, dataItem).inEdit = true;
    this.setState({
      data: this.state.data.slice()
    });
  }


  handleChangeVoucherMaster(value, name) {

    this.setState({ [name]: value.value });
  }

  // cancel(dataItem) {
  //   if (dataItem.ProductID) {
  //     let originalItem = this.state.data.find(p => p.ProductID === dataItem.ProductID);
  //     this.update(this.state.data, originalItem);
  //   } else {
  //     this.update(this.state.data, dataItem, !dataItem.ProductID);
  //   }
  //   this.setState({
  //     data: this.state.data.slice()
  //   });
  // }

  delete(e, event) {
    e.preventDefault();
    let data = this.pureData(this.state.data);
    if (data.length > 0 && data[data.length - 1].id === -1)
      data.splice(data.length - 1, 1);
    this.setState({ openDeleteModal: true, dataItem: event.dataItem, data: data });
  }

  deleteByKeyboard() {
    if (this.state.data.length > 0)
      this.setState({ openDeleteModal: true });
  }
  remove(e) {
    e.preventDefault();
    let data = this.state.data;
    data.splice(data.indexOf(this.state.dataItem), 1);
    this.setState({ data: data, openDeleteModal: false }, this.saveDraft);
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

    console.log("update")
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
  handleChangeAutoCompleteDetailLedger(value, name) {

    let data = this.state.data;
    let dataItem = this.state.dataItem;
    let tempDataItem = this.state.tempDataItem;
    if (value.value === '') {

      if (dataItem.detailLedgerCode === '') {
        dataItem.detailLedgerTitle = '';
        dataItem.detailLedgerId = 0;
        dataItem.detailLedgerCode = '';
        dataItem.subsidiaryLedgerTitle = '';
        dataItem.subsidiaryLedgerCode = '';
        dataItem.subsidiaryLedgerId = 0;
      }


    } else {
      dataItem.subsidiaryLedgerCode = value.value.subsidiaryLedgerCode;
      dataItem.subsidiaryLedgerTitle = value.value.subsidiaryLedgerTitle;
      dataItem.subsidiaryLedgerId = value.value.subsidiaryLedgerId;
      dataItem.detailLedgerCode = value.value.detailLedgerCode;
      dataItem.detailLedgerTitle = value.value.detailLedgerTitle;
      dataItem.detailLedgerId = value.value.detailLedgerId;
      tempDataItem.subsidiaryLedgerCode = value.value.subsidiaryLedgerCode;
      tempDataItem.subsidiaryLedgerTitle = value.value.subsidiaryLedgerTitle;
      tempDataItem.subsidiaryLedgerId = value.value.subsidiaryLedgerId;
      tempDataItem.detailLedgerCode = value.value.detailLedgerCode;
      tempDataItem.detailLedgerTitle = value.value.detailLedgerTitle;
      tempDataItem.detailLedgerId = value.value.detailLedgerId;
    }

    data[data.indexOf(dataItem)] = dataItem;

    this.setState({
      data: data, dataItem: dataItem, tempDataItem: tempDataItem
    })
  }

  handleChangeAutoCompleteCostCenter(value, name) {

    let data = this.state.data;
    let dataItem = this.state.dataItem;
    let tempDataItem = this.state.tempDataItem;

    if (value.value == '') {
      dataItem.costCenterId = 0;
      dataItem.costCenterTitle = ''
    } else {
      dataItem.costCenterId = value.value.id;
      dataItem.costCenterTitle = value.value.fullName
      tempDataItem.costCenterTitle = value.value.fullName
      tempDataItem.costCenterTitle = value.value.fullName
    }

    data[data.indexOf(dataItem)] = dataItem;

    this.setState({
      data: data,
      dataItem: dataItem,
      tempDataItem: tempDataItem
    })
  }


  handleChange(value, name) {
    let dataItem = this.state.dataItem;
    dataItem[name] = value.value;
    this.setState({ dataItem: dataItem });
    this.setState({})
  }
  handleChangeComboBox(value, name) {

  }
  getDetailLedger(event) {

    return <td>

      {event.dataItem.inEdit ? <div className="k-rtl">
        <AutoCompleteComponent
          handleChange={(value) => this.handleChangeAutoCompleteDetailLedger(value)}
          headerTemplate={getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetHeaderTemplate}
          template={getNormalDetailedgerAndSubsidiaryLedgerBalanceSheetTemplate}
          fieldSearch={"phrase"}
          keyDownPress onKeyDownPress={this.inputKeyDownPress}
          focus
          // label="کد حساب"
          field="detailLedgerCode"
          ref={(input) => { this.nameInput = input; }}
          value={this.state.dataItem.detailLedgerCode}
          placeholder="کد حسساب یا کد تفصیل را وارد کنید"
          service={GetDetailLedgerService.getNormalDetailedgerAndSubsidiaryLedgerBalanceSheet} />
      </div> :
        <b>{event.dataItem.detailLedgerCode}</b>}

    </td>
  }
  getDescription(event) {
    return <td>

      {event.dataItem.inEdit ?
        <Input label="توضیحات" keyDownPress onKeyDownPress={this.inputKeyDownPress} keyPress onKeyPress={this.onKeyPress} required handleChange={(e) => this.handleChange(e, 'description')} id="description" value={this.state.dataItem.description} />
        :
        <b>{event.dataItem.description}</b>}

    </td>

  }

  getDebit(event) {
    return <td>

      {event.dataItem.inEdit ?
        <NumberFormatComponent label="بدهکار" disabled={this.state.dataItem.creditStringString !== 0 && this.state.dataItem.creditStringString && parseInt(this.state.dataItem.creditStringString.replace(/,/g, '')) > 0} isSeparator keyDownPress onKeyDownPress={this.inputKeyDownPress} type="number" required handleChange={(e) => this.handleChange(e, 'debitString')} id="debitString" value={this.state.dataItem.debitString} />
        :

        <b>{event.dataItem.debitString.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</b>}

    </td>

  }


  getCredit(event) {
    return <td>

      {event.dataItem.inEdit ?
        <NumberFormatComponent label="بستانکار" disabled={this.state.dataItem.debitString !== 0 && this.state.dataItem.debitString && parseInt(this.state.dataItem.debitString.replace(/,/g, '')) > 0} isSeparator keyDownPress onKeyDownPress={this.inputKeyDownPress} type="number" required handleChange={(e) => this.handleChange(e, 'creditString')} id="creditString" value={this.state.dataItem.creditString} />
        :
        <b>{event.dataItem.creditString.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</b>}

    </td>



  }

  handleChangeDate(value) {
    this.setState({
      voucherMasterDate: value
    })
  }
  edit(e, event) {

    e.preventDefault();

    let data = this.pureData(this.state.data);
    if (data.length > 0) {
      if (data[data.length - 1].id === -1) {
        data.splice(data.length - 1, 1);

      }
      else {
        let dataItem = data.filter(d => d.id === event.dataItem.id)[0];
        if (dataItem !== undefined) {
          dataItem.inEdit = true;
          data[data.indexOf(dataItem)].inEdit = true;


        }
        else {
          dataItem = this.state.iniDataItem;

          if (data[data.length - 1].id === -1)
            data.splice(data.length - 1, 1);
        }
        this.setState({ data: data, dataItem: dataItem })
      }

    }




  }


  editByKeyboard() {


    let data = this.pureData(this.state.data);

    let dataItem = this.state.dataItem;
    if (data[data.indexOf(dataItem)]) {
      dataItem.inEdit = true;

      data[data.indexOf(dataItem)].inEdit = true;

      this.setState({ data: data })
      console.log("dataItem,editByKeyboard", this.state.dataItem)
    }
    else
      toastr.error("لطفا ابتدا سطر را انتخاب کنید س‍‍‍پس کلید f2 بفشارید  ")




  }



  exitEdit() {

    let data = this.state.data;
    if (JSON.stringify(this.state.dataItem) !== JSON.stringify(this.state.iniDataItem) && this.state.data.length > 0) {
      data.inEdit = false;
      data[data.length - 1].id = data.length
      this.setState({
        data: data,
        dataItem: this.state.dataItem

      });
    }

  }

  saveChanges(e, event) {
    e.preventDefault();
    let data = this.state.data;
    let dataItem = event.dataItem;

    if (dataItem.id == -1)
      dataItem.id = data.length;
    dataItem.inEdit = false;
    dataItem.index = data.length + 1;
    data[data.indexOf(dataItem)] = dataItem;

    this.setState({ data: data, dataItem: dataItem },this.saveDraft);
  }


  escapeButton() {
    let data = this.state.data;



    if (this.state.dataItem.id === -1 && data.length > 0) {
      data.splice(data.length - 1, 1);

    }

    if (JSON.stringify(this.state.dataItem) == JSON.stringify(this.state.iniDataItem) && data[data.length - 1] === this.state.dataItem) {

      data.splice(data.length - 1, 1);
    }
    else {

      data = this.getFromTempDataItem(this.state.data);


    }

    this.setState({
      data: data,
      dataItem: {
        creditString: 0,
        debitString: 0,
        description: '',
        detailLedgerCode: '',
        costCenterId: 0,
        costCenterTitle: '',

        detailLedgerTitle: '',
        detailLedgerId: 0,
        subsidiaryLedgerTitle: '',
        subsidiaryLedgerCode: '',
        subsidiaryLedgerId: 0,

      },
    })
  }

  getFromTempDataItem(data) {
    let dataItem = this.state.dataItem;
    let tempDataItem = this.state.tempDataItem;
    dataItem.subsidiaryLedgerCode = tempDataItem.subsidiaryLedgerCode;
    dataItem.subsidiaryLedgerTitle = tempDataItem.subsidiaryLedgerTitle;
    dataItem.subsidiaryLedgerId = tempDataItem.subsidiaryLedgerId;
    dataItem.detailLedgerCode = tempDataItem.detailLedgerCode;
    dataItem.detailLedgerTitle = tempDataItem.detailLedgerTitle;
    dataItem.detailLedgerId = tempDataItem.detailLedgerId;
    dataItem.costCenterId = tempDataItem.costCenterId;
    dataItem.costCenterTitle = tempDataItem.costCenterTitle
    this.setState({ dataItem: dataItem }, function () {
      data = this.pureData(this.state.data)
    })
    return data;
  }

  handleCloseModal() {
    this.setState({ openDeleteModal: false });
  }

  enter() {
     console.log("enter");
    let data = this.state.data;
    if (JSON.stringify(this.state.dataItem) == JSON.stringify(this.state.iniDataItem) && data[data.length - 1] === this.state.dataItem)
      data.splice(data.length - 1, 1);
    else
      data = this.pureData(this.state.data);

    this.setState({ data: data })

  }

  inputKeyDownPress(event) {

    if (event.keyCode === 27) {


      this.escapeButton()

    }


  }

  // displayCostCenter(event){
  //   return <td>

  //     {event.dataItem.inEdit ?
  //      <ComboBoxComponent isFilterable {...this.state.costCenterList}
  //      handleChange={(value, name) => this.handleChange(value, name)}
  //      value={this.state.costCenter} />
  //       :
  //       <b>{event.dataItem.costCenter.title}</b>}

  //   </td>
  // }


  costCenter(event) {
    return <td>

      {
        event.dataItem.inEdit
          ?
          <div className="k-rtl">
            <AutoCompleteComponent
              handleChange={(value) => this.handleChangeAutoCompleteCostCenter(value)}
              headerTemplate={costCenterHeaderTemplate}
              template={costCenterTemplate}
              fieldSearch={"phrase"}
              keyDownPress onKeyDownPress={this.inputKeyDownPress}

              // label="کد حساب"
              field="fullName"
              ref={(input) => { this.nameInput = input; }}
              value={this.state.dataItem.costCenterTitle}
              placeholder="کد / عنوان"
              service={SearchCostCentersService} />
          </div>
          :
          <b>{event.dataItem.costCenterTitle}</b>
      }

    </td>
  }
  render() {
    const handlers = {
      ADD_NEW: this.enterInsert,
      DELETE_ROW: this.deleteByKeyboard,
      EDIT: this.editByKeyboard,
      ESC: this.escapeButton,
      ENTER: this.enter,
      SUBMIT: this.saveManualVoucher,
      CANCEL: this.goBack

    };
    return (
      <HotKeys keyMap={keyMap} handlers={handlers}>

        <React.Fragment>
          <Header {...this.props} />
          <Form
            {...this.props}
            {...this.state}
            service={AddVouchersService.saveManualVoucher}
            entity={{
              voucherMaster: {
                description: this.state.voucherMasterDescription,
                voucherStateId: this.state.voucherState ? this.state.voucherState.code : 0,
                voucherCategoryId: this.state.voucherType ? this.state.voucherType.code : 0,
                voucherDate: this.state.voucherMasterDate,
                id: this.state.voucherMasterId
              },
              voucherDetails: this.state.data.filter(d => d.id !== -1)
            }}

          >

            <div>
              <Grid container spacing={8}>
                <Grid item md={2}>
                  <PersianDatePicker selectedDate={this.state.voucherMasterDate} label="تاریخ سند" handleOnChange={this.handleChangeDate} />
                </Grid>
                <Grid item md={5}>

                  <Input label="شرح سند" required handleChange={(e) => this.handleChangeVoucherMaster(e, 'voucherMasterDescription')} value={this.state.voucherMasterDescription} />


                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.voucherStateList}
                      handleChange={(value, name) => this.handleChangeVoucherMaster(value, name)}
                      value={this.state.voucherState} />
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div className="k-rtl">
                    <ComboBoxComponent isFilterable {...this.state.voucherTypeList}
                      handleChange={(value, name) => this.handleChangeVoucherMaster(value, name)}
                      value={this.state.voucherType} />
                  </div>
                </Grid>
              </Grid>
              <LocalizationProvider language="fa-FA">

                <KendoGrid

                  style={{ height: '44rem' }}
                  data={this.state.data}
                  rowHeight={50}
                  onItemChange={this.itemChange}
                  rowRender={this.renderers.rowRender}
                  editField="inEdit"
                  selectedField="selected"
                  onRowClick={(e) => {

                    this.setState({ dataItem: e.dataItem })

                  }}
                >
                  <GridToolbar>
                    <button
                      title="افزودن سند"
                      className="k-button k-success"
                      onClick={this.enterInsertButton}

                    >افزودن ردیف سند
                        </button>


                  </GridToolbar>
                  <Column editable={true} field="voucherNumber" cell={DragCell} title="شماره ردیف سند" width="100px" />
                  <Column field="detailLedgerCode" editor={this.getDetailLedger} title="کد حساب" cell={this.getDetailLedger} />
                  <Column field="detailLedgerTitle" editable={false} title="عنوان حساب" width="200px" />
                  <Column field="subsidiaryLedgerTitle" width="200px" editable={false} title="عنوان حساب معین" />
                  <Column field="constCenter" title="مرکز هزینه" cell={this.costCenter} />
                  <Column field="description" title="شرح" cell={this.getDescription} editable={false} />
                  {/* <Column field="description" title="مرکز هزینه" cell={this.displayCostCenter} editable={false} /> */}
                  <Column field="debitString" cell={this.getDebit} title="بدهکار" editable={false} />
                  <Column field="creditString" cell={this.getCredit} title="بستانکار" editable={false} />
                  <Column cell={this.commandCell} width="180px" title="عملیات" editable={false} />
                </KendoGrid>
              </LocalizationProvider>
            </div>
          </Form>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openDeleteModal}
            onClose={(e) => this.handleCloseModal(e)}
          >
            <Paper style={{
              width: '600px',
              padding: '1rem .5rem ',
              height: 'auto',
              outline: 'none',
              position: 'absolute',
              boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
              backgroundColor: '#fff',
              top: '50%',
              left: '45%',
              marginLeft: '-300px',
              marginTop: '-150px',
            }}>
              <h3 >
                <FaIcon color="orange" name="fas fa-exclamation-triangle" size={20} />
                <span style={{ marginRight: '5px' }}>حذف ردیف سند دستی</span>
                {/*<b>*/}
                {/*حذف {this.props.deleteHeader}*/}
                {/*</b>*/}
              </h3>
              <hr />
              {/*<h6> آیا از حذف <b> {!this.props.sateParams.fullName ?'dsdsdsd': this.props.sateParams.fullName}</b> اطمینان دارید؟ </h6>*/}
              <h3>آیا از حذف ردیف حذف سند مطمئن هستید ؟</h3>
              <br />
              <Button variant="contained" color="secondary" style={{ backgroundColor: 'red', color: '#FFF' }} onClick={(e) => this.remove(e)}>
                حذف
                        </Button>
              <Button variant="contained" color="secondary" style={{ marginRight: '5px', backgroundColor: 'gray', color: '#FFF' }} onClick={(e) => this.handleCloseModal(e)}>
                انصراف
                        </Button>
            </Paper>
          </Modal>
        </React.Fragment>
      </HotKeys>


    )
  }
}
