import React, {useRef, useState, useEffect} from 'react'
import { database, auth } from '../firebase.config'


const Home = () => {
  // Declare
  const scroll = useRef()
  const [messages, setMessages] = useState()
  const [message, setMessage] = useState('')
  const user = auth.currentUser
  
  const listenChat = database.ref("Chat")
  const getChat = database.ref("Chat").limitToLast(10)

  /// Function
     useEffect(() => 
     {
          getChat.on('value', (snapshot) => 
          {
               const List = [] , s = snapshot.val()
               for (let id in s){
                    //console.log(id)
                    List.push({ id,...s[id] })
               }
               setMessages(List)
          })
     }, [])


     listenChat.on("value", snapshot =>{
          //const listDeveloper = snapshot.val();
     })

     // Function chat message
     function Message(uid, name, photo, chat) 
     {
          database.ref('Chat/' + Date.now() ).set
          ({
               uid: uid,
               name: name,
               photo: photo,
               chat: chat,
          });
          setMessage('')
     }

     // Async when click
     const sendMessage = async (e) => 
     {
          e.preventDefault();
          await Message(user.uid, user.displayName, user.photoURL, message)
     }


     return (
     <div className='Container '>

          <div className='visible-scrollbar section'> 

               {messages ? messages.map((e, index) => 
               <div key={index} className={`message ${e.uid === user.uid ? 'sent' : 'received'}`}> 
               <img className='img-chat' src={e.photo || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />     
               <h4 >{e.name}</h4>
               <p>{e.chat}</p>
               <p className='time-right'>{ new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(e.id)}</p>
               </div>
               ) : ''}
               <div ref={scroll}></div>

          </div>


          <form className='Box-Message' onSubmit={sendMessage}>
          
          <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Nhập vào chỗ này" />

          <button type="submit" disabled={!message}>🕊️ Gửi chat</button>

          </form>
     </div>

     )
}

export default Home