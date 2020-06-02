import React, {Component,useEffect} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dexie from 'dexie'
import BodyArtice from './BodyArticle'
import ClipLoader from "react-spinners/ClipLoader";

const db = new Dexie('MyDatabase');

class ListArticles extends Component {
  state = {
    articles: [],
    spinnerDelete:false
  }
  componentDidMount(){
      db.version(2).stores({
        friends: '++id,name,email,password',
        formData: '++id,title,content,date,image'
      });
      db.transaction('rw', db.formData, async () => {
      var dbFirstname = await db.formData.toArray();
      this.setState({articles:dbFirstname})
      }).catch(e => {
        // log any errors
        console.log(e.stack || e)
      })
      return () => db.close()
  }

  handleSubmit=  (e) => {
    e.preventDefault()
    db.transaction('rw', db.formData, async () => {
      var dbFirstname = await db.formData.toArray();
      console.log(dbFirstname)
      alert("The article was added sucessfully")
      
      }).catch(e => {
        // log any errors
        console.log(e.stack || e)
      })
  }
  handlerSpinner= (key) =>{
    
    this.setState({spinnerDelete:!this.state.spinnerDelete})
    db.transaction('rw', db.formData, async () =>{
      var deleteCount = await db.formData.where({'id': key}).delete();
      var dbFirstname = await db.formData.toArray();
      console.log(dbFirstname)
      // console.log ("Successfully deleted " + deleteCount + " items");
      this.setState({articles:dbFirstname})
       setTimeout(() => {
        this.setState({spinnerDelete:!this.state.spinnerDelete})
      }, 1000);
    }).catch (e => {
        console.error (e);
    });
  }
  handlerEdit= (key) =>{
    this.props.history.push('/edit_article/'+key)
  }

  render () {
    return (
       <div  style={{marginTop:40,display: 'flex',flexDirection: 'column', justifyContent: 'center',alignItems: 'center',flexGrow: 1}}>
        
        {this.state.spinnerDelete && <div className="sweet-loading">
        <ClipLoader
          size={50}
          color={"#123abc"}
          loading={true}
        />
      </div>}
        {!this.state.spinnerDelete && this.state.articles.map(item => (
          <div>
          <BodyArtice handlerEdit={this.handlerEdit} handlerSpinner={this.handlerSpinner} key={item.id} id={item.id} title={item.title} date={item.date} image={item.image} content={item.content}/>
          <br/>
          <br/>
          </div>
        ))}

      </div>
    );
  }
}

export default ListArticles