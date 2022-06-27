const { Helper } = require('./main.js');

(async () => {
    let instance = new Helper()

    instance.options.executablePath = '/usr/bin/chromium-browser'
    instance.organisaties = await instance.get_organisations()
    instance.school = process.env.NODE_SCHOOL

    if (process.env.NODE_KIOSK == 1) instance.options.args.push('--kiosk')

    instance.get_token()
})()