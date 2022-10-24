import './App.css'
import ReactModal from 'react-modal';
import { useState } from 'react';
import { useForm } from './hooks/useForms';
import onExpandableTextareaInput from './helpers/onExpandableTextareaInput';
import { Quest } from './components/navbar/Quest';
import { PostForm } from './components/posts/PostForm';
import { Post } from './components/posts/Post';
import { useEffect } from 'react';
import { fetchWithoutToken, fetchWithToken } from './helpers/fetch';
import { QuestModal } from './components/modals/QuestModals';
import { User } from './components/navbar/User';
import { checkSession } from './helpers/checkSession';

ReactModal.setAppElement('#root')

const App = () => {

  const [posts, setPosts] = useState([])
  const [session, setSession] = useState(undefined );
  
  useEffect(() => {
        // pensar en una solucion reutilizable
    // pa cuando?
    fetchWithToken('api/renew')
      .then(response => response.json())
      .then( data => {
          if(!data.ok){
              return
          }
          setSession(data.token)
      })  
  

  }, [])
  

  useEffect(() => {
    fetchWithoutToken('post')
      .then(r=>r.json())
      .then(data => {
        setPosts(data.posts)
      }
      )
  
  }, [])

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const closeLoginModal = (e) => {
    setIsLoginOpen(false)
  }

  const closeRegisterModal = (e) => {
    setIsRegisterOpen(false)
  }

  return (
    <div className="App">

      <QuestModal 
        isLoginOpen={isLoginOpen} 
        closeLoginModal={closeLoginModal} 
        isRegisterOpen={isRegisterOpen} 
        closeRegisterModal={closeRegisterModal}
        setSession={setSession}
      />

      <nav className='navbar'>
        <h1 className='navbar-title'>Twitt0r</h1>

        <span className='navbar-links'>

          {(!!session)?<User 
                        setSession={setSession}
                      />
                      :<Quest 
                        setIsLoginOpen={setIsLoginOpen} 
                        setIsRegisterOpen={setIsRegisterOpen} 
                      />        
          }
          
        </span>
      </nav>

      <div className='post-container'>

        <PostForm 
          session={session}
          posts={posts}
          setPosts={setPosts}
        />

        <main>
          {
            posts.map((post) => <Post key={post._id} session={session} {...post}  />)
          }
        </main>

      </div>

    </div>
  )
}
export default App