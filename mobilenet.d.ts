// This file will add both p5 instanced and global intellisense 
import module = require('@tensorflow-models/mobilenet');

export = module;
export as namespace mobilenet;
declare global {
    interface Window {
        mobilenet: typeof module
    }
}