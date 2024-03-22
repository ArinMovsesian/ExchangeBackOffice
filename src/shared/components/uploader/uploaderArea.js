import React from 'react'
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FaIcon from 'shared/components/Icon/Icon'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Upload } from '../../../core/axiosHelper';
import toastr from "toastr";
import urlSettings from "../../../constants/urlSettings";
import CircularProgress from '@material-ui/core/CircularProgress';


const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};
const thumbWrapper = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
  backgroundColor: "black"
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      loading: false
    };

    this.delete = this.delete.bind(this);
    this.upload = this.upload.bind(this);
    this.successUploadFile = this.successUploadFile.bind(this);

  }

  onDrop(items) {
    this.setState({
      files: items
    });

  }
  upload() {

    let data = this.props.data;
    
    // if (this.props.hasData === true) {
    //   data = {
    //     partyId: this.props.partyId,
    //     categoryId: this.props.uploadItem.code === undefined ? this.props.uploadItem.codeId : this.props.uploadItem.code,
    //   };
    // }

    this.setState({ loading: true });
    Upload(this.props.uploadUrl + this.props.uploadApi, data, this.state.files, this.successUploadFile)
  }
  successUploadFile(response) {
    console.log(response);
    this.setState({ loading: false })

    if (response.success) {
      toastr.success(response.message);
      this.props.rerenderComponent(response);
    }else {
      this.props.errorRerenderCompoent(response);
    }
    
    // if(response.isError === true){
    //
    // }else{
    //
    // }

  }
  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))

  }
  delete(row) {
    let files = (this.state.files);
    console.log(this.state.files, files);
    files.map(file => {



      if (file.name === row.name) {
        files.splice(files.indexOf(file), 1);

      }
    });

    this.setState({ files });
  }

  render() {




    return (
      <Card >
        <div class="cardHeader">
          <h3> بارگذاری {this.props.uploadItem.title === undefined ? this.props.uploadItem.captionFA : this.props.uploadItem.title}</h3>
          <hr />
        </div>

        <CardContent>
          <section>
            <Dropzone
              accept={this.props.accepted}
              onDrop={this.onDrop.bind(this)}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {!this.state.loading ? <Button variant="outlined" size="big" color="primary" style={{ padding: "3em", backgroundColor: "#4cb34c", border: "none", color: "white", marginRight: "39%" }}>
                    {/* <FaIcon name="fa fa-upload" size={40} /> */}
                    <FaIcon name="fa fa-upload" size={40} />
                  </Button> : <Button variant="outlined" size="big" color="primary" style={{ padding: "2em 1em", backgroundColor: "#4cb34c", border: "none", color: "white", marginRight: "39%" }}>
                      {/* <FaIcon name="fa fa-upload" size={40} /> */}
                      <div><CircularProgress style={{ color: 'white', align: 'center', marginBottom: 7, marginRight: 43 }} disableShrink /><h5 style={{ textAlign: 'center' }}>در حال بارگذاری فایل (ها)</h5> </div>
                    </Button>}


                </div>
              )}
            </Dropzone>
            <div style={{ marginRight: "30%", marginTop: '10px' }}>
              <span style={{ fontSize: 12 }}>
                فایلهای پشتیبانی شده :
              </span>
              {this.props.accepted.map((acc) =>
                <b>{acc}/</b>
              )}
            </div>

            {this.state.files.length ?
              <Table style={{ width: "95%", marginRight: "2.5%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">عنوان فایل</TableCell>
                    <TableCell align="right">حذف</TableCell>


                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.files.map(row => (

                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small" onClick={() => this.delete(row)} style={{ backgroundColor: "red", color: "white" }}>
                          <FaIcon name="fa fa-trash" size={13} />
                        </Button>
                      </TableCell>
                    </TableRow>

                  ))}

                </TableBody>

              </Table>
              : ''
            }


          </section>
        </CardContent>
        <CardActions>
          {this.state.files.length ?
            <Button size="small" onClick={this.upload} style={{ backgroundColor: "#0f85ff", color: "white" }}>
              <FaIcon name="fa fa-upload" size={13} />
              تایید بارگذاری فایلها
             </Button>
            : ''}
        </CardActions>

      </Card>

    );
  }
}
Uploader.defaultProps = {
  uploadUrl: 'http://192.168.8.11:8004/api/',
  uploadApi: 'attachment/upload',
  data: {}
};
export default Uploader
