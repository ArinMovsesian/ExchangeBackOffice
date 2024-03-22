import EnumService from 'services/getEnum'
import { EditorFormatLineSpacing } from 'material-ui/svg-icons';
let enums=[];
export function  SetEnums(){
   return new Promise((resolve,reject)=>{
        EnumService.getAllEnumType(function(data){
            if(data.bRuleCode=1000)
          {enums=data.result;
          resolve(enums)
          }
        })
    })
  
}
export  function  GetEnum(enumName){
    return new Promise((resolve,reject)=>{
    if(enums.length<1){
        SetEnums().then( function(data){
            enums=data;
            resolve(data[enumName])
     
    });
  
}
else{
    resolve(enums[enumName])
}
    });




}

export function GetEnumList(enumLists,defaltvalue=""){
 return new Promise((resolve,reject)=>{
    Object.keys(enumLists).map((item,index)=>{
                GetEnum(enumLists[item].enumName).then(function(data){
                    if(data===undefined)
                    enumLists[item].list=defaltvalue;
                    else{
                        enumLists[item].list=data;

                    }
                    
                });
                
                
    })
    console.log(enumLists);
    resolve(enumLists);
    })

}
