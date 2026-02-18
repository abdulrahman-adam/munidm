// import React from "react";

// const Aseeda = () => {
//   return (
//     <div className="bg-[#fdfcf0] p-6 min-h-screen font-sans text-center">
//   {/* Header: Sudanese Green & Bold */}
//   <h4 className="text-4xl md:text-5xl font-black text-[#1a4731] mb-2 tracking-wide uppercase">
//     🌙✨
//    رمضان مبارك 🌙✨ 
//   </h4>
//   <p className="text-[#c5a059] font-bold italic mb-10 text-xl">أفضل المأكولات السودانية</p>
//   <p className="text-blue-600 font-bold italic mb-10 text-4xl">رمضان كريم، تصوموا وتفطروا على خير، تفضلوا في مطعمنا مع وجبة إفطار مميزة، وبخصم 50%.” بهذه الطريقة تكون واضحة وجذاب</p>

// <div>

//   {/* Flexbox container - Better than table for "Publicity" images */}
//   <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
    
//     {/* Dish Item 1 */}
//     <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//       <img src="/img/1.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <p className="text-xl font-bold text-[#1a4731]">عصيدة بالتقلية</p>
//         <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">5 €</p>
//       </div>
//     </div>

  

//     {/* Dish Item 3 */}
//     <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//       <img src="/img/2.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <p className="text-xl font-bold text-[#1a4731]">عصيدة بالتقلية</p>
//         <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">5 €</p>
//       </div>
//     </div>

//     {/* Dish Item 4 */}
//     <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//       <img src="/img/3.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <p className="text-xl font-bold text-[#1a4731]">عصيدة بالتقلية</p>
//         <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">5 €</p>
//       </div>
//     </div>

//     {/* Dish Item 5 */}
//     <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//       <img src="/img/4.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <p className="text-xl font-bold text-[#1a4731]">عصيدة بالبامية</p>
//         <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">5 €</p>
//       </div>
//     </div>

// </div>

//   </div>
//   <hr />

//   <div className="mt-32 font-bold text-4xl">

//   Addresse: <a href="">3 Rue Ordener, 75018 Paris</a>
//   <br />
//   <br />
//   Téléphone: 0769669637
//   </div>
// </div>
    
//   );
// };

// export default Aseeda;


// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const Aseeda = () => {
//   const menuRef = useRef();

//   const handleDownload = async () => {
//     const element = menuRef.current;
//     const canvas = await html2canvas(element, {
//       scale: 2, // Higher scale for better "Publicity" quality
//       useCORS: true,
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF("p", "mm", "a4");
    
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("Sudanese_Ramadan_Menu.pdf");
//   };

//   return (
//     <div className="flex flex-col items-center">
//         <style>
//         {`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');`}
//       </style>
//       {/* 1. Added Download Button */}
//       <button 
//         onClick={handleDownload}
//         className="my-5 bg-[#1a4731] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#c5a059] transition-all"
//       >
//         Download PDF 📥
//       </button>

//       {/* 2. Your Original Code (Wrapped in the Ref) */}
//       <div ref={menuRef} className="bg-[#fdfcf0] p-6 min-h-screen font-sans text-center rounded-2xl shadow-xl border-b-4 border-[#c5a059]">
//         <h4 lang="ar" 
//   dir="rtl" className="text-4xl md:text-5xl font-black text-[#1a4731] mb-2 tracking-wide uppercase">
//           🌙✨ رمضان مبارك 🌙✨
//         </h4>
        
//         <p className="text-blue-600 font-bold italic mb-10 text-4xl" lang="ar" 
//   dir="rtl">
//           رمضان كريم، تصوموا وتفطروا على خير، تفضلوا في مطعمنا مع وجبة إفطار مميزة، وبخصم 50%
//         </p>

//         <div>
//           <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
//             {/* Dish Item 1 */}
//             <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//               <img src="/img/1.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <p className="text-3xl font-bold text-[#1a4731]" lang="ar" 
//   dir="rtl"> عصيدة بالتقلية أو بالروب</p>
//                 <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">6 €</p>
//               </div>
//             </div>

//             {/* Dish Item 2 (Fixed ID) */}
            

//             {/* Dish Item 3 */}
//             <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//               <img src="/img/3.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <p className="text-3xl font-bold text-[#1a4731]">قراصة 
//  بالتقلية</p>
//                 <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">6 €</p>
//               </div>
//             </div>

//             {/* Dish Item 4 */}
//             <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//               <img src="/img/4.jpeg" alt="Aseeda" className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <p className="text-3xl font-bold text-[#1a4731]">عصيدة بالبامية</p>
//                 <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">6 €</p>
//               </div>
//             </div>
//             <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-64 transform transition hover:scale-105">
//               <img src="/img/5.jpg" alt="Aseeda" className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <p className="text-3xl font-bold text-[#1a4731]">قراصة بالبامية</p>
//                 <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">6 €</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <hr className="my-10" />

//         <div className="mt-10 font-bold text-4xl">
//           Addresse: <a href="https://maps.google.com/?q=3+Rue+Ordener+75018+Paris" className="text-blue-500 underline">3 Rue Ordener 75018 Paris</a>
//           <br />
//           <br />
//           Téléphone: 0769669637
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Aseeda;