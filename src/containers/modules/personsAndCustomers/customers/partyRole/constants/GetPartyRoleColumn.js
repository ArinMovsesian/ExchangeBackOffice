import React from 'react';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
import DeletePartyRoleService from "../services/DeletePartyRoleService";
const Columns = function (prop, state, classes) {
    return [
        {
            title: "نام شخص",
            field: "partyFullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نام پدر",
            field: "fatherName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع شخص",
            field: "partyTypeTitle",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نقش",
            field: "captionFA",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ اعتبار نقش",
            field: "validUntilJalali",
            show: true,
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عملیات",
            field: "accountNumber",
            isFixed: true,
            width: '150px',
            dynamicColumn: true,

            cell: (event) => {
                console.log('عملیات',event.dataItem);
                return (
                    <td>
                        <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
                        <Delete deleteService={DeletePartyRoleService.deletePartyRoleByIdMethod} info={event.dataItem} entity={event.dataItem.id}  {...prop} fullName={event.dataItem.partyFullName} title={event.dataItem.partyTypeTitle}/>
                    </td>
                
                )
            },
        }
    ];
};


export default Columns;