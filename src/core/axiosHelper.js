
import axios from 'axios';
import toastr from 'toastr';
import errors from 'constants/errors'

let token, uploadHeader = { 'Content-type': 'multipart/form-data' }, header = {};


/*<-----------AddHeder------->*/
export function AddHeader(key, value) {
    header[key] = value;
    uploadHeader[key] = value;
};
/*<-----------POST------->*/
export function Post(customUrl, data, then, isAuth = true, responseType = 'json') {
    if (isAuth) {
        ApiRequestAuthorized(customUrl, 'Post', data, null, responseType, then);
    }
    else {
        ApiRequestUnauthorized(customUrl, 'Post', data, null, responseType, then)
    }
};

export function Upload(customUrl, data, files, then, isAuth = true, responseType = 'json') {
    if (isAuth) {
        if ((!token || token === '')) {
            window.location.href = '/login'
        }
        let formData = new FormData();

        if(data != null){
            Object.keys(data).map(d => {

                formData.append(d, data[d])
            });
        }
       
        files.map(item => {
            formData.append('file', item);
        });
        var options = {
            method: 'POST',
            url: customUrl,
            headers: uploadHeader,
            responseType : responseType,
            data: formData,
        };
        axios(options).then(responseFunction).then(then).catch(errorAuthorized);
    }

};
/*<-----------GET------->*/
export function Get(customUrl, params, then, isAuth = true, responseType = 'json') {

    if (isAuth) {
        ApiRequestAuthorized(customUrl, 'GET', null, params, responseType, then);

    }
    else {
        ApiRequestUnauthorized(customUrl, 'GET', null, params, responseType, then)
    }
};
/*<-----------DELETE------->*/
export function Delete(customUrl, params, then, isAuth = true, responseType = 'json') {

    if (isAuth) {
        ApiRequestAuthorized(customUrl, 'Delete', null, params, responseType, then);

    }
    else {
        ApiRequestUnauthorized(customUrl, 'Delete', null, params, responseType, then)
    }
};

/*------Unauthorized Request------*/
function ApiRequestUnauthorized(customUrl, method, data, params, responseType, then) {
    var options = {
        method: method,
        url: customUrl,
        responseType: responseType,
        data: data,
        params: params
    };
    axios(options).then(responseFunction).then(then).catch(errorUnauthorized);
};
/*------errorUnauthorized------*/
function errorUnauthorized(error) {
    toastr.error(errors.unconnection);
};

/*------Unauthorized Request with error handler------*/
export function ApiRequestUnauthorizedWithError(customUrl, method, data, responseType, then, error) {
    var options = {
        method: method,
        url: customUrl,
        responseType: responseType,
        data: data,
    }
    axios(options).then(then).catch(error);
};
/*------Authorized Request------*/
function ApiRequestAuthorized(customUrl, method, data, params, responseType, then) {
    if ((!token || token === '')) {
        //window.location.href = '/login'
    }
    var options = {
        method: method,
        url: customUrl,
        headers: header,
        responseType: responseType,
        data: data,
        params: params
    }
    axios(options).then(responseFunction).then(then).catch(errorAuthorized);
};

function responseFunction(response) {
    return new Promise((resolve, reject) => {
        if (response.status === 200) {
            var res = response.data;
            if (res.bRuleCode === 1000) {
                res.success = true;
            }
            else {
                res.success = false;
                toastr.error(res.message);
            }
            resolve(response.data);
        } else {
            reject('Error');
        }
    })
};
export function DownloadExcel(customUrl, data, fileName) {
    Download(customUrl, data, fileName, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,")
};

export function DownloadPdf(customUrl, data, fileName, prewPdf) {
    console.log("prewPdf",prewPdf)
    Download(customUrl, data, fileName, "application/pdf" ,prewPdf)
};

function Download(customUrl, data, fileName, fileType, prewPdf, then ) {

    if ((!token || token === '')) {
        window.location.href = '/login'
    }
    var options = {
        method: 'POST',
        url: customUrl,
        headers: header,
        responseType: 'arraybuffer',
        data: data,
    }
    
    axios(options).then((response) => responseDownload(response, fileName, fileType, prewPdf)).then(then).catch(errorAuthorized);
};

function responseDownload(response, fileName, fileType, prewPdf) {
    console.log(response)
    return new Promise((resolve, reject) => {
       
           
        if (response.status === 200) {
           
            var res = response.data;
            var decodedString = String.fromCharCode.apply(null, new ArrayBuffer(res));
        
            if (decodedString[0] === '{') {
              console.log("decodedString[0] === '{'");
                var obj = JSON.parse(decodedString);
                if (obj.isError) {
                    toastr.error('دانلود فایل با مشکل مواجه گردید')
                }

            }
            else {
                var data = new Blob([res], { type: fileType });
                var csvURL = window.URL.createObjectURL(data);
                var tempLink = document.createElement('a');
                tempLink.href = csvURL;

              
                if(prewPdf === undefined){

                   
                    if(fileType=='application/pdf')
                    tempLink.setAttribute('download', fileName + '.pdf');
                    else
                    tempLink.setAttribute('download', fileName + '.xlsx');

                }else {
                    tempLink.target = prewPdf;
                }


               
                tempLink.click();
             
            }

            resolve(response.data);
        } else {
            reject('Error');
        }
    })
};

/*------errorAuthorized------*/
function errorAuthorized(error) {
    if (error.response && error.response.status === 401) {
        toastr.error(error.unauthorize);
        //localStorage.removeItem("authentication");
       // window.location.href = '/login'
    }

};

/*<-----------Authorized Request whit error handler------->*/
function ApiRequestAuthorizedWithError(customUrl, method, data, responseType, then, error) {
    if ((!token || token === '')) {
        window.location.href = '/login'
    }
    var options = {
        method: method,
        url: customUrl,
        headers: { 'Authorization': ("Bearer " + token) },
        responseType: responseType,
        data: data
    }

    axios(options).then(then).catch(error);
};

/*<-----------SetToken------->*/
export function SetToken(tokenParam) {
    return new Promise((resolve, reject) => {
        if ((!tokenParam || tokenParam === '')) {
            window.location.href = '/login'
        }
        token = tokenParam;
        AddHeader('Authorization', "Bearer " + tokenParam);
        resolve(true);
    });
}

/*<-----------DeleteToken------->*/
export function DeleteToken() {
    token = '';
    header = {};
};













