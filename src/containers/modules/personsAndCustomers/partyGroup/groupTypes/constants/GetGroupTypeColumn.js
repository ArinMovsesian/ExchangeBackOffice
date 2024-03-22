import { isCheck } from '../../../../../../constants/kendoUiGrid';

const Columns = function (prop) {
    return [
        {
            title: "عنوان نوع گروه",
            field: "title",
            attributes: { class: "text-right" }
           
        },
        {
            title: "سیستمی",
            width: "100px",
            template:isCheck("isSystematic")
        },
        {
            title: "تکراری",
            field: "groupType.title",
            width: "120px",
            template:isCheck("canDuplicate")
        },
        {
            title: "تاریخ ایجاد",
            width: "120px",
            field: "createdJalali"
        },
        {
            title: "عملیات",
            width: '120px',
            template: '<div style="text-align: center;">' +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                // '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'+
                '</div>'
        }
    ];
};


export default Columns;