import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Review {
  user: string;
  comment: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  category: string;
  links: string[];
  reviews: Review[];
}

// Initial products array
const products = [
  {
    id: 1, name: 'FUJEAK Men Walking Shoes', description: 'Casual Breathable Running Shoes Sport Athletic Sneakers Gym Tennis Slip On Comfortable Lightweight Shoes for Jogging Mesh',
    photoUrl: 'https://m.media-amazon.com/images/I/517A6LNjccL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product1', 'https://www.amazon.com/product1'],
    reviews: [
      { user: 'John Doe', comment: 'Great product! Highly recommend.' },
      { user: 'Jane Smith', comment: 'Good value for the price.' },
      { user: 'Michael Johnson', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Emily Davis', comment: 'Solid performance, but a bit pricey.' },
      { user: 'William Brown', comment: 'Exactly what I needed for my project.' },
      { user: 'Olivia Wilson', comment: 'Exactly what I needed for my project.' },
      { user: 'James Miller', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 2, name: 'EGMPDA Men Running Sports Shoes', description: 'Walking Gym Fashion Sneakers Slip On Jogging Training Shoes Athletic',
    photoUrl: 'https://m.media-amazon.com/images/I/61g-hQG0reL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product2', 'https://www.amazon.com/product2'],
    reviews: [
      { user: 'Sophia Moore', comment: 'Great product! Highly recommend.' },
      { user: 'Robert Taylor', comment: 'Good value for the price.' },
      { user: 'Emma Anderson', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'David Thomas', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Olivia Jackson', comment: 'Exactly what I needed for my project.' },
      { user: 'Joseph White', comment: 'Exactly what I needed for my project.' },
      { user: 'Sophia Harris', comment: 'Exactly what I needed for my project.' },
      { user: 'Charles Martin', comment: 'Exactly what I needed for my project.' },
      { user: 'Emma Clark', comment: 'Exactly what I needed for my project.' },
      { user: 'Joseph Lewis', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 3, name: 'Viraduckt Women Athletic Sneakers', description: 'Lightweight Road Running Shoes Casual Walking Shoes Comfortable Gym Shoe Fashion Tennis Womens Shoes',
    photoUrl: 'https://m.media-amazon.com/images/I/51vm0VdTKiL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product3', 'https://www.amazon.com/product3'],
    reviews: [
      { user: 'Mia Young', comment: 'Great product! Highly recommend.' },
      { user: 'Daniel Hall', comment: 'Good value for the price.' },
      { user: 'Ava Allen', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Matthew Hernandez', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Sophia King', comment: 'Exactly what I needed for my project.' },
      { user: 'Andrew Wright', comment: 'Exactly what I needed for my project.' },
      { user: 'Emma Lopez', comment: 'Exactly what I needed for my project.' },
      { user: 'Joseph Hill', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Scott', comment: 'Exactly what I needed for my project.' },
      { user: 'Anthony Green', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Adams', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 4, name: 'Under Armour Mens Charged Assert 9 Running Shoes Running Shoe', description: 'Lightweight mesh upper with 3-color digital print delivers complete breathability',
    photoUrl: 'https://m.media-amazon.com/images/I/414egjgn-uL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product4', 'https://www.amazon.com/product4'],
    reviews: [
      { user: 'Steven Baker', comment: 'Great product! Highly recommend.' },
      { user: 'Emma Nelson', comment: 'Good value for the price.' },
      { user: 'Brian Carter', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Mitchell', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Kevin Roberts', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Perez', comment: 'Exactly what I needed for my project.' },
      { user: 'George Turner', comment: 'Exactly what I needed for my project.' },
      { user: 'Emma Phillips', comment: 'Exactly what I needed for my project.' },
      { user: 'Edward Campbell', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Parker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ryan Evans', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Edwards', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 5, name: 'DaoLxi Mens Running Walking', description: 'Tennis Gym Athletic Shoes Fashion Sneakers Casual Ligthweight Workout Sports Shoes Comfortable Breathable Slip on Shoes for Jogging',
    photoUrl: 'https://m.media-amazon.com/images/I/61SgsdQ0w0L._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product5', 'https://www.amazon.com/product5'],
    reviews: [
      { user: 'Patrick Collins', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Stewart', comment: 'Good value for the price.' },
      { user: 'Alexander Sanchez', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Morris', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Benjamin Rogers', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Reed', comment: 'Exactly what I needed for my project.' },
      { user: 'Samuel Cook', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Richard Kelly', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Bell', comment: 'Exactly what I needed for my project.' },
      { user: 'Jeffrey Howard', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Ward', comment: 'Exactly what I needed for my project.' },
      { user: 'Raymond Brooks', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 6, name: 'Neutrogena Rapid Wrinkle Repair Regenerating Cream', description: 'Retinol Face & Eye Moisturizer - Hyaluronic Acid Serum- 48 mL',
    photoUrl: 'https://m.media-amazon.com/images/I/61p44nFyHXL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product6', 'https://www.amazon.com/product6'],
    reviews: [
      { user: 'Mia Bailey', comment: 'Great product! Highly recommend.' },
      { user: 'Joe Sanders', comment: 'Good value for the price.' },
      { user: 'Ava Hughes', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Frank Ramirez', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Price', comment: 'Exactly what I needed for my project.' },
      { user: 'Gregory Bennett', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Wood', comment: 'Exactly what I needed for my project.' },
      { user: 'Stephen Foster', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Barnes', comment: 'Exactly what I needed for my project.' },
      { user: 'Patrick Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fisher', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 7, name: 'Celor Under Eye Patches for Puffy Eyes and Dark Circles', description: 'Eye Masks with Amino Acids & Collagen, Eye Care for Wrinkles - Birthday Gift for Women - Skincare Self Care - USA Tested (20 Pairs)',
    photoUrl: 'https://m.media-amazon.com/images/I/61GntpJ5ISL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product7', 'https://www.amazon.com/product7'],
    reviews: [
      { user: 'Dennis Castillo', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Flores', comment: 'Good value for the price.' },
      { user: 'Eric Torres', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Peterson', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Brett Webster', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gray', comment: 'Exactly what I needed for my project.' },
      { user: 'Frederick Schmidt', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Cooper', comment: 'Exactly what I needed for my project.' },
      { user: 'Albert Reyes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Hughes', comment: 'Exactly what I needed for my project.' },
      { user: 'Carlos Murphy', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Long', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 8, name: '[PKY] Pyunkang Yul Calming Moisture Barrier Cream', description: 'Instantly Soothes Sensitive Skin, Hyaluronic Acid & Ceramide for Hydration, Vegan, Korean Skincare (1.69 Fl. Oz, 50ml)',
    photoUrl: 'https://m.media-amazon.com/images/I/61LbODWkJcL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product8', 'https://www.amazon.com/product8'],
    reviews: [
      { user: 'Russell Myers', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Ross', comment: 'Good value for the price.' },
      { user: 'Vincent Boyd', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Cole', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Philip Maxwell', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Stone', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Sandoval', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Hawkins', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Luna', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Rhodes', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Salazar', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Hunt', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Hampton', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 9, name: 'Skin Medica Aha/Bha Cream', description: '(for All Skin Types), 2 ounces',
    photoUrl: 'https://m.media-amazon.com/images/I/51pSBe+Do8L._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product9', 'https://www.amazon.com/product9'],
    reviews: [
      { user: 'Mia Black', comment: 'Great product! Highly recommend.' },
      { user: 'Gerald Lamb', comment: 'Good value for the price.' },
      { user: 'Ava Daniels', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Milton Guerrero', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Palmer', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean George', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Dunn', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Sims', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Perkins', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Lyons', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simpson', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Alexander', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Butler', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 10, name: 'Saturday Skin Yuzu Vitamin C Sleep Overnight Face Mask Skin Care ', description: 'Retinol Niacinamide Face Moisturizer Brightening sleeping mask, Korean skin care, Vegan Smooth Skin and Reduce Wrinkles Korean skincare product',
    photoUrl: 'https://m.media-amazon.com/images/I/71H25hFegNL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product10', 'https://www.amazon.com/product10'],
    reviews: [
      { user: 'Brett Patterson', comment: 'Great product! Highly recommend.' },
      { user: 'Ava McDonald', comment: 'Good value for the price.' },
      { user: 'Derek Morgan', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Roberts', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Harold Fuller', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fox', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Vargas', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Benson', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Chen', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Warner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Wong', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Castillo', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Romero', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 11, name: 'Wonderskin Wonder Blading One Step Red Lip Stain Masque', description: 'Natural Lip Stain Long Lasting Waterproof, Transfer Proof Lip Tint (Romance Masque)',
    photoUrl: 'https://m.media-amazon.com/images/I/71vJnDIdPTL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product11', 'https://www.amazon.com/product11'],
    reviews: [
      { user: 'Ava Santos', comment: 'Great product! Highly recommend.' },
      { user: 'Kenneth Combs', comment: 'Good value for the price.' },
      { user: 'Mia Ellis', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Eugene Andrews', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Webb', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Coleman', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Snyder', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simmons', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Obrien', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Lawson', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Reyes', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 12, name: 'e.l.f. Flawless Finish Foundation', description: 'Lightweight & Medium Coverage, Semi-Matte Finish, Vanilla, 0.68 Fl Oz (20mL)',
    photoUrl: 'https://m.media-amazon.com/images/I/5126WYkUL7L._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product12', 'https://www.amazon.com/product12'],
    reviews: [
      { user: 'Randy Stephens', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Lucas', comment: 'Good value for the price.' },
      { user: 'Gerald Mitchell', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Crawford', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Milton Olson', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Harrison', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Cardenas', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mendoza', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Navarro', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gordon', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Murray', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lloyd', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Cunningham', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Keller', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 13, name: 'e.l.f. Poreless Face Primer', description: 'Makeup Primer For A Flawless, Smooth Canvas, Gives Makeup Lasting Power, Infused With Tea Tree',
    photoUrl: 'https://m.media-amazon.com/images/I/514N8km4BsL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product13', 'https://www.amazon.com/product13'],
    reviews: [
      { user: 'Brett Klein', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Saunders', comment: 'Good value for the price.' },
      { user: 'Derek Guzman', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Jennings', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Harold Noble', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fitzgerald', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Joyce', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Davenport', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Conner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mcguire', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Sutton', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Barker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Moss', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Rowland', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 14, name: 'Maybelline New York Lash Sensational Sky High Washable Eyelash Mascara Makeup', description: 'Volumizing, Lengthening, Defining, Curling, Multiplying, Buildable Formula, Very Black, 7.2 ml',
    photoUrl: 'https://m.media-amazon.com/images/I/61XoW336RML._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product14', 'https://www.amazon.com/product14'],
    reviews: [
      { user: 'Mia Portillo', comment: 'Great product! Highly recommend.' },
      { user: 'Eugene Le', comment: 'Good value for the price.' },
      { user: 'Ava Lucero', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Victor Barrera', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Vang', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Ho', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Kemp', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Galvan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Archuleta', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Buchanan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mccarthy', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Good', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wise', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Briggs', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Coffey', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 15, name: 'Wet n Wild Always Naked Palette Always Nude', description: 'Palette of warm and cool nude pigments in matte, shimmer, and glitter finishes.',
    photoUrl: 'https://m.media-amazon.com/images/I/71-ekZvH8qL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product15', 'https://www.amazon.com/product15'],
    reviews: [
      { user: 'Milton Noel', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Stark', comment: 'Good value for the price.' },
      { user: 'Sean Leblanc', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Stout', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Kenneth Godfrey', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cornell', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Potter', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Nielsen', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Love', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cheng', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Burgess', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Rocha', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Choi', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Shah', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Molina', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 16, name: 'Gold Stainless Steel Desk with Top Tempered Clear Glass', description: 'Contemporary Minimalist Office Furniture, 47.2" L x 25.6" W x 29.9" H, Home Offices, Living Rooms, Bedrooms, Study Area - Gold',
    photoUrl: 'https://m.media-amazon.com/images/I/41HGr+LA+RL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product16', 'https://www.amazon.com/product16'],
    reviews: [
      { user: 'Ava Schroeder', comment: 'Great product! Highly recommend.' },
      { user: 'Randy Nolan', comment: 'Good value for the price.' },
      { user: 'Mia Esparza', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Gerald French', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Charles', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Sloan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcconnell', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Bradford', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Wolfe', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Christensen', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Malone', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Preston', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Sherman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Ayers', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 17, name: 'Farmhouse End Table', description: '24" Large Sofa Side Table with Charging Station Glass Barn Door,Wood Nightstand with Adjustable Storage Shelf,Square Bedside Table for Living Room,Bedroom,Office-White',
    photoUrl: 'https://m.media-amazon.com/images/I/81-Ki6K56vL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product17', 'https://www.amazon.com/product17'],
    reviews: [
      { user: 'Brett Shea', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Fuentes', comment: 'Good value for the price.' },
      { user: 'Derek Potts', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Hurst', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Harold Mcclain', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava McCullough', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Oneal', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Parsons', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Fischer', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Montes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Kent', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Vaughan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Bates', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Goldberg', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 18, name: 'HOMCOM Slim End Table with 2 Drawers and Storage Shelf', description: 'Sofa Side Table for Living Room, Narrow Nightstand for Small Spaces, White',
    photoUrl: 'https://m.media-amazon.com/images/I/51sHgnC+sHL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product18', 'https://www.amazon.com/product18'],
    reviews: [
      { user: 'Mia Mcclure', comment: 'Great product! Highly recommend.' },
      { user: 'Eugene Robbins', comment: 'Good value for the price.' },
      { user: 'Ava Landry', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Victor Leblanc', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Conley', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Valenzuela', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Christian', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Maldonado', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wall', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Case', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Delacruz', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Sparks', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Eaton', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Norton', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mckee', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 19, name: 'Wolawu End Table 3 Tiers Shelf Rustic Brown Wood Industrial Accent Decorative Sofa Side Table ', description: 'Modern Trapezoid Accent Furniture Living Room Bed Room for Small Place',
    photoUrl: 'https://m.media-amazon.com/images/I/71T5fLj-LzL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product19', 'https://www.amazon.com/product19'],
    reviews: [
      { user: 'Milton Mansfield', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Solis', comment: 'Good value for the price.' },
      { user: 'Sean Schwartz', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Phelps', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Kenneth Barton', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cline', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Goodman', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Hanna', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Coleman', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Snyder', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simmons', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Obrien', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Lawson', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 20, name: 'UDEAR 5-Tier Kitchen Rolling Utility Cart', description: 'Multifunction Storage Organizer with Handle and 2 Lockable Wheels for Kitchen,Bathroom,Living Room,Office,White',
    photoUrl: 'https://m.media-amazon.com/images/I/71UzN-1FdVL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product20', 'https://www.amazon.com/product20'],
    reviews: [
      { user: 'Randy Stephens', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Lucas', comment: 'Good value for the price.' },
      { user: 'Gerald Mitchell', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Crawford', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Milton Olson', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Harrison', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Cardenas', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mendoza', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Navarro', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gordon', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Murray', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lloyd', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Cunningham', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Keller', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Klein', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 21, name: 'EQAO Grade 6 Math Test Prep - EQAO Grade 6 Ontario Math and Language Practice Book', description: 'Prepare your child for academic success with the "EQAO Grade 6 Math Test Prep: EQAO Grade 6 Ontario Math and Language Practice Book.',
    photoUrl: 'https://m.media-amazon.com/images/I/61RBtwtU0VL._AC_UL640_FMwebp_QL65_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product21', 'https://www.amazon.com/product21'],
    reviews: [
      { user: 'Ava Saunders', comment: 'Great product! Highly recommend.' },
      { user: 'Derek Guzman', comment: 'Good value for the price.' },
      { user: 'Mia Jennings', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Harold Noble', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Fitzgerald', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Joyce', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Davenport', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Conner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mcguire', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Sutton', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Barker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Moss', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Rowland', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Portillo', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 22, name: 'Dynamic Math Workbook', description: 'Complete Grade 9 Mathematics Curriculum (AB, SK, MB, NU, NT, PE, NB, & NL Edition)',
    photoUrl: 'https://m.media-amazon.com/images/I/81ffHjYhaXL._AC_SX522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product22', 'https://www.amazon.com/product22'],
    reviews: [
      { user: 'Eugene Le', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Lucero', comment: 'Good value for the price.' },
      { user: 'Victor Barrera', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Vang', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Brett Ho', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Kemp', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Galvan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Archuleta', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Buchanan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mccarthy', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Good', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wise', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Briggs', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Coffey', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Noel', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 23, name: 'EQAO Grade 3 Math Test Prep - EQAO Grade 3 Ontario Math and Language Practice Book', description: 'Prepare your child for success with the comprehensive "EQAO Grade 3 Math Test Prep: EQAO Grade 3 Ontario Math and Language Practice Book.',
    photoUrl: 'https://m.media-amazon.com/images/I/61BPiV6E2vL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product23', 'https://www.amazon.com/product23'],
    reviews: [
      { user: 'Mia Stark', comment: 'Great product! Highly recommend.' },
      { user: 'Sean Leblanc', comment: 'Good value for the price.' },
      { user: 'Ava Stout', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Kenneth Godfrey', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Cornell', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Potter', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Nielsen', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Love', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cheng', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Burgess', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Rocha', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Choi', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Shah', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Molina', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Schroeder', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 24, name: 'Math Workbook Grade 2', description: '100 Pages of Addition, Subtraction, and Beginning Multiplication, Division, Fraction',
    photoUrl: 'https://m.media-amazon.com/images/I/71wTgL+1KqL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product24', 'https://www.amazon.com/product24'],
    reviews: [
      { user: 'Randy Nolan', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Esparza', comment: 'Good value for the price.' },
      { user: 'Gerald French', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Charles', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Milton Sloan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcconnell', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Bradford', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Wolfe', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Christensen', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Malone', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Preston', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Sherman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Ayers', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Shea', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 25, name: 'Workman Publishing Company', description: 'To Ace Math in One Big Fat Notebook',
    photoUrl: 'https://m.media-amazon.com/images/I/81ULeb51cmL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product25', 'https://www.amazon.com/product25'],
    reviews: [
      { user: 'Ava Fuentes', comment: 'Great product! Highly recommend.' },
      { user: 'Derek Potts', comment: 'Good value for the price.' },
      { user: 'Mia Hurst', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Harold Mcclain', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava McCullough', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Oneal', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Parsons', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Fischer', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Montes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Kent', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Vaughan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Bates', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Goldberg', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcclure', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 26, name: 'The Math Book', description: 'a fresh and vibrant take on the topic through eye-catching graphics and diagrams to immerse yourself in',
    photoUrl: 'https://m.media-amazon.com/images/I/9163EshuAgL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product26', 'https://www.amazon.com/product26'],
    reviews: [
      { user: 'Eugene Robbins', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Landry', comment: 'Good value for the price.' },
      { user: 'Victor Leblanc', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Conley', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Brett Valenzuela', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Christian', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Maldonado', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wall', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Case', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Delacruz', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Sparks', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Eaton', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Norton', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mckee', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mansfield', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 27, name: 'Complete MathSmart: Grade 6', description: 'provides plenty of interesting and systematic practice for developing and improving your child’s math skills',
    photoUrl: 'https://m.media-amazon.com/images/I/81RcSTbC-nL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product27', 'https://www.amazon.com/product27'],
    reviews: [
      { user: 'Mia Solis', comment: 'Great product! Highly recommend.' },
      { user: 'Sean Schwartz', comment: 'Good value for the price.' },
      { user: 'Ava Phelps', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Kenneth Barton', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Cline', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Goodman', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Hanna', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Coleman', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Snyder', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simmons', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Obrien', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Lawson', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Stephens', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 28, name: 'Basic Math Workbook for Adults', description: 'Activity book with over 3300 tasks of addition, subtraction, multiplication and division to practice basic skills and keep the mind active',
    photoUrl: 'https://m.media-amazon.com/images/I/61aUVVdK8dL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product28', 'https://www.amazon.com/product28'],
    reviews: [
      { user: 'Mia Lucas', comment: 'Great product! Highly recommend.' },
      { user: 'Gerald Mitchell', comment: 'Good value for the price.' },
      { user: 'Ava Crawford', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Milton Olson', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Harrison', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Cardenas', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mendoza', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Navarro', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gordon', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Murray', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lloyd', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Cunningham', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Keller', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Klein', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Saunders', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 29, name: 'Humble Math', description: '100 Days of Decimals, Percents & Fractions: Advanced Practice Problems (Answer Key Included) - Converting Numbers - Adding, Subtracting, Multiplying & Dividing Decimals Percentages & Fractions - Reducing Fractions - Math Drills',
    photoUrl: 'https://m.media-amazon.com/images/I/61LH-7p051L._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product29', 'https://www.amazon.com/product29'],
    reviews: [
      { user: 'Derek Guzman', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Jennings', comment: 'Good value for the price.' },
      { user: 'Harold Noble', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Fitzgerald', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Randy Joyce', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Davenport', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Conner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mcguire', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Sutton', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Barker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Moss', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Rowland', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Portillo', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Le', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 30, name: 'The Book of Math', description: 'Math in space, sports calculations, symmetry in nature, weird math facts, math in art, and mind-boggling number conundrums are just some of the topics explored in this fascinating, illustrated look at math.',
    photoUrl: 'https://m.media-amazon.com/images/I/91e1ViXXvJL._SY522_.jpg',
    category: 'edu-courses',
    links: ['https://www.example.com/product30', 'https://www.amazon.com/product30'],
    reviews: [
      { user: 'Ava Lucero', comment: 'Great product! Highly recommend.' },
      { user: 'Victor Barrera', comment: 'Good value for the price.' },
      { user: 'Mia Vang', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Brett Ho', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Kemp', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Galvan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Archuleta', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Buchanan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mccarthy', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Good', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wise', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Briggs', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Coffey', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Noel', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Stark', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 31, name: 'FefiYo Mens Air Running Shoes', description: 'Comfortable Walking Tennis Sneakers Lighweight Athletic Shoes for Sport Gym Jogging Black US 8.5',
    photoUrl: 'https://m.media-amazon.com/images/I/71fXKp4WneL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product31', 'https://www.amazon.com/product31'],
    reviews: [
      { user: 'Sean Leblanc', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Stout', comment: 'Good value for the price.' },
      { user: 'Kenneth Godfrey', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Cornell', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Eugene Potter', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Nielsen', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Love', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cheng', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Burgess', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Rocha', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Choi', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Shah', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Molina', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Schroeder', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Nolan', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 32, name: 'Ziitop Running Shoes for Men', description: 'Lightweight Tennis Shoes Athletic Air Cushion Walking Shoes Non Slip Breathable Fashion Sneakers Comfortable Mesh Sport Shoes Mens Workout Casual Gym Jogging Shoes',
    photoUrl: 'https://m.media-amazon.com/images/I/81K+PfdxfqL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product32', 'https://www.amazon.com/product32'],
    reviews: [
      { user: 'Mia Esparza', comment: 'Great product! Highly recommend.' },
      { user: 'Gerald French', comment: 'Good value for the price.' },
      { user: 'Ava Charles', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Milton Sloan', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Mcconnell', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Bradford', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Wolfe', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Christensen', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Malone', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Preston', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Sherman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Ayers', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Shea', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fuentes', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 33, name: 'GoodValue Womens Running Shoes', description: 'Lightweight Air Cushion Walking Shoes Tennis Shoes for Women Fashion Breathable Mesh Upper Sneakers Workout Casual Gym Jogging Non Slip Ladies Sport Shoes',
    photoUrl: 'https://m.media-amazon.com/images/I/81FcWznZMqL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product33', 'https://www.amazon.com/product33'],
    reviews: [
      { user: 'Derek Potts', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Hurst', comment: 'Good value for the price.' },
      { user: 'Harold Mcclain', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava McCullough', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Randy Oneal', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Parsons', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Fischer', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Montes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Kent', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Vaughan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Bates', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Goldberg', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcclure', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Robbins', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 34, name: 'Harvest Land Women Running Shoes ', description: 'ennis Walking Sneakers Gym Non Slip Lightweight Jogging Sports Workout Fitness Shoes',
    photoUrl: 'https://m.media-amazon.com/images/I/71pC1lyzTfL._AC_SY695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product34', 'https://www.amazon.com/product34'],
    reviews: [
      { user: 'Ava Landry', comment: 'Great product! Highly recommend.' },
      { user: 'Victor Leblanc', comment: 'Good value for the price.' },
      { user: 'Mia Conley', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Brett Valenzuela', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Christian', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Maldonado', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wall', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Case', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Delacruz', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Sparks', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Eaton', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Norton', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mckee', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mansfield', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Solis', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 35, name: 'Under Armour Mens Charged Assert 10 Running Shoe', description: 'Lightweight, breathable mesh upper with synthetic overlays for added durability & support',
    photoUrl: 'https://m.media-amazon.com/images/I/8169fzJnvSL._AC_SX695_.jpg',
    category: 'footwear',
    links: ['https://www.example.com/product35', 'https://www.amazon.com/product35'],
    reviews: [
      { user: 'Sean Schwartz', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Phelps', comment: 'Good value for the price.' },
      { user: 'Kenneth Barton', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Cline', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Eugene Goodman', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Hanna', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Coleman', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Snyder', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simmons', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Obrien', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Lawson', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Stephens', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Lucas', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 36, name: 'dAlba Italian White Truffle First Spray Serum', description: 'Vegan Skin Care, Hydrating Face Moisturizer, Glow Serum for Radiant Skin, Non Comedogenic, All In One Mist, Korean skincare, 100ml',
    photoUrl: 'https://m.media-amazon.com/images/I/51bU6yWbWJL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product36', 'https://www.amazon.com/product36'],
    reviews: [
      { user: 'Gerald Mitchell', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Crawford', comment: 'Good value for the price.' },
      { user: 'Milton Olson', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Harrison', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Sean Cardenas', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mendoza', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Navarro', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gordon', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Murray', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lloyd', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Cunningham', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Keller', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Klein', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Saunders', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Guzman', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 37, name: 'MEAROSA Korean skin care ', description: 'Vitamin C Collagen Firming Essence Facial Sheet Masks Premium Quality Sensitive Skin (8 Sheets Variety pack)',
    photoUrl: 'https://m.media-amazon.com/images/I/91WsMiGipkL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product37', 'https://www.amazon.com/product37'],
    reviews: [
      { user: 'Mia Jennings', comment: 'Great product! Highly recommend.' },
      { user: 'Harold Noble', comment: 'Good value for the price.' },
      { user: 'Ava Fitzgerald', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Randy Joyce', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Davenport', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Conner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mcguire', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Sutton', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Barker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Moss', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Rowland', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Portillo', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Le', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lucero', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 38, name: 'e.l.f. Squeeze Me Lip Balm', description: 'Moisturizing Lip Balm For A Sheer Tint Of Colour, Infused With Hyaluronic Acid, Vegan & Cruelty-free, Strawberry',
    photoUrl: 'https://m.media-amazon.com/images/I/61KMb6HGVVL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product38', 'https://www.amazon.com/product38'],
    reviews: [
      { user: 'Victor Barrera', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Vang', comment: 'Good value for the price.' },
      { user: 'Brett Ho', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Kemp', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Derek Galvan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Archuleta', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Buchanan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mccarthy', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Good', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wise', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Briggs', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Coffey', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Noel', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Stark', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Leblanc', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 39, name: 'CeraVe Facial Moisturizer with SPF 30', description: 'Face Sunscreen Lotion with Hyaluronic Acid, Niacinamide & Ceramides for Women & Men. Oil-free, normal to dry skin. Verified Extended Use Date, Travel Size 89ML',
    photoUrl: 'https://m.media-amazon.com/images/I/718jjwHXq8L._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product39', 'https://www.amazon.com/product39'],
    reviews: [
      { user: 'Ava Stout', comment: 'Great product! Highly recommend.' },
      { user: 'Kenneth Godfrey', comment: 'Good value for the price.' },
      { user: 'Mia Cornell', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Eugene Potter', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Nielsen', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Love', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cheng', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Burgess', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Rocha', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Choi', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Shah', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Molina', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Schroeder', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Nolan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Esparza', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 40, name: 'Mario Badescu Facial Spray', description: 'Aloe, Herbs and Rosewater for All Skin Types Face Mist that Hydrates, Rejuvenates & Clarifies 118 ml (Pack of 1)',
    photoUrl: 'https://m.media-amazon.com/images/I/71HBFaf-ZVL._AC_SX679_.jpg',
    category: 'skincare',
    links: ['https://www.example.com/product40', 'https://www.amazon.com/product40'],
    reviews: [
      { user: 'Gerald French', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Charles', comment: 'Good value for the price.' },
      { user: 'Milton Sloan', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Mcconnell', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Sean Bradford', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Wolfe', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Christensen', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Malone', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Preston', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Sherman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Ayers', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Shea', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fuentes', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Potts', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 41, name: 'e.l.f. Halo Glow Liquid Filter', description: 'Complexion Booster For A Glowing, Soft-Focus Look, Infused With Hyaluronic Acid, Vegan & Cruelty-Free, 6 Tan/Deep',
    photoUrl: 'https://m.media-amazon.com/images/I/71LXW5Gh1KL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product41', 'https://www.amazon.com/product41'],
    reviews: [
      { user: 'Mia Hurst', comment: 'Great product! Highly recommend.' },
      { user: 'Harold Mcclain', comment: 'Good value for the price.' },
      { user: 'Ava McCullough', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Randy Oneal', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Parsons', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Fischer', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Montes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Kent', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Vaughan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Bates', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Goldberg', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcclure', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Robbins', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 42, name: 'Wet n Wild 803 Megaglo makeup stick', description: '0.21 Ounce, Floral Majority',
    photoUrl: 'https://m.media-amazon.com/images/I/61CkYS8mueL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product42', 'https://www.amazon.com/product42'],
    reviews: [
      { user: 'Victor Leblanc', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Conley', comment: 'Good value for the price.' },
      { user: 'Brett Valenzuela', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Christian', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Derek Maldonado', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wall', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Case', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Delacruz', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Sparks', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Eaton', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Norton', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mckee', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mansfield', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Solis', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Schwartz', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 43, name: 'Elizabeth Mott Thank Me Later Face Primer', description: 'Mattifying Makeup Base Primer for Shine and Oil Control - Pore Minimizer and Hides Wrinkles and Fine Lines, 30g',
    photoUrl: 'https://m.media-amazon.com/images/I/61g07H1Z-NL._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product43', 'https://www.amazon.com/product43'],
    reviews: [
      { user: 'Ava Phelps', comment: 'Great product! Highly recommend.' },
      { user: 'Kenneth Barton', comment: 'Good value for the price.' },
      { user: 'Mia Cline', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Eugene Goodman', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Hanna', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Diaz', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Coleman', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Snyder', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Simmons', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Jimenez', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Obrien', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Lawson', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Stephens', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Lucas', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Mitchell', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 44, name: 'NYX Professional Makeup Lip Gloss, High Shine', description: 'Non-Sticky FInish, 12 Hours Hydrating, Fat Applicator, With Squalane, Raspberry and Cloudberry Oils, Fat Oil Lip Drip, Shade: THATS CHIC (Berry Purple)',
    photoUrl: 'https://m.media-amazon.com/images/I/61ItfZqKp5L._AC_SX679_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product44', 'https://www.amazon.com/product44'],
    reviews: [
      { user: 'Ava Crawford', comment: 'Great product! Highly recommend.' },
      { user: 'Milton Olson', comment: 'Good value for the price.' },
      { user: 'Mia Harrison', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Sean Cardenas', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Mendoza', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Navarro', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Gordon', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Murray', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lloyd', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Cunningham', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Keller', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Klein', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Saunders', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Guzman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Jennings', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 45, name: 'LOréal Paris Telescopic Mascara', description: 'Eyelash Lengthening Mascara, Unique Non-Clumping Formula, Delivers Intense Length, For Sensitive Eyes, Blackest Black, 8 ml',
    photoUrl: 'https://m.media-amazon.com/images/I/61DaNJp6KtL.__AC_SX300_SY300_QL70_ML2_.jpg',
    category: 'makeup',
    links: ['https://www.example.com/product45', 'https://www.amazon.com/product45'],
    reviews: [
      { user: 'Harold Noble', comment: 'Great product! Highly recommend.' },
      { user: 'Ava Fitzgerald', comment: 'Good value for the price.' },
      { user: 'Randy Joyce', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Diaz', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Gerald Davenport', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Conner', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mcguire', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Sutton', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Barker', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Moss', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Rowland', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Portillo', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Le', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Lucero', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Barrera', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 46, name: 'SONGMICS 43 Inches Folding Storage Ottoman Bench', description: 'Storage Chest, Foot Rest Stool, Light Gray ULSF77G',
    photoUrl: 'https://m.media-amazon.com/images/I/8172TxFL4BL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product46', 'https://www.amazon.com/product46'],
    reviews: [
      { user: 'Mia Vang', comment: 'Great product! Highly recommend.' },
      { user: 'Brett Ho', comment: 'Good value for the price.' },
      { user: 'Ava Kemp', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Derek Galvan', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Archuleta', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Buchanan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mccarthy', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Good', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Wise', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Briggs', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Coffey', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Noel', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Stark', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Leblanc', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Stout', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 47, name: 'ETELI Night Stand Set 2 with Charging Station Small Bedside Tables', description: 'Storage Shelf Tall Nightstand with Drawers Side Bed Table for Living Room, Bedroom',
    photoUrl: 'https://m.media-amazon.com/images/I/71PkYtZErQL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product47', 'https://www.amazon.com/product47'],
    reviews: [
      { user: 'Kenneth Godfrey', comment: 'Great product! Highly recommend.' },
      { user: 'Mia Cornell', comment: 'Good value for the price.' },
      { user: 'Eugene Potter', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Ava Nielsen', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Victor Love', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Cheng', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Burgess', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Rocha', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Choi', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Shah', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Molina', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Schroeder', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Nolan', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Esparza', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald French', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 48, name: 'SONGMICS Dresser for Bedroom', description: 'Chest of Drawers, 6 Drawer Dresser, Closet Fabric Dresser with Metal Frame, Rustic Brown and Classic Black ULGS23H',
    photoUrl: 'https://m.media-amazon.com/images/I/81t9pehCKqL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product48', 'https://www.amazon.com/product48'],
    reviews: [
      { user: 'Ava Charles', comment: 'Great product! Highly recommend.' },
      { user: 'Milton Sloan', comment: 'Good value for the price.' },
      { user: 'Mia Mcconnell', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Sean Bradford', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Wolfe', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Christensen', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Malone', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Preston', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Sherman', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Ayers', comment: 'Exactly what I needed for my project.' },
      { user: 'Brett Shea', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Fuentes', comment: 'Exactly what I needed for my project.' },
      { user: 'Derek Potts', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Hurst', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 49, name: 'VASAGLE Side Tables', description: 'Charging Station, Set of 2 End Tables with USB Ports and Outlets, Rustic Brown and Black ULET372B01',
    photoUrl: 'https://m.media-amazon.com/images/I/71wV0bqegLL._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product49', 'https://www.amazon.com/product49'],
    reviews: [
      { user: 'Harold Mcclain', comment: 'Great product! Highly recommend.' },
      { user: 'Ava McCullough', comment: 'Good value for the price.' },
      { user: 'Randy Oneal', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Mia Parsons', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Gerald Fischer', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Morgan', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Montes', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Kent', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Vaughan', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Bates', comment: 'Exactly what I needed for my project.' },
      { user: 'Kenneth Goldberg', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Mcclure', comment: 'Exactly what I needed for my project.' },
      { user: 'Eugene Robbins', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Landry', comment: 'Exactly what I needed for my project.' },
      { user: 'Victor Leblanc', comment: 'Exactly what I needed for my project.' },
    ]
  },
  {
    id: 50, name: 'VASAGLE Bathroom Floor Storage Cabinet', description: 'Bathroom Storage Unit with 3 Drawers, 1 Adjustable Shelf, Bathroom Cabinet Freestanding, 11.8 x 23.6 x 31.5 Inches, White UBBC49WT',
    photoUrl: 'https://m.media-amazon.com/images/I/61YSgwBO5ML._AC_SX679_.jpg',
    category: 'furniture',
    links: ['https://www.example.com/product50', 'https://www.amazon.com/product50'],
    reviews: [
      { user: 'Mia Conley', comment: 'Great product! Highly recommend.' },
      { user: 'Brett Valenzuela', comment: 'Good value for the price.' },
      { user: 'Ava Christian', comment: 'Exceeded my expectations. Would buy again.' },
      { user: 'Derek Maldonado', comment: 'Solid performance, but a bit pricey.' },
      { user: 'Mia Wall', comment: 'Exactly what I needed for my project.' },
      { user: 'Harold Case', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Delacruz', comment: 'Exactly what I needed for my project.' },
      { user: 'Randy Sparks', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Eaton', comment: 'Exactly what I needed for my project.' },
      { user: 'Gerald Norton', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Mckee', comment: 'Exactly what I needed for my project.' },
      { user: 'Milton Mansfield', comment: 'Exactly what I needed for my project.' },
      { user: 'Mia Solis', comment: 'Exactly what I needed for my project.' },
      { user: 'Sean Schwartz', comment: 'Exactly what I needed for my project.' },
      { user: 'Ava Phelps', comment: 'Exactly what I needed for my project.' },
    ]
  }
];

// New product order from JSON
const productOrder = [12, 9, 32, 17, 6, 21, 16, 25, 8, 4, 1, 13, 38, 29, 47, 26, 22, 30, 27, 36, 39, 15, 11, 44, 33, 18, 14, 7, 34, 31, 10, 28, 35, 23, 2, 48, 49, 45, 42, 20, 5, 43, 24, 19, 41, 40, 37, 46, 3, 50];


const reorderProducts = (productOrder: number[], products: Product[]) => {
  const orderedProducts = productOrder.map(id => products.find(product => product.id === id)).filter(Boolean) as Product[];
  return orderedProducts;
};

const SearchAndProducts: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderedProducts, setOrderedProducts] = useState<Product[]>(products); // Initially use default product order

  const filteredProducts = orderedProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  // Function to trigger reordering when the refresh button is clicked
  const handleRefreshClick = () => {
    setOrderedProducts(reorderProducts(productOrder, products));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-7xl p-4 space-y-6">
        {selectedProduct ? (
          <Card className="w-full max-h-[calc(100vh-10rem)] overflow-y-auto">
            <CardHeader className="sticky top-0 bg-white z-10 pb-4">
              <button onClick={handleBackClick} className="flex items-center text-blue-500 hover:text-blue-700">
                <ArrowLeft className="mr-2" size={16} />
                Back to Products
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/2 h-48 relative">
                  <img
                    src={selectedProduct.photoUrl}
                    alt={selectedProduct.name}
                    className="absolute w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Where to Buy</h3>
                    <ul className="space-y-2">
                      {selectedProduct.links.map((link, index) => (
                        <li key={index}>
                          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex items-center">
                            {link}
                            <ExternalLink size={14} className="ml-2" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                <div className="space-y-4">
                  {selectedProduct.reviews.map((review, index) => (
                    <div key={index} className="bg-gray-100 p-3 rounded-lg">
                      <p className="font-semibold">{review.user}</p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by product name..."
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {Array.from(new Set(products.map(product => product.category))).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {/* Add Refresh Button */}
              <button
                onClick={handleRefreshClick}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Refresh Products
              </button>
            </div>
            <div className="h-[calc(100vh-250px)] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <Card
                      key={product.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => handleProductClick(product)}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-full h-48 relative mb-4">
                          <img
                            src={product.photoUrl}
                            alt={product.name}
                            className="absolute w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
                        <p className="text-gray-600 text-sm">{product.description}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">No products found for your search.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchAndProducts;
