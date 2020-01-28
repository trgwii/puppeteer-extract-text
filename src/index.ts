#!/usr/bin/env node

import * as puppeteer from 'puppeteer';

const pageFunction = (selector: string): string | null | undefined =>
	(document.body.querySelector(selector) || {}).textContent;

(async (): Promise<void> => {

	const [ url, selector ] = process.argv.slice(2);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(url, { waitUntil: "networkidle2" });

	const result = await page.evaluate(pageFunction, selector);

	if (typeof result === 'string') {
		console.log(result);
	} else {
		process.exitCode = 1;
	}

	await browser.close();
})();
