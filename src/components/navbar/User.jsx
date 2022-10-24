import { useState } from "react";

export const User = ({setSession}) => {

    const [name, setName] = useState(localStorage.getItem('name')|| 'EdgardoCaña');

    const handleSessionLogout = (e) => {
        e.preventDefault();
        setName('');
        localStorage.removeItem('name');
        localStorage.removeItem('session');
        setSession(undefined);
    };


    return (
        <>
            <p
                className='link'
            >{name}</p>
            <button
                className='link lm-8'
                onClick={handleSessionLogout}
            >Cerrar sesión</button>
        </>
    )
}