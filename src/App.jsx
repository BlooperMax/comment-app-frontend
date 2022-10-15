import { DateTime } from 'luxon'

import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";
import { FaRegCommentAlt } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import './App.css'
import ReactModal from 'react-modal';
import { useState } from 'react';
import { useForm } from './hooks/useForms';
import onExpandableTextareaInput from './helpers/onExpandableTextareaInput';

ReactModal.setAppElement('#root')

// const loginModal

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    textAlign: 'center'
  }
};

const posts = [
  {
    name: 'EdgardoCaña',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.',
    date: DateTime.now().setLocale('es').toLocaleString(),
    upvotes: 2,
    downvotes: 1,
    comments: 0
  },
  {
    name: 'EdgardoCaña',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.',
    date: DateTime.now().setLocale('es').toLocaleString(),
    upvotes: 2,
    downvotes: 1,
    comments: 0
  },
  {
    name: 'EdgardoCaña',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.',
    date: DateTime.now().setLocale('es').toLocaleString(),
    upvotes: 2,
    downvotes: 1,
    comments: 0
  }
]

function App() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [value, handleChange] = useForm({postInput:''});

  const showLoginModal = (e) => {
    setIsRegisterOpen(false)
    setIsLoginOpen(true)
  }

  const closeLoginModal = (e) => {
    setIsLoginOpen(false)
  }

  const showRegisterModal = (e) => {
    setIsLoginOpen(false)
    setIsRegisterOpen(true)
  }

  const closeRegisterModal = (e) => {
    setIsRegisterOpen(false)
  }

  return (
    <div className="App">

      <ReactModal
        isOpen={isLoginOpen}
        style={customStyles}
        onRequestClose={closeLoginModal}
      >
        <h2 className='auth-title'>Login</h2>
        <form className='login-form'>

          <input className='auth-input' placeholder='Usuario' type='text' />

          <input className='auth-input' placeholder='Contraseña' type='password' />
          <input type='submit' className='auth-submit' />
        </form>
      </ReactModal>

      <ReactModal
        isOpen={isRegisterOpen}
        style={customStyles}
        onRequestClose={closeRegisterModal}
      >
        <h2 className='auth-title'>Registro</h2>
        <form className='login-form'>
          <input className='auth-input' placeholder='Usuario' type='text' />
          <input className='auth-input' placeholder='Contraseña' type='password' />
          <input type='submit' className='auth-submit' />
        </form>
      </ReactModal>

      <nav className='navbar'>
        <h1 className='navbar-title'>Twitt0r</h1>

        <span className='navbar-links'>
          <button
            className='link'
            onClick={showRegisterModal}
          >Registro</button>
          <button
            className='link lm-8'
            onClick={showLoginModal}
          >LogIn</button>
        </span>
      </nav>

      <div className='post-container'>
        <form className='post-form'>

        <textarea
          name="postInput"
          id=""
          placeholder='¿Que estas pensando?'
          className='input-text autoExpand'
          rows={1}
          maxLength={512}
          onChange={handleChange}
          onInput={onExpandableTextareaInput}
          value={value.postInput}
        ></textarea>

        <span
          className={
            (value.postInput.length !== 512) ? 'number-limit' : 'number-limit red'
          }
        >
          {value.postInput.length}/512
        </span>
        <button className='post-submit'>
          <AiOutlineSend />
        </button>

        </form>
        <main>
          {
            posts.map((post, i) => <Post key={i} {...post} />)
          }
        </main>
      </div>

    </div>
  )
}

const Post = ({ name, content, date, upvotes, downvotes, comments }) => {

  const commentsArray = [
    {
      name: 'EdgardoCaña',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.',
      date: DateTime.now().setLocale('es').toLocaleString()
    },
    {
      name: 'EdgardoCaña',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur libero animi veniam inventore neque numquam blanditiis repellat, eius vel soluta ab enim temporibus error facere suscipit quo quam? Voluptatem, totam.',
      date: DateTime.now().setLocale('es').toLocaleString()
    }
  ]

  const [showCommentInput,isShowCommentInput]=useState(false);

  const [value, handleChange] = useForm({commentValue:''});
  const {commentValue} = value;

  const handleCommentInput = () => {
    isShowCommentInput(!showCommentInput)
  }

  return (
    <div className='post'>

      <article className={
        (showCommentInput)? 'post-card mb-3':'post-card'
      }>
        <span className='post-user'>{name}</span>
        <span className='post-date'>{date}</span>
        <p className='post-content'>
          {content}
        </p>
        <span className='post-interact-container'>
          <span className='row lm-8'>
            <button className='button upvote-button'>
              <TiArrowUpThick className='icon-button vote' />
            </button>
            <p className='post-upvotes'>
              {upvotes}
            </p>
          </span>

          <span className='row lm-8'>
            <button className='button downvote-button'>
              <TiArrowDownThick className='icon-button vote' />
            </button>
            <p className='post-downvotes'>
              {downvotes}
            </p>
          </span>

          <span className='row lm-8'>
            <button 
              className='button comment-button'
              onClick={handleCommentInput}
              >
              <FaRegCommentAlt className='icon-button' />
            </button>
            <p className='post-comments'>
              {comments}
            </p>
          </span>

        </span>

        <form 
          className={
              (showCommentInput)?'form-comment' : 'display-n'
          }
          >
          <textarea
          name="commentValue"
          placeholder='¿Que opinas de esto?'
          className='input-comment autoExpand'
          rows={1}
          maxLength={256}
          onChange={handleChange}
          onInput={onExpandableTextareaInput}
          value={value.commentValue}
          ></textarea>

          <span 
            className='send-comment'
          >     

            <span
              className={
                (value.commentValue.length !== 256) ? 'number-limit-comment' : 'number-limit-comment red'
              }
            >
              {value.commentValue.length}/256
            </span>

            <button className='comment-submit'>
              Enviar           <AiOutlineSend />
            </button>

          </span>
        </form>
      </article>

      {commentsArray.map((comment, i) => <Comment key={i} {...comment} />)}

    </div>
  )
}

const Comment = ({ name, date, content }) => {

  return (
    <div className='comment'>
      <span className='comment-name'>{name}</span>
      <span className='comment-date'> {date}</span>
      <p className='comment-content'>
        {content}
      </p>
    </div>
  )
}

export default App