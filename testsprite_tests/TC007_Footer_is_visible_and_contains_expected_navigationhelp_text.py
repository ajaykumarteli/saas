import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Interact with the page elements to simulate user flow
        # -> Navigate to http://localhost:3000
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        
        # --> Assertions to verify final state
        frame = context.pages[-1]
        # Scroll to the footer brand element
        await frame.locator('xpath=/html/body/footer/div/div[1]/div[1]/div/span').scroll_into_view_if_needed()
        # Verify footer (brand) element is visible
        assert await frame.locator('xpath=/html/body/footer/div/div[1]/div[1]/div/span').is_visible()
        # Verify text "NovaAI" is visible in the footer brand
        brand_text = (await frame.locator('xpath=/html/body/footer/div/div[1]/div[1]/div/span').text_content()) or ""
        normalized = brand_text.replace("\n", "").replace(" ", "").strip()
        assert "NovaAI" in normalized
        # Verify a footer link is visible (Features link)
        assert await frame.locator('xpath=/html/body/footer/div/div[1]/div[2]/div[1]/ul/li[1]/a').is_visible()
        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()

asyncio.run(run_test())
    