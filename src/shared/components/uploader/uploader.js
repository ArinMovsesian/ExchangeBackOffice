import React from 'react'
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import FaIcon from 'shared/components/Icon/Icon'
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
  constructor() {
    super()
    this.state = {
      files: []
    };
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    }, function () {
      this.props.handleUpload({ name: this.props.name, files: this.state.files[0] });
    });
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
  }

  render() {
    const { files } = this.state;

    const thumbs = files.map(file => (
      <div style={thumb} key={this.props.name}>



      </div>
    ));

    return (
      <section>
        <Dropzone
          accept={this.props.accepted}
          onDrop={this.onDrop.bind(this)}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button variant="outlined" size="small" color="primary">
                <FaIcon name="fa fa-upload" size={13} />
              </Button>
            </div>
          )}
        </Dropzone>



      </section>
    );
  }
}

export default Uploader
