const { Jimp } = require('jimp');

(async () => {
  for (let i = 1; i <= 5; i++) {
    const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const img = await new Jimp(1200, 800, color);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    img.print(
      font,
      0,
      0,
      { text: `Frame ${i}`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE },
      img.bitmap.width,
      img.bitmap.height
    );
    await img.writeAsync(`public/components/Home/Mirai_Grace/${i}.png`);
    console.log('wrote', `${i}.png`);
  }
  console.log('done');
})();