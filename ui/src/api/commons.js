export const post = (url, params, isBlob) => {

    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(params)
        })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    if (isBlob) {
                        resolve(response.blob())
                    }
                    response.json().then(function (data) {
                        resolve(data)
                    }).catch(() => resolve(response.status))
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}
export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {

        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        reject(response)
                    }
                    response.json().then(function (data) {
                        resolve(data)
                    })
                }
            )
            .catch(function (err) {
                reject(err)
            })
    })
}

export const queryParams = (params) => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}





export const getAnaliticUserCode = () => "CODE"
