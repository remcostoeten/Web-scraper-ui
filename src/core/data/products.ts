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

const categories = [
  "Shoes",
  "Accessories",
  "Tops",
  "Shorts",
  "Pants",
  "Home",
  "Electronics",
];
const stores = ["Amazon", "Walmart", "Target"];

export const generateRandomProduct = (): Product => {
  const randomId = Math.max(...initialProducts.map((p) => p.id)) + 1;
  const randomPrice = Math.floor(Math.random() * 300) + 20; // Random price between 20 and 319
  const randomOldPrice = randomPrice + Math.floor(Math.random() * 100) + 10; // Old price is always higher
  const randomDiscount = Math.floor(
    ((randomOldPrice - randomPrice) / randomOldPrice) * 100,
  );

  const randomProduct: Product = {
    id: randomId,
    name: `Random Product ${randomId}`,
    description: `This is a randomly generated product ${randomId}`,
    price: randomPrice,
    oldPrice: randomOldPrice,
    discount: randomDiscount,
    category: categories[Math.floor(Math.random() * categories.length)],
    store: stores[Math.floor(Math.random() * stores.length)],
  };

  return randomProduct;
};

export const addRandomDeal = (products: Product[]): Product[] => {
  const newProduct = generateRandomProduct();
  return [newProduct, ...products];
};
export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Beach Bliss Flip-Flops",
    description: "Comfortable Footwear",
    price: 129.99,
    oldPrice: 2224.99,
    discount: 20,
    category: "Shoes",
    store: "Amazon",
  },
  {
    id: 2,
    name: "Casual Comfort Sneakers",
    description: "Everyday comfortable sneakers",
    price: 149.99,
    oldPrice: 199.99,
    discount: 25,
    category: "Shoes",
    store: "Target",
  },
  {
    id: 3,
    name: "Elegant Evening Gown",
    description: "Perfect for formal events",
    price: 299.99,
    oldPrice: 399.99,
    discount: 40,
    category: "Tops",
    store: "Walmart",
  },
  {
    id: 4,
    name: "Cool Breeze Portable Fan",
    description: "On-the-Go Cooling",
    price: 154.99,
    oldPrice: 19.99,
    discount: 25,
    category: "Accessories",
    store: "Amazon",
  },
  {
    id: 5,
    name: "Summer Breeze T-Shirt",
    description: "Lightweight Cotton Shirt",
    price: 24.99,
    oldPrice: 29.99,
    discount: 16,
    category: "Tops",
    store: "Target",
  },
  {
    id: 6,
    name: "Sunset Beach Shorts",
    description: "Quick-Dry Swim Shorts",
    price: 34.99,
    oldPrice: 44.99,
    discount: 22,
    category: "Shorts",
    store: "Amazon",
  },
  {
    id: 7,
    name: "Sunset Beach Pants",
    description: "Lightweight Cotton Pants",
    price: 299.99,
    oldPrice: 349.99,
    discount: 14,
    category: "Pants",
    store: "Walmart",
  },
  {
    id: 8,
    name: "Sunset Beach Towel",
    description: "Absorbent Cotton Towel",
    price: 19.99,
    oldPrice: 24.99,
    discount: 20,
    category: "Accessories",
    store: "Target",
  },
  {
    id: 9,
    name: "Cozy Cabin Blanket",
    description: "Soft and Warm Blanket",
    price: 49.99,
    oldPrice: 59.99,
    discount: 16,
    category: "Home",
    store: "Amazon",
  },
  {
    id: 10,
    name: "Glow Lamp",
    description: "Ambient Lighting Fixture",
    price: 39.99,
    oldPrice: 49.99,
    discount: 20,
    category: "Home",
    store: "Walmart",
  },
  {
    id: 11,
    name: "Retro Gaming Console",
    description: "Classic Games Remastered",
    price: 99.99,
    oldPrice: 129.99,
    discount: 23,
    category: "Electronics",
    store: "Target",
  },
  {
    id: 12,
    name: "Wireless Earbuds",
    description: "Immersive Audio Experience",
    price: 79.99,
    oldPrice: 99.99,
    discount: 20,
    category: "Electronics",
    store: "Amazon",
  },
  {
    id: 13,
    name: "Smart Home Hub",
    description: "Control Your Connected Devices",
    price: 59.99,
    oldPrice: 79.99,
    discount: 25,
    category: "Electronics",
    store: "Walmart",
  },
  {
    id: 14,
    name: "Outdoor Adventure Backpack",
    description: "Durable and Spacious",
    price: 69.99,
    oldPrice: 89.99,
    discount: 22,
    category: "Accessories",
    store: "Target",
  },
  {
    id: 15,
    name: "Fitness Tracker",
    description: "Monitor Your Activity and Health",
    price: 49.99,
    oldPrice: 59.99,
    discount: 16,
    category: "Accessories",
    store: "Amazon",
  },
  {
    id: 16,
    name: "Stylish Leather Wallet",
    description: "Sleek and Functional",
    price: 29.99,
    oldPrice: 39.99,
    discount: 25,
    category: "Accessories",
    store: "Walmart",
  },
];
