import React from "react";
// import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  // Getting the navigate from context
  const { navigate, categories } = useAppContext();

  return (
 <div className="mt-16 mx-auto px-4 max-w-[1400px]">
  {/* Header Section centrée sur mobile, à gauche sur desktop */}
  <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10 w-full mb-16">
  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-800 text-center leading-tight">
    Découvrez l'ensemble de nos catégories
  </h2>
  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 whitespace-nowrap">
    {categories.length} au total
  </span>
</div>

{/* <hr className=""/> */}

  {/* --- CONTAINER PRINCIPAL RESPONSIVE --- */}
  <div
    className="flex flex-wrap justify-center 
               gap-4          /* Espace sur Mobile */
               md:gap-8       /* Espace sur Tablette */
               lg:gap-10      /* Espace sur Laptop */
               mt-6"
  >
    {categories.map((category, index) => (
      <div
        key={index}
        className="group cursor-pointer p-4 gap-3 rounded-xl flex 
                   flex-col justify-center items-center 
                   h-[220px] 
                   /* Responsive Width */
                   w-[calc(50%-1rem)] /* 2 colonnes sur mobile */
                   sm:w-[180px]       /* Taille fixe Tablette */
                   md:w-[200px]       /* Taille fixe Laptop */
                   transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-16"
        style={{ backgroundColor: category.bgColor }}
        onClick={() => {
          navigate(`/products/${category.path.toLowerCase()}`);
          scrollTo(0, 0);
        }}
      >
        <div className="h-32 flex items-center justify-center">
          <img
            src={category.image}
            alt={category.text}
            className="group-hover:scale-110 transition-transform duration-300 max-h-full w-auto object-contain"
          />
        </div>
        <p className="text-sm font-bold text-center uppercase tracking-wider text-gray-700">
          {category.text}
        </p>
      </div>
    ))}
  </div>
</div>
  );
};

export default Categories;
