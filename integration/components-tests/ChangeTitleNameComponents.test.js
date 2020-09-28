describe('ChangeTitleNameComponents test', () => {
	it('visually looks correct', async () => {
		// APIs from jest-puppeteer
		await page.goto('http://localhost:9009/iframe.html?path=/story/changetitlename-component--change-title-name-base-example')
		const image = await page.screenshot()

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot()
	})
})
