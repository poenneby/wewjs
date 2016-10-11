
const expect = require("chai").expect;

const Item = require("./gilded_rose").Item;
const update_quality = require("./gilded_rose").update_quality;

describe("Gilded Rose", function() {

  describe("General items", () => {
    it("quality and sell_in date should decrease at the end of each day", () => {
      const items = [new Item("Toast", 3, 3)];
      update_quality(items);
      expect(items[0].quality).to.equals(2);
      expect(items[0].sell_in).to.equals(2);
    });

    it("quality decreases twice as fast once sell by date has passed", () => {
      const items = [new Item("Toast", 0, 4)];
      update_quality(items);
      expect(items[0].quality).to.equals(2);
      expect(items[0].sell_in).to.equals(-1);
    });

    it("quality of an item is never negative", () => {
      const items = [new Item("Toast", 0, 0)];
      update_quality(items);
      expect(items[0].quality).to.equals(0);
      expect(items[0].sell_in).to.equals(-1);
    });

    it("quality of an item is never more than 50", () => {
      const items = [new Item("Aged Brie", 0, 50)];
      update_quality(items);
      expect(items[0].quality).to.equals(50);
    });
  });

  describe("Aged Brie", () => {
    it("should increase in quality the older it gets", () => {
      const items = [new Item("Aged Brie", 3, 1)];
      update_quality(items);
      expect(items[0].quality).to.equals(2);
    });
  });

  describe("Sulfuras", () => {
    it("should never decrease in quality", () => {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 3, 1)];
      update_quality(items);
      expect(items[0].sell_in).to.equals(3);
      expect(items[0].quality).to.equals(1);
    });
  });

  describe("Backstage passes increase in quality as sell by date approaches", () => {
    it("should increase by 2 when 10 or less days before concert", () => {
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1)];
      update_quality(items);
      expect(items[0].sell_in).to.equals(10);
      expect(items[0].quality).to.equals(2);
      update_quality(items);
      expect(items[0].sell_in).to.equals(9);
      expect(items[0].quality).to.equals(4);
    });

    it("should increase by 3 when 5 or less days before concert", () => {
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 1)];
      update_quality(items);
      expect(items[0].sell_in).to.equals(5);
      expect(items[0].quality).to.equals(3);
      update_quality(items);
      expect(items[0].sell_in).to.equals(4);
      expect(items[0].quality).to.equals(6);
    });

    it("should drop quality to 0 after concert has passed", () => {
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)];
      update_quality(items);
      expect(items[0].quality).to.equals(0);
    });
  });

});
