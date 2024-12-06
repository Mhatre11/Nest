import cocaCola from '../../assets/ColdDrinks_Juices/Coca-Cola_DietCoke.avif';
import sprite from '../../assets/ColdDrinks_Juices/Sprite_Drink.avif';
import nimbooz from '../../assets/ColdDrinks_Juices/7UP_Nimbooz.avif';
import buttermilk from '../../assets/ColdDrinks_Juices/AmulMasti_Buttermilk.avif';
import water from '../../assets/ColdDrinks_Juices/Bisleri_Packaged_water.avif';
import soda from '../../assets/ColdDrinks_Juices/Bisleri_SodaWater.avif';
import ice from '../../assets/ColdDrinks_Juices/Party_IceCube.avif';

export const coldDrinks = [
  {
    id: 1,
    name: "Diet Coke",
    image: cocaCola,
    quantity: "300ml",
    price: 40,
  },
  {
    id: 2,
    name: "Sprite",
    image: sprite,
    quantity: "600ml",
    price: 35,
  },
  {
    id: 3,
    name: "7UP Nimbooz",
    image: nimbooz,
    quantity: "250ml",
    price: 20,
  },
  {
    id: 4,
    name: "Amul Masti Buttermilk",
    image: buttermilk,
    quantity: "1L",
    price: 65,
  },
  {
    id: 5,
    name: "Bisleri Packaged Water",
    image: water,
    quantity: "1L",
    price: 20,
  },
  {
    id: 6,
    name: "Bisleri Soda Water",
    image: soda,
    quantity: "750ml",
    price: 25,
  },
  {
    id: 7,
    name: "Party Ice Cubes",
    image: ice,
    quantity: "500g",
    price: 30,
  }
];
