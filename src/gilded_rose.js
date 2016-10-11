function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

function update_quality(items) {

  items.map((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') {
      return;
    }

    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        item.quality--;
      }
    } else {
      if (item.quality < 50) {
        item.quality++;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert' && item.quality < 50) {
          if (item.sell_in < 11) {
            item.quality++;
          }
          if (item.sell_in < 6) {
            item.quality++;
          }
        }
      }
    }
    item.sell_in--;
    // Expired items
    if (item.sell_in < 0) {
      if (item.name === 'Aged Brie' && item.quality <= 50) {
        item.quality++;
      }
      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        item.quality = 0;
      } else {
        if (item.quality > 0) {
          item.quality--;
        }
      }

    }
  });
}

module.exports = {
  Item,
  update_quality
}
