
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {db, auth} from './firebase.config'
import './AddEdit.css'
import {collection,onSnapshot,doc, setDoc, getDocs,addDoc,deleteDoc} from "firebase/firestore"
import TodoList from './Component/TodoList'
import { onAuthStateChanged } from 'firebase/auth'

const user = auth.currentUser;

toast.configure()
const initialState ={
  notice: "",
  message: ""
} 

const AddEdit = () => {
      const [ state, setState ] = useState(initialState)
      const [ data, setData ] = useState()
      const { notice, message } = state

      const handleInputChange = (e) => {
          const { name, value} = e.target
          setState({...state, [name]: value})
      };
 
    
    useEffect(
      () =>
          onAuthStateChanged(auth,async (user) => 
          {
              
              await  onSnapshot(collection(db, "data/"+ user.uid),  (snapshot) =>
                    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
              )
          })
      ,[]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        if( notice && message ) 
        {

              const id = user.uid, contact = user.providerData
              
              await setDoc(doc(db, "data", id ), {
                notice: notice,
                  message: message,
                  contact
              })
         
        }else toast.error("Please input value")
    }

  return (
    
    <div className='AddEdit'>
      <form style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: 'center'}} onSubmit={handleSubmit}>
        <p></p>
        <label htmlFor='notice'>Chú thích</label>
        <input type='text' id='notice' name='notice' placeholder='Your notice...' value={notice} onChange={handleInputChange}></input>
      
        <label htmlFor='message'>Message</label>
        <input type='message' id='message' name='message' placeholder='Your message...' value={message} onChange={handleInputChange}></input>
   
        <button type='submit' value='save'>Save</button>
        
      </form>
     

    </div>
  )
}

export default AddEdit