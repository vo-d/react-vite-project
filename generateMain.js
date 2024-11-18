import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { parse } from '@babel/parser';

// Get the current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory where your components are stored
const componentsDir = resolve(__dirname, 'src');

// Path to the main.tsx file
const outputFile = resolve(componentsDir, 'main.tsx');

// Template for new components
const generateComponentCode = (component) => `
import ${component.name} from './${component.fileName.replace(
  /\.tsx$/,
  ''
)}';

const ${component.name}WebComponent = reactToWebcomponent(${component.name}, React, ReactDOMClient);
customElements.define('${component.tagName}', ${component.name}WebComponent);
`;

// Scan the components directory for .tsx files

const scanComponents = () => {
  const files = readdirSync(componentsDir);
  const components = [];
  
  files
    .filter((file) => file.endsWith('.tsx') && !file.startsWith('main') && !file.startsWith('App'))
    .forEach((file) => {
      const filePath = resolve(componentsDir, file);
      const code = readFileSync(filePath, 'utf-8');
      const ast = parse(code, { sourceType: 'module', plugins: ['typescript', 'jsx'] });

      let functionName = null;

      // Traverse the AST to find exported function names
      ast.program.body.forEach((node) => {
        if (node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'Identifier') {
          // Extract the name of the default exported function
          functionName = node.declaration.name;
        }
      });

      if (functionName) {
        const tagName = functionName.replace(/[A-Z]/g, (letter, index) =>
          index === 0 ? letter.toLowerCase() : `-${letter.toLowerCase()}`
        );
        components.push({ name: functionName, fileName: file, tagName });
      }
    });
  return components;
};

// Check if a component is already defined in the file
const contentIsAlreadyDefined = (content, component) =>{
  content.includes(`customElements.define('${component.tagName}',`);
}

// Main script execution
const updateMainFile = () => {
  const components = scanComponents();

  // Read the existing file content
  let existingContent = '';
  try {
    existingContent = readFileSync(outputFile, 'utf-8');
  } catch (err) {
    console.error(`Failed to read ${outputFile}:`, err);
    process.exit(1);
  }

  // Generate code only for new components
  let newContent = '';
  components.forEach((component) => {
    if (!contentIsAlreadyDefined(existingContent, component)) {
      newContent += generateComponentCode(component);
    }
  });

  if (newContent) {
    // Append the new code to the existing file content
    const fixContent = `
import React from 'react';
import * as ReactDOMClient from 'react-dom/client'; // Import ReactDOMClient for newer React versions
import reactToWebcomponent from 'react-to-webcomponent';    
    `
    const updatedContent = existingContent + fixContent + newContent;
    writeFileSync(outputFile, updatedContent);
    console.log(
      `Updated ${outputFile} with the following new components:`,
      components.map(({ name }) => name).join(', ')
    );
  } else {
    console.log('No new components to add.');
  }
};

updateMainFile();
