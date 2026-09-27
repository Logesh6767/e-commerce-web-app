/**
 * Patches rollup native.js to fall back to @rollup/wasm-node
 * when the native .node binary is blocked by Windows Application Control policies.
 */
const fs = require('fs');
const path = require('path');

const nativePath = path.join(__dirname, 'node_modules', 'rollup', 'dist', 'native.js');

if (!fs.existsSync(nativePath)) {
  console.log('rollup native.js not found, skipping patch.');
  process.exit(0);
}

let content = fs.readFileSync(nativePath, 'utf8');

if (content.includes('@rollup/wasm-node')) {
  console.log('rollup native.js already patched.');
  process.exit(0);
}

const original = `const nativeModule = requireWithFriendlyError(
\texistsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`
);`;

const patched = `let nativeModule;
try {
\tnativeModule = requireWithFriendlyError(
\t\texistsSync(path.join(__dirname, localName)) ? localName : \`@rollup/rollup-\${packageBase}\`
\t);
} catch {
\ttry {
\t\tnativeModule = require('@rollup/wasm-node');
\t} catch {
\t\tthrow new Error(
\t\t\t'Cannot load native Rollup module and @rollup/wasm-node fallback is not installed. ' +
\t\t\t'Please install it with: npm install @rollup/wasm-node'
\t\t);
\t}
}`;

if (content.includes(original)) {
  content = content.replace(original, patched);
  fs.writeFileSync(nativePath, content, 'utf8');
  console.log('Successfully patched rollup native.js for WASM fallback.');
} else {
  console.log('Could not find expected code block in native.js. Patch may already be applied or rollup version changed.');
}
