const URL = [
    {
        baseURL: 'http://localhost:5000/api',
        assetURL: 'http://localhost:5000',
    },
    {
        baseURL: 'https://firefly-admin-nodejs-nob8m.ondigitalocean.app/app/api',
        assetURL: 'https://firefly-admin-nodejs-nob8m.ondigitalocean.app/app',
    }
]

export const apiContext = {
    ...URL[1],
    validPhoneNumbers: [
        '917600257008',
        '917874994529',
    ]
}

