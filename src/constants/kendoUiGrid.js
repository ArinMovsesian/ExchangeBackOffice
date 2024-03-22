
export const isCheck = function (prop ) {
 
    return "  #if("+prop+"){#"+
    " <div class='text-center text-green'>"+
       "  <span class='k-icon k-i-check text-center'></span> </div>"+
    " #}else{#"+
    " <div class='text-center text-red' >"+
       "  <span  class='k-icon k-i-close text-center' style='color:'red''></span> </div>"+
    " #}#"

}
export const isCheckByNumber = function (prop ) {
 
   return "  #if("+prop+">0){#"+
   " <div class='text-center text-green'>"+
      "  <span class='k-icon k-i-check text-center'></span> </div>"+
   " #}else{#"+
   " <div class='text-center text-red' >"+
      "  <span  class='k-icon k-i-close text-center' style='color:'red''></span> </div>"+
   " #}#"

}
export const isStatusByNumber = function (prop ) {
 
   return "  #if("+prop+" == 1){#"+
   " <div class='text-center text-green'>"+
      "  <span class='k-icon k-i-check text-center'></span> </div>"+
   " #}else{#"+
   " <div class='text-center text-red' >"+
      "  <span  class='k-icon k-i-close text-center' style='color:'red''></span> </div>"+
   " #}#"

}
export const OrderSide = function (prop ) {
 
   return "  #if("+prop+" == 'خرید'){#"+
   
      " <span class='label-order white-text background-blue-buy' >خرید</span> "+
   " #}else{#"+
  
      " <span class='label-order white-text background-red-sell' >فروش</span> "+
   " #}#"

}



