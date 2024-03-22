import React from 'react';
// import { Edit, Delete } from 'shared/components/kendoGrid/kendoGrid';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteCustomersTradingCode from "../../customerTradingCodes/services/DeleteCustomersTradingCodeServices";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';

import DeletePartyBankAccountService from '../../bankAccounts/services/deletePartyBankAccountService';
// import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
// import DeletePartyBankAccountService from "../services/deletePartyBankAccountService";
const Columns = function (prop, state, classes) {
    return [
        {
            title: "نام بانک",
            field: "bankTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نام شعبه",
            field: "branchName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "استفاده برای",
            field: "bankAccountUsagesTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد شعبه",
            field: "branchCode",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
            width: '120px'
        },
        {
            title: "نوع حساب",
            field: "accountTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: '150px'
        },
        {
            title: "شماره حساب",
            field: "accountNumber",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "شبا",
            field: "iban",
            show: true,
            class: "text-left",
            isFixed: false,
            dynamicColumn: false,
            width: '200px'
        },
        {
            title: "حساب پیش فرض",
            field: "isDefault",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '150px',
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.isDefault} />
                )
            },
        },
        {
            title: "خرید از محل بانک",
            field: "purchaseFromBank",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            width: '150px',
            cell: (event) => {
                return (
                    <CheckColumn status={event.dataItem.purchaseFromBank} />
                )
            },
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                console.log('عملیات',event.dataItem);
                console.log('props عملیات',prop);
                return (
                    <td>
                        <Delete deleteService={DeletePartyBankAccountService}  info={event.dataItem} entity={{id: event.dataItem.id, partyId: event.dataItem.partyId}}  {...prop}  fullName={event.dataItem.fullName}/>
                        {/* <Edit {...props} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/> */}
                        <span class="fas fa-edit edit" style={{color: 'rgb(33, 150, 243)', cursor: 'pointer', fontSize: '15px', margin:' 5px',}} onClick={() => prop.EditCustomerContactTab(event.dataItem.id)}></span>
                        
                    </td>
                )
            }
        }
    ];

}


export default Columns;