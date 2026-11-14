import { test, expect } from '@playwright/test';

test('MUD terminal keyboard input', async ({ page }) => {
  console.log('1. Navigating to ghost.claims...');
  await page.goto('https://ghost.claims', { waitUntil: 'networkidle' });

  console.log('2. Scrolling to #mud-terminal section...');
  await page.locator('#mud-terminal').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  console.log('3. Waiting for WebSocket connection...');
  let connected = false;
  let attempts = 0;
  while (connected === false && attempts < 20) {
    const status = await page.locator('#mud-status').textContent({ timeout: 500 }).catch(() => '');
    console.log(`   Status text: "${status}"`);
    if (status && status.includes('Connected')) {
      connected = true;
      break;
    }
    await page.waitForTimeout(300);
    attempts++;
  }
  console.log(`   Connected: ${connected}`);

  console.log('4. Waiting 3 seconds for auto-focus...');
  await page.waitForTimeout(3000);

  console.log('5. Clicking on #mud-xterm to focus...');
  await page.locator('#mud-xterm').click();
  await page.waitForTimeout(500);

  console.log('6. Typing "look" command...');
  await page.keyboard.type('look\n');
  await page.waitForTimeout(2000);

  console.log('7. Taking screenshot...');
  await page.screenshot({ path: './mud-terminal.png' });

  console.log('8. Evaluating helper textarea state...');
  const textareaState = await page.evaluate(() => {
    const textarea = document.querySelector('#mud-xterm .xterm-helper-textarea') as HTMLTextAreaElement;
    if (textarea === null) return { exists: false };
    const computed = window.getComputedStyle(textarea);
    return {
      exists: true,
      position: computed.position,
      left: computed.left,
      top: computed.top,
      width: computed.width,
      height: computed.height,
      opacity: computed.opacity,
      isActiveElement: document.activeElement === textarea,
      activeElementTag: document.activeElement?.tagName,
      activeElementClass: document.activeElement?.className,
    };
  });
  console.log('Textarea state:', JSON.stringify(textareaState, null, 2));

  console.log('9. Checking terminal content for typed text...');
  const terminalContent = await page.evaluate(() => {
    const screen = document.querySelector('#mud-xterm');
    if (screen === null) return 'No terminal found';
    return screen.textContent || screen.innerText || 'Empty';
  });
  console.log('Terminal content (first 500 chars):');
  console.log(terminalContent.substring(0, 500));

  console.log('10. Checking for "look" in terminal...');
  const hasLook = terminalContent.includes('look');
  console.log(`   Found "look": ${hasLook}`);

  console.log('\n=== RESULTS ===');
  console.log(`Keyboard input reaches terminal: ${hasLook ? 'YES' : 'MAYBE/NO'}`);
  console.log(`Textarea computed style: position=${textareaState.position}, left=${textareaState.left}, top=${textareaState.top}, width=${textareaState.width}, height=${textareaState.height}, opacity=${textareaState.opacity}`);
  console.log(`Textarea is active element: ${textareaState.isActiveElement}`);
  console.log(`Active element: ${textareaState.activeElementTag}.${textareaState.activeElementClass}`);
});
