const assert = require('assert');
const fs = require('fs');
const path = require('path');

function read(relativePath) {
  return fs.readFileSync(path.join(__dirname, '..', relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(path.join(__dirname, '..', relativePath));
}

function test(name, fn) {
  try {
    fn();
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}

const homeSource = read('src/pages/index.tsx');
const choosePathStyles = read('src/components/HomePage/ChoosePath/styles.module.css');

test('home page no longer renders the removed marketing sections', () => {
  [
    'Painpoint',
    'WhyChoose',
    'Comparison',
    '<Painpoint />',
    '<WhyChoose />',
    '<Comparison',
  ].forEach((token) => {
    assert.ok(!homeSource.includes(token), `Expected homepage to remove ${token}.`);
  });
});

test('removed homepage marketing section files are deleted', () => {
  [
    'src/components/HomePage/Painpoint/index.tsx',
    'src/components/HomePage/Painpoint/styles.module.css',
    'src/components/HomePage/Whychoose/index.tsx',
    'src/components/HomePage/Whychoose/styles.module.css',
    'src/components/HomePage/Comparison/index.tsx',
    'src/components/HomePage/Comparison/styles.module.css',
  ].forEach((relativePath) => {
    assert.ok(!exists(relativePath), `Expected ${relativePath} to be deleted.`);
  });
});

test('remaining homepage sections do not compose styles from deleted files', () => {
  [
    '../Whychoose/styles.module.css',
    '../Painpoint/styles.module.css',
    '../Comparison/styles.module.css',
  ].forEach((token) => {
    assert.ok(!choosePathStyles.includes(token), `Expected ChoosePath styles to stop importing ${token}.`);
  });
});

console.log('home section removal tests passed');
