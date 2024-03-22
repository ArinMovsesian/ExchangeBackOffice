import React from 'react';
import { Delete} from 'shared/components/kendoGrid/kendoGrid';
import DeleteCustomersRelation from '../services/DeleteCustomersRelationService';
// import Delete from 'shared/components/kendoGrid/deleteButton/deleteButton';
const Columns = function (prop, state, classes) {
    return [
        {
            title: "مشتری اصلی ",
            field: "parentPartyName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "مشتری وابسته",
            field: "childPartyName",
            show: true,
            width: "300px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "نوع رابطه",
            field: "relationshipTypeTitle",
            show: true,
            width: "180px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "حذف",
            field: "accountNumber",
            isFixed: true,
            width: "100px",
            dynamicColumn: true,

            cell: (event) => {
                return (
                    // <td>
                        <Delete deleteService={DeleteCustomersRelation}  {...prop} info={event.dataItem} entity={ {id:event.dataItem.id}}  fullName={event.dataItem.parentPartyName + ' با وابستگی ' + event.dataItem.childPartyName}/>
                    // </td>
                )
            },
        }
    ];
}


export default Columns;