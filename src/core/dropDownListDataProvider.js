
export default function DropDownListDataProvider(object,name,response,then){
    if(response.success){
        let obj = object.state[name];
        obj.list = response.result;
        object.setState({[name]:obj},function(){
            if(then)
           return then();
        })
     }
}