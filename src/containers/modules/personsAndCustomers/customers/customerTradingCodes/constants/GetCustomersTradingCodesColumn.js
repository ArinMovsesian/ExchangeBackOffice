import React from 'react';
// import { Delete} from 'shared/components/kendoGrid/kendoGrid';
// import { Edit } from 'shared/components/kendoGrid/kendoGrid';
import Delete from 'shared/components/kendoGrid/deleteButton/deleteButtonWithoutTD';
import Edit from 'shared/components/kendoGrid/editButton/editButtonWithoutTD';
// import DeleteCustomersTradingCode from '../services/DeleteCustomersTradingCodeServices'
import CustomerTradingCodeService  from '../services/CustomerTradingCodeServices';
const Columns = function (props, state, classes) {
    return [
        {
            title: "نام / عنوان",
            field: "fullName",
            show: true,
            class: "text-right",
            isFixed: false,
            dynamicColumn: false,
            width: "150px"
        },
        {
            title: "شناسه ملی",
            field: "nationalId",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی آتی کالا",
            field: "imeFutureCode",
            show: true,
            width: "150px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی معاملات کالا/ فروشنده",
            field: "imeSellerCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی معاملات کالا/ خریدار",
            field: "imeBuyerBourseCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی معاملات کالا",
            field: "imeBourseCode",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی معاملات انرژی/ برق",
            field: "ieeBourseCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "پم کد معاملات بورس انرژی/ فیزیکی",
            field: "pamEFPCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "پم کد معاملات بورس انرژی/ برق",
            field: "pamIEECode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "پم کد معاملات بورس اوراق",
            field: "pamTSECode",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "سومین کد بورسی قدیمی معاملات اوراق",
            field: "thirdOldTSEBourseCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "دومین کد بورسی قدیمی معاملات اوراق",
            field: "secondOldTSEBourseCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "اولین کد بورسی قدیمی معاملات اوراق",
            field: "firstOldTSEBourseCode",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "تاریخ اعتبار کد بورسی معاملات اوراق",
            field: "tseBourseCodeValidJalali",
            show: true,
            width: "250px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "کد بورسی معاملات اوراق",
            field: "tseBourseCode",
            show: true,
            width: "200px",
            isFixed: false,
            dynamicColumn: false,
        },
        {
            title: "عملیات",
            isFixed: true,
            width: "150px",
            dynamicColumn: true,
            cell: (event) => {
                console.log('عملیات',event.dataItem);
                return (
                    <td>
                        <Delete deleteService={CustomerTradingCodeService.deletePartyMethod}  info={event.dataItem} entity={event.dataItem.id}  {...props} fullName={event.dataItem.fullName} />
                        <Edit {...props} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
                    </td>
                )
            }
        }

    ];
}


export default Columns;