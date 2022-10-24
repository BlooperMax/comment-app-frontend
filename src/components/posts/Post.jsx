import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { TiArrowDownThick, TiArrowUpThick } from "react-icons/ti";
import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";
import onExpandableTextareaInput from "../../helpers/onExpandableTextareaInput";
import { useForm } from "../../hooks/useForms";
import { Comment } from "./Comment";
import './loader.css';

export const Post = ({ _id,user, content, date, upVotes, downVotes,session,comments}) => {

    const [commentsArray, setComments] = useState([])

    useEffect(() => {
      if (comments.length > 0) {
        fetchWithoutToken('comment',"","GET",{pId:_id})
        .then(r=>r.json())
        .then(data => 
          setComments(data.comments)
        )
      }
    }, []);

    const [showCommentInput,isShowCommentInput]=useState(false);
    const [value, handleChange,reset] = useForm({commentValue:''});
    const {name} = user;

    const [loader, setLoader] = useState(false)

    const dateFormat = DateTime.fromMillis(date).setLocale('es').toLocaleString();
  
    const handleCommentInput = () => {
      isShowCommentInput(!showCommentInput)
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      if(!session){
        return Swal.fire( 
                          'Hey!',
                          'Primero debes estar registrad@ :)',
                          'info'
                        )
      }

      if(value.commentValue.length < 5){
        return Swal.fire( 
                          'Hey!',
                          'Di algo, pichirre (minimo 5 letras)',
                          'info'
                        )
      }

      setLoader(true)

      fetchWithToken(
        'comment/add',
        {
          content:value.commentValue,
          pId:_id
        },
        'POST')
        .then(response=> response.json())
        .then(data=>{

          setLoader(false)

          if(!data.ok){
            return Swal.fire({
              title:'Algo ha salido mal...',
              icon:'error'
            })
          }

          reset()

        setComments([...commentsArray,data.comment])

        Swal.fire({
          title:'Publicado con exito :D',
          icon:'success'
        })
      })
      
  }

  const handleVote = (e) => {
    Swal.fire({
      title:'En construción aún :(',
      icon:'error'
    })
  }
  
    return (
      <div className='post'>
  
        <article className='post-card'>
          <span className='post-user'>{name}</span>
          <span className='post-date'>{dateFormat}</span>
          <p className='post-content'>
            {content}
          </p>
          <span className='post-interact-container'>
            <span className='row lm-8'>
              <button 
                className='button upvote-button'
                onClick={handleVote}
              >
                <TiArrowUpThick className='icon-button vote' />
              </button>
              <p className='post-upvotes'>
                {upVotes}
              </p>
            </span>
  
            <span className='row lm-8'>
              <button 
                className='button downvote-button'
                onClick={handleVote}
              >
                <TiArrowDownThick className='icon-button vote' />
              </button>
              <p className='post-downvotes'>
                {downVotes}
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
                {commentsArray.length}
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
                className={
                  (value.commentValue.length !== 256) ? 'number-limit-comment' : 'number-limit-comment red'
                }
              >
                {value.commentValue.length}/256
              </span>
  


              {(loader)
                    ? <div className="lds-dual-ring"></div>
                    : <button 
                        className='comment-submit'
                        onClick={handleSubmit}
                      >
                        Enviar           <AiOutlineSend />
                      </button>
              }

          </form>
        </article>
  
        {commentsArray.map((comment, i) => <Comment key={i} {...comment} />)}
  
      </div>
    )
  }
  