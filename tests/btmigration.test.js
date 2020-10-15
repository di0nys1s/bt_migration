const puppeteer = require('puppeteer')

describe('BT Migration Script', () => {
    it( 'All Process', async function () {
        const browser = await puppeteer.launch( {
            args: [
                '--disable-web-security',
            ],
            headless: false, slowMo: 50, devtools: false
        } )
        const page = await browser.newPage()

        const url = 'https://igeniusgroup.sharepoint.com/sites/product-demos/sp-case-manager/Lists/ContactList/AllItems.aspx'

        await page.goto( url )

        const emailInput = 'input[type=email]'
        const passwordInput = 'input[type=password]'
        if ( emailInput ) {
            const credentials = {
                username: 'bruces@igeniusgroup.com',
                password: 'igenius1234!'
            }
    
            await page.waitForSelector(emailInput)
            await page.type( emailInput, credentials.username )
            await page.click( '.button', { clickCount: 1 })
            await page.waitForSelector( passwordInput )
            await page.type( passwordInput, credentials.password, { delay: 750 })
    
            await page.click( 'input[type=submit]', { clickCount: 1 } )
    
            const approveStaySignBtn = '//*[@id="idSIButton9"]'
            await page.waitForXPath(approveStaySignBtn)
    
            await Promise.all([
                page.click('#idSIButton9'),
                page.waitForNavigation({ waitUntil: 'networkidle0' }),
            ]);
        }

        const xpathBtnNewContact = '//*[@id="appRoot"]/div[1]/div[3]/div/div[2]/div[2]/div[2]/div[1]/div/div/div/div/div/div/div/div[1]/div[1]/button'
        await page.waitForXPath( xpathBtnNewContact )
        const btnNewContact = '#appRoot > div.Files.sp-App-root.has-footer.is-active.od-userSelect--enabled.sp-WebViewList-enable.sp-fullHeightLayouts > div.sp-App-body > div > div.Files-main > div.Files-mainColumn > div.Files-contentAreaFlexContainer > div.od-TopBar-item.od-TopBar-commandBar.od-TopBar-commandBar--suiteNavSearch > div > div > div > div > div > div > div > div.ms-OverflowSet.ms-CommandBar-primaryCommand.primarySet-87 > div:nth-child(1) > button'

        await page.click( btnNewContact, { clickCount: 1 } )
        await page.waitForSelector( 'input[title="Given Name"]' );

        await page.type( 'input[title="Given Name"]', "Burak", { delay: 100 } )
        await page.type( 'input[title="Surname"]', "Seyhan", { delay: 100 } )
        await page.type( 'input[title="Date of Birth"]', "15/10/2000", { delay: 100 } )
        await page.type( 'input[title="Contact Number"]', "0414007102", { delay: 100 } )
        await page.type( 'input[title="Email"]', "burak@email.com", { delay: 100 } )
        await page.type( 'input[title="Service PMKeys no"]', "P-999999", { delay: 100 } )
        
        const btnSaveContact = '#spCommandBar > div > div > div > div > div > div.fd-toolbar-primary-commands > button.btn.btn-primary'
        await page.click( btnSaveContact, { clickCount: 1 } )
        await page.waitFor(5000)
        await page.waitForSelector( '#ddlCaseStage' )
        await page.select( '#ddlCaseStage', 'Case support' )
        await page.waitFor(10000)

        await page.waitForSelector('#case-bc')
        const caseId = await page.$eval('#case-bc', element => element.textContent)
        console.log('caseId', caseId)
        await page.goto( url )
        await page.waitForXPath( xpathBtnNewContact )
        await page.click( btnNewContact, { clickCount: 1 } )
        await page.waitForSelector( 'input[title="Given Name"]' );

        await browser.close()
    })
})

