import { isCheckByNumber, OrderSide } from "../../../../../../constants/kendoUiGrid";
const Columns = function (prop, state, classes) {
    return [
        {
            selectable: true,
             width: "5%",
            attributes: { class: "text-center" }

        },
        {
            title: "نوع",
            field: "transactionTypeTitle",
            template:OrderSide("transactionTypeTitle"),
            width: "10%",
            attributes: { class: "text-center" },
            footerTemplate: "<div>جمع صفحه</div><div>جمع کل</div>",
         
        },
        {
            title: "شماره اعلامیه",
            field: "ticketNumber",
            width: "10%",
        
            attributes: { class: "text-center" }
        },
        {
            title: "عنوان مشتری",
            field: "partyFullName",
            width: "20%",
            
        },
        {
            title: "تاریخ معامله",
            field: "dateJalali",
            width: "15%",
            attributes: { class: "text-center" }
        },
        {
            title: "نماد",
            field: "symbol",
            width: "10%",
            attributes: { class: "text-center" }
        },
      
      
        {
            title: "تا تاریخ",
            field: "dateJalaliSimple",
            width: "10%",
            attributes: { class: "text-center" }
        },
     
       
        {
            title: "تعداد",
            field: "volume",
            width: "10%",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(Math.abs(sum).toLocaleString(navigator.language, { minimumFractionDigits: 0 }), "n0")#</div>' +
            '<div class="total-volume-sum"></div>',
            template:'#= Math.abs(volume).toLocaleString(navigator.language, { minimumFractionDigits: 0 })#' 


        },
        {
            title: "قیمت",
            field: "price",
            width: "10%",
            filter: "numeric",
            format: "{0:n0}",
            attributes: { class: "text-left" },
            aggregates: ["sum"],
            footerTemplate: '<div class="text-left">#=kendo.toString(sum, "n0")#</div>' +
            '<div class="total-price-sum"></div>'
        },
      
        // {
        //     title: "عملیات",
        //     isFixed: true,
        //     width: "150px",
        //     dynamicColumn: true,
        //     template: 
        //     '#if(state === 4 || state === 5 || state === 6 || state === 8 ){ # '+
        //     '<div style="text-align: center;">'
        //     +
        //     '<span class="fas fa-eye detail" style="color: rgb(33, 150, 243); cursor: pointer; font-size: 15px; margin: 5px;"></span>'
        //     +
        //     '</div> #}# '

                
             
        //     // cell: (event) => {
        //     //
        //     //     return (
        //     //         <td>
        //     //             <Delete deleteService={DeleteChequeBookServices.deleteCashFlowChequeMasterByIdMethod}  info={event.dataItem} entity={event.dataItem.id}  {...prop} sateParams={{ accountNumber: event.dataItem.accountNumber, fullName: event.dataItem.fullName, }} />
        //     //             <Edit {...prop} sateParams={{partyId: event.dataItem.partyId, id:event.dataItem.id, fullName: event.dataItem.fullName, nationalId: event.dataItem.nationalId}}/>
        //     //         </td>
        //     //     )
        //     // }
        // }

      
    ];

}


export default Columns;