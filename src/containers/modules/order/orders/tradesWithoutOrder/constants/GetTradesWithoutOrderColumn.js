import { OrderSide } from "../../../../../../constants/kendoUiGrid";

const Columns = function (prop, state, classes) {
    return [
        {
            selectable: true, width: "50px",
        },
        {

            title: "نوع ",
            field: "transactionTypeTitle",
            template:OrderSide("transactionTypeTitle"),
            width: "110px",
            attributes: { class: "text-center" }
        },
        {
            title: "شعبه",
            field: "branchName",
            width: "100px",
            attributes: { class: "text-center" }

         
        },
        {
            title: "عنوان مشتری",
            field: "partyName",
            width: "180px",
          
        },
        {
            title: "کدملی",
            field: "nationalId",
            width: "120px",
           
        },
        {
            title: "کد بورسی",
            field: "bourceCode",
            width: "105px",
        
        },
        {
            title: "شعبه مشتری",
            field: "customerBranchName",
            width: "110px",
            
        },
        {
            title: "نماد",
            field: "symbol",
            width: "150px",
            attributes: { class: "text-center" }
        },
        {
            title: "نام شرکت",
            field: "companyName",
            width: "170px",
            attributes: { class: "text-center" }
        },
        {
            title: "نوع بازار",
            field: "simpleSecurityExchangeTitle",
            width: "110px",
            attributes: { class: "text-center" }

        },
        {
            title: "تاریخ معامله",
            field: "executedDateJalali",
            width: "120px",
            attributes: { class: "text-center" }
        },
        {
            title: "تعداد ",
            field: "volume",
            filter: "numeric",
            format: "{0:n0}",
            width: "110px",
            attributes: { class: "text-left" },
            template:'#= Math.abs(volume).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#' 
  

           
        },
        {
            title: "حداقل قیمت ",
            field: "minPrice",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },
           
        },
        {
            title: "حدااکثر قیمت ",
            field: "maxPrice",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },

        },
        {
            title: " قیمت ",
            field: "price",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },
        },
        {
            title: "مانده کل",
            field: "remainT0",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },
           
        },
        {
            title: "مجموع بلوکه",
            field: "blockRemain",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },
          
        },
        {
            title: "قابل برداشت",
            field: "cashableRemain",
            filter: "numeric",
            format: "{0:n0}",
            width: "130px",
            attributes: { class: "text-left" },
          
        },
    
        {
            title: "اعتبار مشتری",
            field: "credit",
            width: "180px",
            attributes: { class: "text-center" }
        },

        {
            title: "تاریخ اعتبار",
            field: "creditDateJalali",
            width: "160px",
            attributes: { class: "text-center" }
        },
        // {
        //     title: "وضعیت معامله",
        //     field: "transactionStatusEnumTitle",
        //     width: "180px"
        // },
        {
            title: "نام معرف",
            field: "representativeName",
            width: "150px"
        },
     
    ];

}


export default Columns;