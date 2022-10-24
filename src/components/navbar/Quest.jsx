
export const Quest = ({setIsLoginOpen,setIsRegisterOpen}) => {

    const showRegisterModal = (e) => {
        setIsLoginOpen(false)
        setIsRegisterOpen(true)
      }

    const showLoginModal = (e) => {
      setIsRegisterOpen(false)
      setIsLoginOpen(true)
    }

    return (
        <>
            <button
                className='link'
                onClick={showRegisterModal}
            >Registro</button>
            <button
                className='link lm-8'
                onClick={showLoginModal}
            >LogIn</button>
        </>
    )
}