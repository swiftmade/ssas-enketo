const Compressor = require('compressorjs')

module.exports = (file, maxWidth) => {
  return new Promise((resolve, reject) => {
    // Find parameters here:
    // https://github.com/fengyuanchen/compressorjs    
    const outputOptions = {
      maxWidth,
      quality: 0.6,
      convertSize: Infinity,
    }
    // Create and fire compressor instance
    new Compressor(file, {
      ...outputOptions,
      success: resolve,
      error: reject,
    })
  })
}