const fs = require('fs')
const path = require('path')
const { PNG } = require('pngjs')

function colorDistance(r1,g1,b1, r2,g2,b2) {
  const dr = r1-r2
  const dg = g1-g2
  const db = b1-b2
  return Math.sqrt(dr*dr + dg*dg + db*db)
}

async function removeYellow() {
  const src = path.join(__dirname, '../components/Helper/logo.png')
  const out = path.join(__dirname, '../components/Helper/logo-transparent.png')

  const data = fs.readFileSync(src)
  const png = PNG.sync.read(data)
  const { width, height, data: buf } = png

  const target = { r: 245, g: 158, b: 11 } // #f59e0b
  const threshold = 80

  for (let y=0; y<height; y++) {
    for (let x=0; x<width; x++) {
      const idx = (width*y + x) << 2
      const r = buf[idx]
      const g = buf[idx+1]
      const b = buf[idx+2]
      const a = buf[idx+3]

      if (colorDistance(r,g,b, target.r, target.g, target.b) < threshold) {
        // set alpha 0
        buf[idx+3] = 0
      }
    }
  }

  const output = PNG.sync.write(png)
  fs.writeFileSync(out, output)
  console.log('Wrote', out)
}

removeYellow().catch(e => { console.error(e); process.exit(1) })
