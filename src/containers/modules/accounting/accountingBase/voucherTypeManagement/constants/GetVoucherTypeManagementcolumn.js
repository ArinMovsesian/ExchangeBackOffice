import React from 'react';
import Button from '@material-ui/core/Button';
import FaIcon from 'shared/components/Icon/Icon';
import {isCheck} from "../../../../../../constants/kendoUiGrid";
// import DeletePartyBankAccountService from "../../../../personsAndCustomers/customers/bankAccounts/services/deletePartyBankAccountService";
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeleteVoucherTypeManagementService from '../services/DeleteVoucherTypeManagementService';
import {CheckColumn} from 'shared/components/kendoGrid/kendoGrid';
// import DeleteChequePaperServices from '../services/DeleteChequePaperServices';
const Columns = function (prop, state, classes) {
    
    return [
    
        {
            title: "کد",
            field: "code",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان",
            field: "title",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-right" }
        },
        {
            
            title: "سیستمی",
            field: "isSystematic",
            show: true,
            isFixed: false,
            dynamicColumn: true,
            filter: 'boolean',
            attributes: { class: "text-center" },
            template:isCheck("isSystematic")
        },
        {
            title: "رتبه مرتب سازی",
            field: "priority",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-left" }
        },
        {
            title: "تعداد روز قفل گذار",
            field: "dayOfAutomaticLock",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-left" }
         
        },
        {
            title: "قفل گذار",
            field: "automaticLockedByUserName",
            show: true,
            isFixed: false,
            dynamicColumn: false, 
            attributes: { class: "text-left" }
          
        },
        {
            title: "تغییر اولویت",
            width: "150px",
            template:
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-exchange-alt editPriority" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>',
        },
        {
            title: "عملیات",
            width: "150px",
            template:
                '<div style="text-align: center;">'
                +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'
                +
                '</div>',
        },
        // {
        //     title: "تغییر اولویت",
        //     isFixed: true,
        //     width: "200px",
        //     dynamicColumn: true,
        //     cell: (event) => {
        //         console.log('تغییر اولویت',event.dataItem);

        //         return (
        //             <td>
        //                 <Button size="small"  color="primary" onClick={() => prop.ChangePriority(event.dataItem)}>
        //                     <FaIcon name="far fa-edit" size={15} />
        //                 </Button>
        //             </td>
        //         )
        //     }
        // },
        // {
        //     title: "عملیات",
        //     isFixed: true,
        //     width: "200px",
        //     dynamicColumn: true,
        //     cell: (event) => {
        //         console.log('عملیات',prop);

        //         return (
        //             <td>
        //                 <Delete deleteService={DeleteVoucherTypeManagementService.deletevouchercategoryMethod} {...prop} info={event.dataItem} entity={event.dataItem.code} title={event.dataItem.title} />
        //                 <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, nationalId: event.dataItem.nationalId}}/>
        //             </td>
        //         )
        //     }
        // }
    ];
};


export default Columns;