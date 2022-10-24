import { fetchWithToken } from "./fetch"

export const checkSession = () => {
    const session = localStorage.getItem('session')

    if (!session) {
        return undefined
    }

    const token = fetchWithToken('api/renew')
        .then(response => response.json())
        .then( data => {
            
            if(!data.ok){
                return undefined
            }
            console.log(data.token);

            return data.token
        })

        console.log(token);

    return token
}