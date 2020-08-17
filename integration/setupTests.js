const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });


// yarn run test:integration  запустить тест
// await page.goto('http://localhost:9009/iframe.html?path=/story/appwithredux-component--app-with-redux-base-example');
// 		                                  iframe.html добавляется в путь чтобы сделать скрин
// yarn run jest:integration --updateSnapshot  обновить скриншоты
