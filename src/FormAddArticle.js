import React, {Component,useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import RichTextEditor from 'react-rte';
import Dexie from 'dexie'

import {useHistory} from 'react-router-dom';
const db = new Dexie('MyDatabase');
const formStyle = { 
  padding: '2rem 0rem',
  
}

class MyStatefulEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  state = {
    value: RichTextEditor.createEmptyValue(),
    article:{title: '', content: '', date:'', image: '' }
  }

  componentDidMount(){
      db.version(2).stores({
        friends: '++id,name,email,password',
        formData: '++id,title,content,date,image'
      });

      // perform a read/write transatiction on the new store
      db.transaction('rw', db.formData, async () => {
        // get the first and last name from the data
      
      }).catch(e => {
        // log any errors
        console.log(e.stack || e)
      })
      return () => db.close()
  }


  onChange = (value) => {
    this.setState({value});
    this.setState({article:{
        content: value.toString('html'),
        title: this.state.article.title,
        date: this.state.article.date,
        image: this.state.article.image,
       }})
    if (this.props.onChange) {
      this.props.onChange(
        
        value.toString('html')
      );
    }
  };

  
  handleChangeImage = async (evt) => {
    console.log("Uploading");
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];
    if(file.size > 4 * 1024 * 1024)
            alert("Max size allowed is 4Mb")
        else {
            reader.onload = function(upload) {
            console.log(upload.target.result);
             self.setState({article:{
              title: self.state.article.title,
              content: self.state.article.content,
              date: self.state.article.date,
              image: upload.target.result,
             }})
          };
          reader.readAsDataURL(file);
        }

    
    console.log("Uploaded");
  }

  handleSubmit=  (e) => {
    e.preventDefault()
    db.transaction('rw', db.formData, async () => {
       db.formData.add({
        title: this.state.article.title,
        content: this.state.article.content,
        date: this.state.article.date,
        image: this.state.article.image,
      });
       alert("This operation has been successfully")
       this.setState({article:{title: '', content: '', date:'', image: '' } , value:RichTextEditor.createEmptyValue()})
      // const dbFirstname = await db.formData.toArray();
      // console.log(dbFirstname)    
      window.location.href='/home'  
      }).catch(e => {
        // log any errors
        console.log(e.stack || e)
      })
    

  }


 
  render () {
    return (
    <form style={formStyle}>
      <TextField
       hintText="Enter Title"
       type="text"
       required
      fullWidth={true}
       value={this.state.article.title}
       onChange = {e => {


        this.setState({article:{
        title: e.target.value,
        content: this.state.article.content,
        date: this.state.article.date,
        image: this.state.article.image,
       }}) }}
       />
      <br/>

       <TextField
       type="date"
       fullWidth={true}
       required
       value={this.state.article.date}
       onChange = {e => {this.setState({article:{
        title: this.state.article.title,
        content: this.state.article.content,
        date: e.target.value,
        image: this.state.article.image,
       }}) }}
       />
       <br/><br/>
      <input  type="file" name="file" 
        className="upload-file" 
        id="file"
        required
        onChange={this.handleChangeImage}
        encType="multipart/form-data" 
        required/>
      <br/><br/>
      <RichTextEditor
      required
        value={this.state.value}
        onChange={this.onChange}
      /><br/><br/>
      <div style={{display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
 }}>
      <Button color="primary" onClick={this.handleSubmit} style={{width:"80%",background: "#eee",
        height:40,}}>Submit</Button>
      </div>
   
    </form >
    );
  }
}

export default MyStatefulEditor