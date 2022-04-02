import axios from "axios"

const api_uri = 'http://localhost:3000/api/v1/tree'

export const getChildrens = (path) => {



    let config = {
        method: 'get',
        url: `${api_uri}/children`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        params: {
            path: path
        }
    };

    return axios( config )

}