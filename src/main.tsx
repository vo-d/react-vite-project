import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import React from 'react';
import * as ReactDOMClient from 'react-dom/client'; // Import ReactDOMClient for newer React versions
import reactToWebcomponent from 'react-to-webcomponent';

import MyComponent from './myComponent';
import AddPostComponent from './addPostComponent';

// Convert the React component to a web component
const WebComponent = reactToWebcomponent(MyComponent, React, ReactDOMClient);
const AddPostWebComponent = reactToWebcomponent(AddPostComponent, React, ReactDOMClient);

// Define the custom element (web component) with the tag <my-component>
customElements.define('my-component', WebComponent);
customElements.define('add-post-component', AddPostWebComponent);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
