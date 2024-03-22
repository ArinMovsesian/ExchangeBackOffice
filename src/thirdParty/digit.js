const Digit=    function digit(){}
Digit.prototype.toEnglishDigits = function (value) {
    var num_dic = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
    }
     for(var i=0;i<value.length;i++){
         parseInt(value[i].replace(/[۰-۹]/g, function (w) {
            value[i]=num_dic[w];
        }));
     }
     return value
   
}
export default Digit