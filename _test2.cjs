process.env.BROWSE_SERVER_SCRIPT = 'C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\src\\server.ts';
const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== Taking desktop screenshot (1440px) ===');
const desktop = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe viewport 1440x900 screenshot C:\\tmp\\desktop.png', { cwd: 'C:\\my web\\wazuka' });
console.log(desktop.toString());

console.log('=== Taking phone screenshot (390px) ===');
const phone = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe viewport 390x844 screenshot C:\\tmp\\phone.png', { cwd: 'C:\\my web\\wazuka' });
console.log(phone.toString());

console.log('=== Checking browser console errors ===');
const consoleOutput = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe console --errors', { cwd: 'C:\\my web\\wazuka' });
console.log(consoleOutput.toString());

console.log('=== inspecting element ===');
const inspect = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe inspect header', { cwd: 'C:\\my web\\wazuka' });
console.log(inspect.toString());

console.log('=== Checking Tailwind utilities ===');
const TailwindCheck = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe css body background', { cwd: 'C:\\my web\\wazuka' });
console.log(TailwindCheck.toString());

console.log('=== Getting full page text ===');
const text = execSync('C:\\Users\\N0860\\.config\\opencode\\skills\\gstack\\browse\\dist\\browse.exe text', { cwd: 'C:\\my web\\wazuka' });
console.log(text.toString().substring(0, 500));

console.log('=== All checks complete ===');