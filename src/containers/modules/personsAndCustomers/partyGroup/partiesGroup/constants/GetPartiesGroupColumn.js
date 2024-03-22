const Columns = function () {
    return [
        {
            selectable: true,
            width: "50px"
        },
        {
            title: "نام و نام خانوادگی",
            width: "170px",
            field: "partyFullName"

        },
        {
            title: "شماره ملی",
            width: "120px",
            field: "nationalId",
            attributes: { class: "text-center" }

        },
        {
            title: "معرف",
            width: "150px",
            field: ""
        },
        {
            title: "گروه",
            width: "150px",
            field: "group.title",
            sortable: false
        },
        {
            title: "تاریخ ایجاد",
            width: "120px",
            field: "createdJalali",
            attributes: { class: "text-center" }
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
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "ویرایش کننده",
            field: "modifiedByName",
            width: "180px",
            attributes: { class: "text-right" }
        },
        {
            title: "معتبر تا تاریخ",
            field: "validUntilJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "عملیات",
            width: '120px',
            template: '<div style="text-align: center;">' +
                '<span class="fas fa-edit edit" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>' +
                '<span class="fas fa-trash delete" style="color: red; cursor: pointer; font-size: 15px; margin: 5px;"></span>'+
                '</div>'
        }
    ];
};


export default Columns;