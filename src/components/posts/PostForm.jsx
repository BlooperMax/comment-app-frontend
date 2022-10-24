import { AiOutlineSend } from "react-icons/ai";
import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";
import onExpandableTextareaInput from "../../helpers/onExpandableTextareaInput";
import { useForm } from "../../hooks/useForms";


export const PostForm = ({session,posts,setPosts}) => {

    const [value, handleChange] = useForm({postInput:''});

    const {postInput} = value

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!session){
          return Swal.fire( 
                            'Hey!',
                            'Primero debes estar registrad@ :)',
                            'info'
                          )
        }

        if(value.postInput.length < 5){
          return Swal.fire( 
                            'Hey!',
                            'Di algo, pichirre (minimo 10 letras)',
                            'info'
                          )
        }

        fetchWithToken('post/newpost',{content:postInput},'POST')
          .then(response=> response.json())
          .then(data=>{
            console.log(data);

            if(!data.ok){
              return Swal.fire({
                title:'Algo ha salido mal...',
                icon:'error'
              })
            }

            setPosts([data.post,...posts])

            Swal.fire({
              title:'Publicado con exito :D',
              icon:'success'
            })
            // setPosts()
          })
    }

    return (
        <form className='post-form'>

            <textarea
              name="postInput"
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
            <button 
              className='post-submit'
              onClick={handleSubmit}
            >
              <AiOutlineSend />
            </button>

        </form>
    )
}