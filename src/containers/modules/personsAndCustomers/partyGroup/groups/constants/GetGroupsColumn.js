import { isStatusByNumber } from '../../../../../../constants/kendoUiGrid';

const Columns = function (prop) {
    return [
        {
            title: "عنوان گروه",
            field: "title",
            attributes: { class: "text-right" }
           
        },
        {
            title: "وضعیت",
            width: "100px",
            template:isStatusByNumber("status")
        },
        {
            title: "نوع گروه",
            field: "groupType.title",
            width: "120px",
            attributes: { class: "text-right" }
        },
        {
            title: "تاریخ ایجاد",
            width: "120px",
            field: "createdJalali"
        },
        {
            title: "ایجاد کننده",
            field: "createdByName",
            width: "180px",
            attributes: { class: "text-right" }
        },
        {
            title: "تاریخ آخرین ویرایش",
            field: "modifiedJalali",
            width: "120px"
        },
        {
            title: "ویرایش کننده",
            field: "modifiedByName",
            width: "180px",
            attributes: { class: "text-right" }
        },
        {
            title: "عملیات",
            width: '120px',
            template: '<div style="text-align: center;">' +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'+
                '<span class="fas fa-list list"></span>'+
                '</div>'
        }
    ];
};


export default Columns;