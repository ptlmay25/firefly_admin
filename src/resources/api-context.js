const URL = [
    {
        baseURL: 'http://localhost:8080/api',
        assetURL: 'http://localhost:8080',
    },
    {
        baseURL: 'https://firefly-admin-nodejs-nob8m.ondigitalocean.app/app/api',
        assetURL: 'https://firefly-admin-nodejs-nob8m.ondigitalocean.app/app',
    }
]

export const apiContext = {
    ...URL[0],
    validPhoneNumbers: [
        '917600257008',
        '917874994529',
    ]
}

