// const { exec } = require('child_process');
const puppeteer = require('puppeteer');
const axios = require('axios').default

exports.Helper = class {

    options = {
        defaultViewport: null,
        ignoreDefaultArgs: ['--enable-automation'],
        headless: false,
        args: [
            '--start-fullscreen',
            '--disable-gpu',
            '--disable-notifications',
            '--disable-extensions',
            '--ignore-certificate-errors',
            // '--no-sandbox',
            // '--no-startup-window',
            '--no-default-browser-check',
            '--user-data-dir=/home/headless/chrome_data'
        ]
    }
    organisaties = []
    school = ''

    async get_organisations() {
        return new Promise((resolve, reject) => {
            axios.get('https://servers.somtoday.nl/organisaties.json')
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                    reject()
                })
        })
    }

    get_token() {
        let base_url = "https://somtoday.nl/oauth2/authorize?redirect_uri=somtodayleerling://oauth/callback&client_id=D50E0C06-32D1-4B41-A137-A9A850C892C2&response_type=code&prompt=login&scope=openid&code_challenge=tCqjy6FPb1kdOfvSa43D8a7j8FLDmKFCAz8EdRGdtQA&code_challenge_method=S256&tenant_uuid={TENANT_UUID}&oidc_iss={OIDC_ISS}".toString()

        let school = this.school;

        (async () => {
            let result = this.organisaties[0].instellingen.filter(o => o.uuid == school)

            console.log(`Logging into ${result[0].naam} with ID: ${result[0].uuid}`)

            let oauth_url = base_url.replace('{TENANT_UUID}', result[0].uuid).replace('{OIDC_ISS}', result[0].oidcurls[0].url);

            const browser = await puppeteer.launch(this.options)
            const page = await browser.newPage()
            await page.goto(oauth_url)
        })();
    }
}