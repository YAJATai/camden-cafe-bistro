import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'tacos', label: 'Tacos' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'mains', label: 'Mains & Sides' },
];

const MENU_CATEGORIES = [
  {
    id: "burgers",
    title: "Burgers",
    description: "Freshly grilled patties with house-made sauces.",
    items: [
      { name: "Veg Mexican Burger", price: "215", desc: "Spiced black bean & corn patty with guacamole, salsa & jalapenos" },
      { name: "Spicy Spanish Burger", price: "249", desc: "Chorizo-spiced patty, grilled peppers, smoky paprika mayo" },
      { name: "Crispy Chicken Burger", price: "297", desc: "Crunchy fried chicken, lettuce, tomato & house sauce" },
      { name: "Classic Cheese Burger", price: "269", desc: "Beef patty, melted cheddar, pickles & secret sauce" }
    ]
  },
  {
    id: "tacos",
    title: "Tacos",
    description: "All taco plates come with 3 tacos. Served with fresh salsa and lime.",
    items: [
      { name: "Al Pastor Tacos", price: "299", desc: "Marinated grilled pork, pineapple, onion & cilantro" },
      { name: "Chicken Tacos", price: "289", desc: "Spiced grilled chicken, pico de gallo & crema" },
      { name: "Chile Tacos", price: "279", desc: "Roasted chile & potato, cotija cheese & salsa verde" },
      { name: "Spey Cam Special", price: "319", desc: "Chef's special blend of grilled meats & house salsa" }
    ]
  },
  {
    id: "sandwiches",
    title: "Sandwiches & More",
    description: "Toasted, grilled, and loaded with flavour.",
    items: [
      { name: "Ham & Cheese Sandwich", price: "267", desc: "Smoked ham, melted cheddar, house mayo on toasted bread" },
      { name: "Grilled Cheese Sandwich", price: "249", desc: "Mozzarella & cheddar blend, golden grilled perfection" },
      { name: "Chicken Cheese Ranch", price: "267", desc: "Grilled chicken, cheddar, ranch drizzle & fresh greens" },
      { name: "Corn & Spinach Sandwich", price: "239", desc: "Creamy corn and spinach blend with herbs & cheese" },
      { name: "Duck Bean Patty Sandwich", price: "279", desc: "House-made duck & bean patty, caramelized onions" }
    ]
  },
  {
    id: "mains",
    title: "Big Plates & Sides",
    description: "Hearty mains and shareable sides for a full meal.",
    items: [
      { name: "Chicken Popcorn", price: "199", desc: "Crispy bite-sized chicken, served with choice of dip" },
      { name: "Peri Peri Fries", price: "179", desc: "Golden fries tossed in spicy peri peri seasoning" },
      { name: "Salted Fries", price: "129", desc: "Classic crispy fries with a pinch of sea salt" },
      { name: "Loaded Nachos", price: "349", desc: "Tortilla chips, melted cheese, salsa, guacamole & sour cream" }
    ]
  }
];

const ADDONS = [
  { name: "Cheese Slice", price: "49" },
  { name: "Ranch Dip", price: "39" },
  { name: "Mayo Dip", price: "39" },
  { name: "Chilli Glaze Dip", price: "49" }
];

export function FullMenu() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = MENU_CATEGORIES.filter(cat => 
    activeFilter === 'all' || cat.id === activeFilter
  );

  return (
    <div className="bg-[#fcfbf9] w-full py-24 md:py-32 flex justify-center border-t border-neutral-100">
      <div className="w-[90%] md:w-[70%] max-w-5xl">
        
        <div className="text-center mb-10 md:mb-16 flex flex-col items-center">
           <span className="text-orange-500 uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">Flavour Journey</span>
           <h2 className="font-luxurious text-4xl md:text-[52px] text-black mt-3 mb-6">
             The Menu
           </h2>
           <div className="w-16 h-[1px] bg-orange-400/50 mb-10" />

           <div className="flex flex-wrap justify-center gap-3">
             {FILTERS.map(filter => (
               <button
                 key={filter.id}
                 onClick={() => setActiveFilter(filter.id)}
                 className={`font-manrope text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
                   activeFilter === filter.id 
                    ? 'bg-neutral-900 text-orange-400 shadow-md' 
                    : 'bg-white text-neutral-500 border border-neutral-200 hover:border-orange-400/50 hover:text-neutral-900'
                 }`}
               >
                 {filter.label}
               </button>
             ))}
           </div>
        </div>

        <motion.div layout className="flex flex-col gap-20">
          <AnimatePresence>
            {filteredCategories.map((category) => (
              <motion.div 
                key={category.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-8 md:gap-16"
              >
                
                <div className="md:w-[35%] flex flex-col gap-2 shrink-0">
                  <motion.h3 layout className="font-luxurious text-2xl md:text-[28px] text-black">
                    {category.title}
                  </motion.h3>
                  <motion.p layout className="font-manrope text-sm text-neutral-500 leading-relaxed italic pr-4">
                    {category.description}
                  </motion.p>
                </div>

                <motion.div layout className="md:w-[65%] flex flex-col gap-8">
                  {category.items.map((item, itemIdx) => (
                    <motion.div key={itemIdx} layout className="flex flex-col">
                      <div className="flex justify-between items-baseline gap-4 w-full">
                        <h4 className="font-manrope font-bold text-[15px] text-neutral-900 tracking-wide uppercase">
                          {item.name}
                        </h4>
                        <div className="flex-grow border-b border-dotted border-neutral-300 relative -top-1" />
                        {item.price && (
                          <span className="font-manrope font-bold text-[15px] text-orange-500 shrink-0">
                            ₹{item.price}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="font-manrope text-[13px] text-neutral-500 mt-2 leading-relaxed max-w-[90%]">
                          {item.desc}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </motion.div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 pt-10 border-t border-neutral-200 text-center">
          <h3 className="font-manrope font-bold text-sm uppercase tracking-widest text-neutral-700 mb-4">Add-Ons & Dips</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {ADDONS.map((addon, i) => (
              <span key={i} className="font-manrope text-sm text-neutral-500">
                {addon.name} <span className="text-orange-500 font-bold">₹{addon.price}</span>
              </span>
            ))}
          </div>
          <p className="font-manrope text-[10px] text-neutral-400 mt-6 uppercase tracking-wider">
            Up to 30% off with Axis, Bandhan, IndusInd & AmEx bank offers • Listed on EazyDiner
          </p>
        </div>

      </div>
    </div>
  );
}
