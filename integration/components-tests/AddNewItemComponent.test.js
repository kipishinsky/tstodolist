describe('AddNewItemComponents test', () => {
	it('visually looks correct', async () => {
		// APIs from jest-puppeteer
		await page.goto('http://localhost:9009/iframe.html?path=/story/additemform-component--add-new-item-component-base-example')
		const image = await page.screenshot()

		// API from jest-image-snapshot
		expect(image).toMatchImageSnapshot()
	})
})
