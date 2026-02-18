import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Menu.css";

const Menu = () => {
  const menuRef = useRef(null);

  const downloadPDF = async () => {
    const element = menuRef.current;
    if (!element) return;

    window.scrollTo(0, 0);

    // Wait for fonts to load
    await document.fonts.ready;

    // Render element to canvas
    const canvas = await html2canvas(element, {
      scale: 3, // higher scale for sharper text/images
      useCORS: true,
      logging: false,
      backgroundColor: "#fdfcf0",
      letterRendering: true,
      width: element.offsetWidth,
      height: element.offsetHeight,
      onclone: (clonedDoc) => {
        clonedDoc.body.setAttribute("dir", "rtl");
        clonedDoc.body.setAttribute("lang", "ar");
      },
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages if content is taller than A4
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("PanaCoq-Ramadan-Menu.pdf");
  };

  return (
    <div
      ref={menuRef}
      lang="ar"
      dir="rtl"
      className="min-h-screen w-full parent"
      style={{
        backgroundImage: 'url("/img/image.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fdfcf0",
      }}
    >
      {/* DOWNLOAD BUTTON */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-lg py-4 flex justify-center">
        <button
          onClick={downloadPDF}
          className="bg-[#1a4731] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#c5a059] transition shadow-xl"
        >
          📥 Download Menu PDF
        </button>
      </div>

      {/* MENU CONTENT */}
      <div className="flex flex-col p-6 min-h-screen font-sans text-center w-full selection:bg-[#c5a059] selection:text-white">
        {/* HEADER */}
        <div className="relative py-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `url('/img/8.png')`,
              backgroundRepeat: "repeat",
            }}
          />

          <h4 className="flex items-center justify-center text-3xl md:text-5xl font-bold italic leading-none text-slate-700 pt-6 pb-6 px-8 max-w-5xl mx-auto my-8 backdrop-blur-sm rounded-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#c5a059]/20">
            🌙✨ رمضان مبارك ✨🌙
          </h4>

          <p className="flex flex-wrap items-center justify-center text-3xl md:text-5xl font-bold italic leading-snug text-slate-700 pt-6 pb-6 px-8 max-w-5xl mx-auto my-8 bg-white/60 backdrop-blur-sm rounded-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#c5a059]/20">
            <span className="w-full">
              رمضان كريم،
              <span className="text-[royalblue]">
                {" "}تصوموا وتفطروا على خير
              </span>
              ، تفضلوا في مطعمنا مع وجبة إفطار مميزة، وبخصم{" "}
              <span className="relative inline-block px-2 align-middle">
                <span className="relative z-10 text-[#1a4731] font-black underline decoration-wavy decoration-[#c5a059]">
                  50%
                </span>
                <span className="absolute inset-0 bg-[#c5a059]/10 -rotate-2 rounded-sm"></span>
              </span>
            </span>
          </p>

          <div className="w-32 h-1 bg-[#c5a059] mx-auto rounded-full" />
        </div>

        {/* MAIN SECTION */}
        <section className="w-full flex flex-wrap justify-center gap-8 mb-32 px-4 md:px-8">
          {/* LEFT */}
          <div className="bg-sky-500/50 backdrop-blur-sm border border-[#c5a059]/20 rounded-3xl shadow-2xl w-full max-w-[500px] p-6">
            <h3 className="text-[#1a4731] text-3xl font-black mb-8 border-b-2 border-[#c5a059] pb-2 inline-block">
              الأطباق السودانية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-white rounded-2xl shadow-lg border-b-4 border-[#c5a059] overflow-hidden h-[320px] transform transition hover:scale-105"
                >
                  <img
                    src={`/img/${num}.jpeg`}
                    alt="Aseeda"
                    crossOrigin="anonymous"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold text-[#1a4731]">
                      عصيدة بالتقلية
                    </p>
                    <p className="text-md font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded-full border-2 border-[#c5a059]">
                      € 5
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div className="bg-[#1a4731] w-full max-w-[550px] rounded-[3rem] shadow-[0_20px_50px_rgba(26,71,49,0.3)] pb-10 border-4 border-[#c5a059]">
            <div className="flex justify-center mb-8 mt-12 mx-8">
              <div className="bg-white rounded-3xl shadow-xl p-8 w-full text-center">
                <h1 className="text-6xl md:text-7xl font-black text-[#1a4731] uppercase">
                  PANA <span className="text-[#c5a059]">COQ</span>
                </h1>
                <br />
                <p className="text-[#8b4513] font-bold mt-2 tracking-[0.2em] text-sm uppercase">
                  Authentic Taste
                </p>
              </div>
            </div>

            <div className="flex justify-center px-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full">
                <img
                  src="/img/6.jpg"
                  alt="Main Dish"
                  crossOrigin="anonymous"
                  className="w-full h-[400px] object-cover"
                />
                <div className="p-6 text-center">
                  <p className="text-4xl font-black text-[#1a4731] mb-2">
                    صينية الصائم
                  </p>
                  <p className="text-2xl font-black text-[#8b4513] bg-white border-2 border-[#c5a059] inline-block px-6 py-2 rounded-2xl">
                    € 10
                  </p>
                  <p className="text-[#1a4731]/60 mt-6 font-bold italic text-xl">
                    عصيدة + شربة + بلح + سلطة طماطم وخضار + حمص أو كبكبيه + عصير
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-fuchsia-200 backdrop-blur-sm border border-[#c5a059]/20 rounded-3xl shadow-2xl w-full max-w-[500px] p-6">
            <h3 className="text-[#1a4731] text-3xl font-black mb-8 border-b-2 border-[#c5a059] pb-2 inline-block">
              الأطباق السودانية
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="bg-white rounded-2xl shadow-lg border-b-4 border-[#c5a059] overflow-hidden h-[320px] transform transition hover:scale-105"
                >
                  <img
                    src={`/img/${num}.jpeg`}
                    alt="Aseeda"
                    crossOrigin="anonymous"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-lg font-bold text-[#1a4731]">
                      عصيدة بالبامية
                    </p>
                    <p className="text-md font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf1] inline-block px-3 py-1 rounded-full border-2 border-[#c5a059]">
                      € 5
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-4 py-16 bg-[#1a4731] text-[#fdfcf0] rounded-t-[4rem] border-t-8 border-[#c5a059] text-center">
          <p className="text-3xl font-black mb-8 uppercase tracking-[0.3em]">
            Contact & Location
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 text-xl md:text-2xl font-bold">
            <p>📍 3 Rue Ordener, 75018 Paris</p>
            <p className="text-[#c5a059]">📞 07 69 66 96 37</p>
          </div>
          <div className="mt-12 opacity-50 text-sm tracking-widest uppercase">
            © {new Date().getFullYear()} Pana Coq Restaurant
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Menu;



// import React from "react";

// export default function Menu() {
//   return (
//     <div className="flex flex-col bg-gradient-to-br from-[#fdfcf0] via-[#fff7e6] to-[#f5e6c8] p-6 min-h-screen font-sans text-center w-full mx-0 relative overflow-hidden">

//       {/* Header */}
//       <div>
//         <h4
//           lang="ar"
//           dir="rtl"
//           className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1a4731] via-[#c5a059] to-[#1a4731] mb-4 tracking-wide drop-shadow-lg animate-pulse"
//         >
//           🌙✨ رمضان مبارك 🌙✨
//         </h4>

//         <p
//           lang="ar"
//           dir="rtl"
//           className="font-bold italic mb-12 text-4xl text-[#1a4731] bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-xl border border-[#c5a059]/30"
//         >
//           رمضان كريم، تصوموا وتفطروا على خير، تفضلوا في مطعمنا مع وجبة إفطار
//           مميزة، وبخصم 50%
//         </p>
//       </div>

//       {/* Main Section */}
//       <section className="w-full flex flex-row flex-wrap justify-around mx-0 mb-32 px-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#c5a059]/30 py-16">

//         {/* LEFT */}
//         <div lang="ar" dir="rtl" className="bg-white/80 backdrop-blur-lg w-[600px] h-full rounded-3xl shadow-2xl border border-[#c5a059]/30">

//           <div className="flex justify-between mb-16 gap-32 mt-16 mx-8">

//             {["1", "2"].map((img, i) => (
//               <div
//                 key={i}
//                 className="bg-white/95 rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden w-64 transform transition-all duration-500 hover:scale-110 hover:shadow-yellow-400/40 hover:shadow-2xl hover:-translate-y-2"
//               >
//                 <img
//                   src={`/img/${img}.jpeg`}
//                   alt="Aseeda"
//                   className="w-full h-48 object-cover transition duration-700 hover:scale-110 hover:brightness-110"
//                 />

//                 <div className="p-4">
//                   <p className="text-xl font-bold text-[#1a4731]">
//                     عصيدة بالتقلية
//                   </p>

//                   <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">
//                     € 5
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <hr />

//           <div className="flex justify-between mb-16 gap-32 mt-16 mx-8">

//             {["3", "4"].map((img, i) => (
//               <div
//                 key={i}
//                 className="bg-white/95 rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden w-64 transform transition-all duration-500 hover:scale-110 hover:shadow-yellow-400/40 hover:shadow-2xl hover:-translate-y-2"
//               >
//                 <img
//                   src={`/img/${img}.jpeg`}
//                   alt="Aseeda"
//                   className="w-full h-48 object-cover transition duration-700 hover:scale-110 hover:brightness-110"
//                 />

//                 <div className="p-4">
//                   <p className="text-xl font-bold text-[#1a4731]">
//                     عصيدة بالبامية
//                   </p>

//                   <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">
//                     € 5
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* CENTER */}
//         <div
//           lang="ar"
//           dir="rtl"
//           className="bg-white/90 backdrop-blur-lg w-[600px] mx-auto rounded-3xl shadow-2xl border border-[#c5a059]/40 pb-10"
//         >

//           {/* Logo */}
//           <div className="flex justify-center mb-16 mt-16 mx-8">
//             <div className="bg-white rounded-2xl shadow-xl border-b-4 border-[#c5a059] overflow-hidden w-full flex justify-center items-center py-6">

//               <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1a4731] via-[#c5a059] to-[#1a4731] drop-shadow-2xl tracking-tight animate-pulse">
//                 PANA COQ
//               </h1>

//             </div>
//           </div>

//           <hr className="border-white/20" />

//           {/* Main Dish */}
//           <div className="flex justify-center mb-16 mt-16 mx-8">

//             <div className="bg-white/95 rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden w-full transform transition-all duration-500 hover:scale-105 hover:shadow-yellow-400/40">

//               <img
//                 src="/img/6.jpg"
//                 alt="Special Dish"
//                 className="w-full h-[350px] object-fill transition duration-700 hover:scale-105 hover:brightness-110"
//               />

//               <div className="p-4 text-center">

//                 <p className="text-xl font-bold text-[#1a4731]">
//                   صينية الصائم
//                 </p>

//                 <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">
//                   € 5
//                 </p>

//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div lang="ar" dir="rtl" className="bg-white/80 backdrop-blur-lg w-[600px] h-full rounded-3xl shadow-2xl border border-[#c5a059]/30">

//           <div className="flex justify-between mb-16 gap-32 mt-16 mx-8">

//             {["1", "2"].map((img, i) => (
//               <div
//                 key={i}
//                 className="bg-white/95 rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden w-64 transform transition-all duration-500 hover:scale-110 hover:shadow-yellow-400/40 hover:shadow-2xl hover:-translate-y-2"
//               >
//                 <img
//                   src={`/img/${img}.jpeg`}
//                   alt="Aseeda"
//                   className="w-full h-48 object-cover transition duration-700 hover:scale-110 hover:brightness-110"
//                 />

//                 <div className="p-4">
//                   <p className="text-xl font-bold text-[#1a4731]">
//                     عصيدة بالتقلية
//                   </p>

//                   <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">
//                     € 5
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <hr />

//           <div className="flex justify-between mb-16 gap-32 mt-16 mx-8">

//             {["3", "4"].map((img, i) => (
//               <div
//                 key={i}
//                 className="bg-white/95 rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden w-64 transform transition-all duration-500 hover:scale-110 hover:shadow-yellow-400/40 hover:shadow-2xl hover:-translate-y-2"
//               >
//                 <img
//                   src={`/img/${img}.jpeg`}
//                   alt="Aseeda"
//                   className="w-full h-48 object-cover transition duration-700 hover:scale-110 hover:brightness-110"
//                 />

//                 <div className="p-4">
//                   <p className="text-xl font-bold text-[#1a4731]">
//                     عصيدة بالبامية
//                   </p>

//                   <p className="text-lg font-extrabold text-[#8b4513] mt-2 bg-[#fdfcf0] inline-block px-3 py-1 rounded">
//                     € 5
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </section>

//       {/* Footer */}
//       <footer className="mt-10 py-14 bg-white/70 backdrop-blur-xl rounded-t-3xl shadow-2xl border-t border-[#c5a059]/40 text-[#1a4731]">

//         <p className="text-3xl font-black mb-6 uppercase tracking-widest">
//           Contact & Location
//         </p>

//         <div className="text-2xl md:text-3xl font-bold space-y-4">

//           <p>
//             📍{" "}
//             <a href="#" className="hover:text-blue-600 transition">
//               3 Rue Ordener, 75018 Paris
//             </a>
//           </p>

//           <p>
//             📞{" "}
//             <a
//               href="tel:0769669637"
//               className="text-[#8b4513] hover:underline"
//             >
//               07 69 66 96 37
//             </a>
//           </p>

//         </div>
//       </footer>

//     </div>
//   );
// }
