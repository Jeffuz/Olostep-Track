import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(req: Request) {
  let browser;
  try {
    const { url } = await req.json();
    // console.log("Received URL:", url);

    // initalize
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    //  open page
    const page = await browser.newPage();

    // go to url
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    // get all content
    const content = await page.content();
    // console.log(content);
    return NextResponse.json({ html: content }, { status: 200 });
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
