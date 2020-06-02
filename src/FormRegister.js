import React, { useEffect, useState } from 'react'
import { Offline, Online } from 'react-detect-offline'
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import Dexie from 'dexie'
import store from 'store';
// some inline styling so everything isn't squished
const formStyle = { 
  padding: '2rem 0rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1
}
const inputStyle = { margin: '1rem 0rem' }

// a simple form with a first name, last name, and submit button
const Form = ({  }) => {
  // store form values in a state hook
  const [users, setUsers] = useState({ firstname: '', lastname: '', email:'', password: '' })
  const db = new Dexie('MyDatabase');

  useEffect(
    () => {
      // create the store
      // Declare tables, IDs and indexes
      db.version(2).stores({
        friends: '++id,name,email,password',
        formData: '++id,title,content,date,image'
      });
   
      db.transaction('rw', db.friends,db.formData, async () => {

      }).catch(e => {
        // log any errors
        console.log(e.stack || e)
      })

      // close the database connection if form is unmounted or the
      // database connection changes
      return () => db.close()
    },
    // run effect whenever the database connection changes
    [db]
  )
  const setName = id => value => {
    setUsers(prevUsers => ({ ...prevUsers, [id]: value }))
  }

  // partial application to make on change handler easier to deal with
  const handleSetUser = id => e => setName(id)(e.target.value)
 
 const handleSubmit = async (e) => {
  e.preventDefault()
  
  console.log(store.get('loggedIn'))

  db.transaction('rw', db.friends, async () => {
    db.friends.add({
      name: users.firstname +' '+users.lastname,
      email: users.email,
      password: users.password,
    });
     
    const dbFirstname = await db.formData.toArray();
    console.log(dbFirstname)
  })
 
}


  return (
    <form style={formStyle}>
     
      <TextField
       type="text"
       hintText="Enter your firstname"
       floatingLabelText="First name"
       value={users.firstname}
        onChange={handleSetUser('firstname')}
       />

   
      <TextField
       type="text"
       hintText="Enter your lastname"
       value={users.lastname}
       floatingLabelText="Last name"
        onChange={handleSetUser('lastname')}
       />
  
      <TextField
       hintText="Enter your Email"
       type="email"
       floatingLabelText="Email"
       value={users.email}
       onChange = {handleSetUser('email')}
       />
  
      <TextField
       type = "password"
       hintText="Enter your Password"
       floatingLabelText="Password"
       value={users.password}
       onChange = {handleSetUser('password')}
       />
      <br/><br/><br/>
       <Button color="primary" onClick={handleSubmit} style={{width:"80%",background: "#eee",
        height:40,}}>Submit</Button>

    </form>
  )
}

export default Form