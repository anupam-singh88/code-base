import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const customDirName = fileURLToPath(import.meta.url);
// export const __filename = fileURLToPath(import.meta.url);
// export const rootDir = dirname(__dirname);
// export const rootFile = __filename;
// export const rootPath = rootDir;