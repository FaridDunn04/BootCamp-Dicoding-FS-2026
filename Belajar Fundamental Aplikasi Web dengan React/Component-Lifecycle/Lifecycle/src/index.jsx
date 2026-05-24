import { getRestaurants } from './api';
import { displayRestaurants } from './dom-manipulation';
import './index.css';

(async () => {
  const restaurant = await getRestaurants();
  displayRestaurants(restaurant);
})();
