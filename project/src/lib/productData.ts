export interface Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: string;
  badge?: string;
  sizes: string[];
  availableSizes: string[];
  lore: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Eyes on Fire – Midnight Drop",
    description: "Glow-in-the-dark streetwear for the night warriors",
    images: [
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504189/1-clearbg_ihcrv8.webp",
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504189/2-clearbg_tgydbl.webp"
    ],
    price: "599",
    badge: "NEW",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    availableSizes: ["Small", "Medium", "Large", "Extra Large"],
    lore: "The Eyes on Fire is more than just a piece of fabric. It represents a symbol of boldness and night energy. Adorned with glow-in-the-dark prints, this uniform is a statement of identity, a badge of honor that signifies your commitment to the night."
  },
  {
    id: 2,
    name: "Fatebound",
    description: "Dark aesthetics for the bold and fearless",
    images: [
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504392/1-bgremove_aufmkt.webp",
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504392/2-bgremove_xwplus.webp"
    ],
    price: "599",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    availableSizes: ["Small", "Medium", "Large", "Extra Large"],
    lore: "Fatebound is for those who embrace the unknown. Its dark aesthetic is a tribute to the fearless and the bold."
  },
  {
    id: 3,
    name: "Heaven's Last Puff",
    description: "Premium basics with a modern twist",
    images: [
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504477/2-bgremove_qxr10x.webp",
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504476/1-bgremove_w1vsby.webp"
    ],
    price: "599",
    badge: "BESTSELLER",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    availableSizes: ["Small", "Medium", "Large", "Extra Large"],
    lore: "Heaven's Last Puff is a premium basic with a twist. The design is inspired by the fleeting moments of bliss and the modern lifestyle."
  },
  {
    id: 4,
    name: "Overwhelmed Tee – Constricted Edition.",
    description: "Futuristic designs meet street culture",
    images: [
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504546/1-bgremove_qi1bb5.webp",
      "https://res.cloudinary.com/dueddncka/image/upload/v1751504547/2-bgremove_ojqvlo.webp"
    ],
    price: "599",
    sizes: ["Small", "Medium", "Large", "Extra Large"],
    availableSizes: ["Small", "Medium", "Large", "Extra Large"],
    lore: "The Overwhelmed Tee is a fusion of future and street. Its design speaks to the constricted yet expressive energy of urban life."
  }
]; 