import { fileURLToPath } from 'url';
import path from 'path';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../..');
const uploadsDir = path.join(rootDir, 'uploads');

export const paths = {
  root: rootDir,
  uploads: uploadsDir
};