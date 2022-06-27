const { exec } = require('child_process')
const axios = require('axios').default

// let url = process.argv[2].match(/'([^']+)'/)[1]
let params = new URL(process.argv[2]).searchParams
let code = params.get('code')
let token = process.env.NODE_TOKEN

axios.post('https://somtoday.nl/oauth2/token', new URLSearchParams({
    grant_type: 'authorization_code',
    redirect_uri: 'somtodayleerling://oauth/callback',
    code_verifier: "t9b9-QCBB3hwdYa3UW2U2c9hhrhNzDdPww8Xp6wETWQ",
    code: code,
    scope: "openid",
    client_id: "D50E0C06-32D1-4B41-A137-A9A850C892C2"
}), {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function (response) {
    //TODO Add API URL
    // axios.post('', {
    //     data: JSON.stringify(response.data)
    // }).then(response => {
    //     exec('pkill -u headless')
    // })
}).catch(function (error) {
    console.log(error)
})