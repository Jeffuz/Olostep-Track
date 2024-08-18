import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(req: Request) {
  let browser;
  try {
    const { url } = await req.json();
    // console.log("Received URL:", url);

    // initalize
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
    });

    // open page
    const page = await browser.newPage();

    // go to url
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    // get all content
    const content = await page.content();

    // load content to cheerio
    const $ = cheerio.load(content);

    // remove script and style tags
    $("script, style").remove();

    // get text
    const cleanData = $("body").text().replace(/\s+/g, " ").trim();

    // return raw and clean
    return NextResponse.json(
      [{ raw_data: content }, { clean_data: cleanData }],
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to scrape content", error: error.message },
      { status: 500 }
    );
  } finally {
    // close if opened earlier
    if (browser) {
      await browser.close();
    }
  }
}
