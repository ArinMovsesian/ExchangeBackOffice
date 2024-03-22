import React from 'react';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteChequePaperServices from '../services/DeleteChequePaperServices';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "شماره سریال",
            field: "chequeSerial",
            show: true,
            isFixed: false,
            dynamicColumn: false,
           
        },
        {
            title: "وضعیت چک",
            field: "chequeStateTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عنوان دسته چک",
            field: "cashFlowChequeMasterTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع چک",
            field: "chequeTypeTitle",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "علت ابطال",
            field: "description",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                return (
                    <td>
                        <Delete deleteService={DeleteChequePaperServices.deletecashflowchequedetailbyidMethod} {...prop} info={event.dataItem} entity={event.dataItem.id} title={event.dataItem.title} />
                    </td>
                )
            }
        }
    ];
};


export default Columns;