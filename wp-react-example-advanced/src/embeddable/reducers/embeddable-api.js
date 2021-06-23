import {post} from '../../api/commons'

const API_ROOT = process.env.REACT_APP_UTIL_API


export const sendShowCase = (params) => {
    const data = new FormData();
    const {files, organization, name, email, message, country, token} = params

    files.forEach(f => data.append('files', f, f.name))
    data.append("organization", organization)
    data.append("name", name)
    data.append("email", email)
    data.append("country", country)
    data.append("message", message)
    data.append("token", token)

    return fetch(API_ROOT + "/showCaseForm", {
        mode: 'cors',
        method: 'POST',
        body: data,
    });

}

export const subscribe = (params) => {
    return post(API_ROOT + "/subscribe", params)
}