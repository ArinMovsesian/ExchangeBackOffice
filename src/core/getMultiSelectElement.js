export  function GetMultiSelectElement(object,collect,elementName,stateName,response){
   
    if (response.result.length > 0 && collect!==undefined ) {
      let accountCodes = [];
  
        var accountCode = response.result.find(main => {
          if(main.code === collect[elementName])
         
          return main.code === collect[elementName]

      })
     
      accountCodes.push(accountCode);
      if(typeof(stateName)==='string')
      object.setState({[stateName]:accountCodes});
      else if(typeof(stateName)==='object' && stateName.length && stateName.length>0)
      object.setState(
     ()=>   stateName.map(s=>({[s]:accountCodes}))
      )
    }
  }
 



export  function GetMultiSelectElementMoreItem(object,collect,elementName,array,response){
  
    if (response.result.length > 0 && collect!==undefined ) {
        let accountCodes = [];
        response.result.map(
            (responseItem, index) => {
                array.map(
                    (arrayItem) => {
                        if(arrayItem.id === responseItem.id){
                            accountCodes.push(responseItem.id);
                        }
                    }
                )
            }
        );
       // for(let i = 0; i < response.result.length; i++){
       //     for(let j = 0; j < stateName.length; j++){
       //         if(stateName[j].id == accountCodes[i].id){
       //             accountCodes.splice([i], 1);
       //         }
       //     }
       // }

        // accountCodes.push(accountCode);
        object.setState({elementName:accountCodes});
    }
}











export function GetDropDownElement(object,collect,elementName,stateName,response,responsefield="code"){
  
    if (response.result.length > 0 && collect!==undefined && collect[elementName]) {
   
  
        var accountCode = response.result.find(main => {
          if(main[responsefield] === collect[elementName])
          return main[responsefield] === collect[elementName]
      })
     if(accountCode)
      object.setState({[stateName]:accountCode});
    }
  }

  export function GetDropDownElementWithoutResponse(object,collect,elementName,stateName,result){
   
    if (result.length > 0 && collect!==undefined ) {
        var accountCode = result.find(main => {
          if(main.code === collect[elementName])
          return main.code === collect[elementName]
      })
      object.setState({[stateName]:accountCode});
    }
  }