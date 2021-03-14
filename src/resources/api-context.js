const URL = [
    {
        baseURL: 'http://localhost:5000/api',
        assetURL: 'http://localhost:5000',
    },
    {
        baseURL: 'http://157.245.107.251/api',
        assetURL: 'http://157.245.107.251',
    }
]

export const apiContext = {
    ...URL[1],
    validPhoneNumbers: [
        '917600257008',
        '917874994529',
    ]
}

