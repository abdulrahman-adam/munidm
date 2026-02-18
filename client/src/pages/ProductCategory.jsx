// import React from 'react';
// import {useAppContext} from "../context/AppContext";
// import { useParams } from 'react-router-dom';
// import { categories } from '../assets/assets';
// import ProductCard from '../components/ProductCard';

// const ProductCategory = () => {
//     //Getting the products from the useAppContext
//     const {products} = useAppContext();
//     // Getting the category from Params url
//     const {category} = useParams();

//     // The function searching the category
//     const searchCategory = categories.find((item) => item.path.toLowerCase() === category);
//     //filter the product for this particular category
//     const filterProducts = products.filter((product) => product.category.toLowerCase() === category);
 
//   return (
//     <div className='mt-16'>
//         {/* Display the filter product in the page */}
//       {searchCategory && (
//         <div className='flex flex-col items-center w-max'>
//             <p className='text-2xl font-medium'>{searchCategory.text.toUpperCase()}</p>
//             <div className='w-16 h-0.5 bg-blue-500 rounded-full'>

//             </div>
//         </div>
//       )}

//       {filterProducts.length > 0 ? (
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
//             {filterProducts.map((product) => (
//                 <ProductCard key={product._id} product={product}/>
//             ))}
//         </div>
//       ): (
//         // When ther is not product in particullar category
//         <div className='flex items-center justify-center h-[60vh]'>
//             <p className='text-red-600 text-2xl font-medium'>No producs found in this category.</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ProductCategory


import React, { useMemo } from 'react';
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { products, categories } = useAppContext();
    const { category } = useParams();

    // Utilisation de useMemo pour la performance
    const filterProducts = useMemo(() => {
    if (!products) return [];
    
    return products.filter((product) => {
        // Nettoyage des données
        const productCat = product.category ? String(product.category).toLowerCase().trim() : "";
        const urlCat = category ? String(category).toLowerCase().trim() : "";
        
        // --- LA CORRECTION ---
        // On vérifie si l'un contient l'autre. 
        // Ainsi, "electronics" (URL) matchera avec "electronic" (DB)
        return (
            productCat === urlCat || 
            productCat.includes(urlCat) || 
            urlCat.includes(productCat)
        );
    });
}, [products, category]);

    // Trouver le nom propre de la catégorie pour l'affichage
    const categoryInfo = categories.find(
        cat => (cat.name || cat.text).toLowerCase() === category.toLowerCase()
    );

    console.log("URL Category:", category);
console.log("Exemple catégorie produit:", products[0]?.category);
    return (
        <div className='mt-16 px-4 min-h-[60vh]'>
            {/* Titre de la Section */}
            <div className='flex flex-col items-center mb-10'>
                <h2 className='text-3xl font-bold text-gray-800 uppercase tracking-widest'>
                    {categoryInfo ? (categoryInfo.name || categoryInfo.text) : category}
                </h2>
                <div className='w-24 h-1 bg-indigo-600 rounded-full mt-2'></div>
            </div>

            {filterProducts.length > 0 ? (
                // <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 mt-6'>
                //     {filterProducts.map((product) => (
                //         <ProductCard key={product._id} product={product}/>
                //     ))}
                // </div>

                <div className='flex flex-wrap justify-center gap-4 md:gap-8 mt-6 w-full'>
        {filterProducts.map((product) => (
            <ProductCard key={product._id} product={product}/>
        ))}
    </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200'>
                    <i className="bi bi-search text-5xl text-gray-300 mb-4"></i>
                    <p className='text-gray-500 text-xl font-medium'>
                        Aucun produit trouvé dans la catégorie <span className='text-indigo-600 font-bold'>"{category}"</span>
                    </p>
                    <button 
                        onClick={() => window.history.back()}
                        className="mt-6 text-indigo-600 font-semibold hover:underline"
                    >
                        ← Retour aux catégories
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;