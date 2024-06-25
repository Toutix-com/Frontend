// src/mocks/browser.js
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
const swUrl = './service-worker.js'; // Adjust the path based on your project structure
