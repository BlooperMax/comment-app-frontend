import { useState } from "react";
import ReactModal from "react-modal"
import Swal from "sweetalert2";
import { fetchWithoutToken } from "../../helpers/fetch";
import { useForm } from "../../hooks/useForms";
import './loader.css';

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

export const QuestModal = ({ isLoginOpen, closeLoginModal, isRegisterOpen,closeRegisterModal,setSession}) => {

    const [forms,handleForm,reset] =useForm({
            loginUser:'',
            loginPassword:'',
            registerUser:'',
            registerPassword:''
    });

    const {
        loginUser,
        loginPassword,
        registerUser,
        registerPassword,
    } = forms;

    const [loader, setLoader] = useState(false);

    const loginRequest = (e) => {
        e.preventDefault()

        setLoader(true)

        fetchWithoutToken('api/login',{
            name:loginUser,
            password:loginPassword
        },'POST')
            .then(response=>response.json())
            .then(data=>{
                if(data.ok){
                    localStorage.setItem('session',data.token);
                    localStorage.setItem('name',data.name);
                    setLoader(false)

                    setSession(data.token)
                    closeLoginModal()
                    reset()
                } else {
                    setLoader(false)

                    Swal.fire({
                        title:'Ha ocurrido un error',
                        text:data.msg,
                        icon:'error'
                    })
                }
            })
    }

    const registerRequest = (e) => {
        e.preventDefault()

        setLoader(true)

        fetchWithoutToken('api/new',{
            name:registerUser,
            password:registerPassword
        },'POST')
            .then(response=>response.json())
            .then(data=>{
                if(data.ok){
                    localStorage.setItem('session',data.token);
                    localStorage.setItem('name',data.name);
                    setLoader(false)

                    setSession(data.token)
                    closeRegisterModal()
                    reset()
                } else {
                    setLoader(false)
                    console.log(data);
                    if(data.errors.name && data.errors.password  ){
                        Swal.fire({
                            title:'Ha ocurrido un error',
                            html:
                                data.errors.password.msg +
                                '<br/>'+
                                data.errors.name.msg,
                            icon:'error'
                        })
                    }else if(data.errors.name){
                        Swal.fire({
                            title:'Ha ocurrido un error',
                            text:data.errors.name.msg,
                            icon:'error'
                        })
                    } else if(data.errors.password){
                        Swal.fire({
                            title:'Ha ocurrido un error',
                            text:data.errors.password.msg,
                            icon:'error'
                        })
                    } 

                }
            })
    }

    return (
    <>

    {/* Modal de Login */}
        <ReactModal
            isOpen={isLoginOpen}
            style={customStyles}
            onRequestClose={closeLoginModal}
        >
            <h2 className='auth-title'>Login</h2>
            <form className='login-form'>

                <input 
                    className='auth-input' 
                    placeholder='Usuario' 
                    type='text'
                    name="loginUser"
                    onChange={handleForm}
                    value={loginUser}
                />

                <input 
                    className='auth-input' 
                    placeholder='Contraseña' 
                    type='password'
                    name="loginPassword"
                    onChange={handleForm}
                    value={loginPassword}
                />


            {(loader)
                    ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> 
                    : <input 
                        type='submit' 
                        className='auth-submit'
                        onClick={loginRequest}
                    />}
            </form>
            

        </ReactModal>

    {/* Modal de Registro */}
        <ReactModal
            isOpen={isRegisterOpen}
            style={customStyles}
            onRequestClose={closeRegisterModal}
        >
            <h2 className='auth-title'>Registro</h2>
            <form className='login-form'>
                <input 
                    className='auth-input' 
                    placeholder='Usuario'
                    type='text'
                    name="registerUser"
                    onChange={handleForm}
                    value={registerUser}
                />
                <input 
                    className='auth-input' 
                    placeholder='Contraseña' 
                    type='password' 
                    name="registerPassword"
                    onChange={handleForm}
                    value={registerPassword}
                />
              {(loader)
                    ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> 
                    : <input 
                        type='submit' 
                        className='auth-submit'
                        onClick={registerRequest}
                    />}
            </form>
            
        </ReactModal>
    </>
    )
  }