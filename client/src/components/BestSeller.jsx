// import React from 'react'
// import ProductCard from './ProductCard'
// import { useAppContext } from '../context/AppContext'

// const BestSeller = () => {
//     // Getting the products from useAppContext
//     const {products} = useAppContext()
//   return (
//     <div className='mt-16'>
//       <div className="flex flex-col items-center text-center my-10 px-4">
//   <p className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
//     Nos <span className="text-indigo-600">Meilleures Ventes</span>
//   </p>
//   <div className="w-16 h-1 bg-indigo-600 rounded-full my-3"></div>
//   <p className="max-w-xl text-gray-500 text-sm md:text-base leading-relaxed">
//     Découvrez les produits plébiscités par notre communauté. Une sélection rigoureuse alliant qualité exceptionnelle et design intemporel.
//   </p>
// </div>

//         {/* Best Seller Parent */}
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
//         {/* Disply five products */}
//         {products.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
//         <ProductCard key={index} product={product}/>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default BestSeller

import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const BestSeller = () => {
    const { products } = useAppContext()

    return (
        <div className='mt-16 px-4'>
            {/* --- SECTION TITRE --- */}
            <div className="flex flex-col items-center text-center my-10">
                <p className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight">
                    Nos <span className="text-indigo-600">Meilleures Ventes</span>
                </p>
                <div className="w-16 h-1 bg-indigo-600 rounded-full my-3"></div>
                <p className="max-w-xl text-gray-500 text-sm md:text-base leading-relaxed">
                    Découvrez les produits plébiscités par notre communauté. Une sélection rigoureuse alliant qualité exceptionnelle et design intemporel.
                </p>
            </div>

            {/* --- CONTENEUR DES PRODUITS (Version Centrée) --- */}
            <div className='flex flex-wrap justify-center gap-4 md:gap-8 mt-6 w-full mx-auto'>
                {/* On filtre, on coupe à 5, et on affiche */}
                {products
                    .filter((product) => product.inStock)
                    .slice(0, 5)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
