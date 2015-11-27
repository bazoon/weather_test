export class CitiesArray {
  constructor(cities = []) {
    this.cities = [];
    this.selectedIndex = 0;

    if (cities.length > 0) {
      this.load(cities);
    }
  }

  load(cities) {
    cities.forEach((city) => {
      this.cities.push(city);
    });
    this.selectedIndex = 0;
  }

  add(city) {
    this.cities.push(city);
    this.setSelected(this.cities.length - 1);
  }

  remove() {
    if (this.cities.length > 0 && this.selectedIndex >= 0) {
      this.cities.splice(this.selectedIndex, 1);
    }
    this.updateCitiesIndexes();
    this.selectedIndex = 0;
  }

  updateCitiesIndexes() {
    this.cities.forEach(function (city, index) {
      city.payload = index;
    });
  }

  setSelected(index) {
    this.selectedIndex = index;
  }

  getCurrentCity() {
    return this.cities[this.selectedIndex];
  }


  
}