import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importation des styles nécessaires
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slider = () => {
  // Chemins directs vers tes images dans /public/images/
  const myImages = [
    { url: '/images/7.jpg', title: 'Ordinateure', desc: 'Vitesse de traitement Go' },
    { url: '/images/mobile3.jpg', title: 'Mobile', desc: 'Connexions Redis actives' },
    { url: '/images/citron.jpg', title: 'Citron', desc: 'Scalabilité 100k' },
    { url: '/images/6.jpg', title: 'Ordinateur', desc: 'Scalabilité 100k' },
    { url: '/images/8.webp', title: 'Ordinateur', desc: 'Scalabilité 100k' },
  ];

  return (
    <div style={{ width: '100%', margin: '1 auto', padding: '1px 10px', position: 'relative', height: '400px'}}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15}
        loop={true}
        autoplay={{ delay: 1000 }}
        pagination={{ clickable: true }}
        navigation={true}
        // --- GESTION DU RESPONSIVE ---
        breakpoints={{
          // MOBILE : 1 image à la fois
          390: {
            slidesPerView: 1,
          },
          // TABLETTE : 2 images à la fois
          768: {
            slidesPerView: 2,
          },
          // LAPTOP / DESKTOP : 1 image large ou 3 en grille
          1024: {
            slidesPerView: 1, // On garde 1 pour un effet "Hero Banner"
          }
        }}
        style={{ borderRadius: '20px', height:'356px', marginTop: '0px'}}
      >
        {myImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slide-card" style={{
              height:'356px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '15px',
              // Hauteur dynamique selon l'écran
              height: window.innerWidth < 768 ? '345px' : '500px'
            }}>
              <img 
                src={img.url} 
                alt={img.title}
                style={{
                  width: '100%',
                  height: '345px',
                  objectFit: 'contain' // Empêche la déformation
                }}
              />
              {/* Overlay Texte */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                padding: '20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                color: 'white'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{img.title}</h3>
                <p style={{ margin: '5px 0 0', opacity: 0.8 }}>{img.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;

// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// // Importation des styles nécessaires
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const Slider = () => {
//   const myImages = [
//     { url: '/images/7.jpg', title: 'Ordinateur', desc: 'Vitesse de traitement Go' },
//     { url: '/images/mobile3.jpg', title: 'Mobile', desc: 'Connexions Redis actives' },
//     { url: '/images/citron.jpg', title: 'Citron', desc: 'Scalabilité 100k' },
//     { url: '/images/6.jpg', title: 'Ordinateur', desc: 'Scalabilité 100k' },
//     { url: '/images/8.webp', title: 'Ordinateur', desc: 'Scalabilité 100k' },
//   ];

//   return (
//     <div style={{ 
//       width: '100%', 
//       maxWidth: '1200px', // Limite la largeur sur très grands écrans
//       margin: '0 auto', 
//       padding: '10px', 
//       position: 'relative'
//     }}>
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={20}
//         loop={true}
//         autoplay={{ delay: 1000, disableOnInteraction: false }} // 3s est plus professionnel pour la lecture
//         pagination={{ clickable: true }}
//         navigation={true}
//         // --- RESPONSIVE OPTIMISÉ ---
//         breakpoints={{
//           // MOBILE
//           320: {
//             slidesPerView: 1,
//             spaceBetween: 10
//           },
//           // TABLETTE
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 20
//           },
//           // LAPTOP / DESKTOP
//           1024: {
//             slidesPerView: 3, // 3 images pour un look "catalogue" pro
//             spaceBetween: 30
//           }
//         }}
//         style={{ 
//           borderRadius: '20px',
//           paddingBottom: '40px' // Espace pour les points de pagination
//         }}
//       >
//         {myImages.map((img, index) => (
//           <SwiperSlide key={index}>
//             <div className="slide-card" style={{
//               position: 'relative',
//               overflow: 'hidden',
//               borderRadius: '15px',
//               backgroundColor: '#f0f0f0',
//               // Hauteur fixe pour garder l'alignement sur toutes les slides
//               height: '400px', 
//               boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
//             }}>
//               <img 
//                 src={img.url} 
//                 alt={img.title}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover' // 'cover' est indispensable pour un rendu pro sans bordures blanches
//                 }}
//               />
              
//               {/* Overlay Texte Amélioré */}
//               <div style={{
//                 position: 'absolute',
//                 bottom: 0,
//                 left: 0,
//                 right: 0,
//                 padding: '30px 20px 20px',
//                 background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
//                 color: 'white',
//                 transition: 'transform 0.3s ease'
//               }}>
//                 <h3 style={{ 
//                   margin: 0, 
//                   fontSize: '1.2rem', 
//                   fontWeight: 'bold',
//                   textTransform: 'uppercase',
//                   letterSpacing: '1px'
//                 }}>
//                   {img.title}
//                 </h3>
//                 <p style={{ 
//                   margin: '5px 0 0', 
//                   fontSize: '0.9rem',
//                   opacity: 0.9 
//                 }}>
//                   {img.desc}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Styles CSS personnalisés pour Swiper (Flèches et Points) */}
//       <style>{`
//         .swiper-button-next, .swiper-button-prev {
//           color: #fff !important;
//           background: rgba(0,0,0,0.3);
//           width: 40px !important;
//           height: 40px !important;
//           border-radius: 50%;
//           after { font-size: 18px !important; }
//         }
//         .swiper-pagination-bullet-active {
//           background: #007bff !important; /* Ton bleu Munidm */
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Slider;