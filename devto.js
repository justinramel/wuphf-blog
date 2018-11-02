const fs = require('fs')
const puppeteer = require('puppeteer');
const config = require('./config').devto;

const fileContents = fs.readFileSync('test.md', 'utf8')

async function run() {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: false
    })

    const page = await browser.newPage()
    const login = 'https://dev.to/enter'
    console.log(`Opening ${login}`)
    await page.goto(login)

    console.log(`Logging in as ${config.username}`)

    await page.click("a[href='/users/auth/github?state=join-club-page_basic']")
    await page.click('#login_field')
    await page.keyboard.type(config.username)
    await page.click('#password')
    await page.keyboard.type(config.password)
    await page.click('input[type=submit]')
    await page.waitForNavigation()
    await page.waitForNavigation()
    await page.click('#write-link')
    await page.waitForNavigation()
    await page.click('#article_body_markdown')
    await page.keyboard.type(fileContents)
}

run()