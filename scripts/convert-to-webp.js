const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imgDir = path.join(__dirname, '../public/img')

async function convertToWebP() {
  const files = fs.readdirSync(imgDir)
  const pngs = files.filter(f => f.endsWith('.png'))

  let converted = 0
  let skipped = 0

  for (const file of pngs) {
    const input = path.join(imgDir, file)
    const output = path.join(imgDir, file.replace('.png', '.webp'))

    if (fs.existsSync(output)) {
      const pngMtime = fs.statSync(input).mtimeMs
      const webpMtime = fs.statSync(output).mtimeMs
      if (webpMtime >= pngMtime) {
        skipped++
        continue
      }
    }

    await sharp(input).webp({ quality: 85 }).toFile(output)
    console.log(`converted: ${file}`)
    converted++
  }

  console.log(`\ndone: ${converted} converted, ${skipped} skipped`)
}

convertToWebP().catch(console.error)
