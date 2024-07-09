export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  store: string;
}

export const initialProducts: Product[] = [
  // Your initial product data here
];

export const generateRandomProduct = (existingProducts: Product[]): Product => {
  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Accessories",
    "Shorts",
    "Pants",
  ];
  const stores = ["Amazon", "Walmart", "Target", "Best Buy", "Macy's"];
  const randomId = Math.floor(Math.random() * 10000) + existingProducts.length;
  const randomPrice = Math.floor(Math.random() * 500) + 50;
  const randomOldPrice = randomPrice + Math.floor(Math.random() * 200) + 50;

  return {
    id: randomId,
    name: `Product ${randomId}`,
    description: `This is a randomly generated product ${randomId}`,
    price: randomPrice,
    oldPrice: randomOldPrice,
    discount: Math.floor(
      ((randomOldPrice - randomPrice) / randomOldPrice) * 100,
    ),
    category: categories[Math.floor(Math.random() * categories.length)],
    store: stores[Math.floor(Math.random() * stores.length)],
  };
};
