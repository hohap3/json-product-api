import fs from 'fs';
import { dataJson } from './data.js';
// main
(() => {
  fs.writeFile('./db.json', JSON.stringify(dataJson()), () => {
    console.log('Generate file successfully');
  });
})();
