import React, { useState } from "react";
import Container from "../../Component/Container/Container";

const images = [
  "https://i.pinimg.com/1200x/43/17/14/431714b2cee15ce7fc11a08c540b96b6.jpg",
  "https://i.pinimg.com/1200x/22/30/f0/2230f05b81ccf258c1776d7ff7f3887c.jpg",
  "https://i.pinimg.com/736x/b4/f0/af/b4f0af3d93b5b34371fc970ba1445e69.jpg",
  "https://i.pinimg.com/736x/53/9b/26/539b26510103e3d920b82d9b9715b58f.jpg",
  "https://i.pinimg.com/736x/a7/e3/de/a7e3def2525a03363a7a573156115efa.jpg",
  "https://i.pinimg.com/1200x/9d/b8/76/9db876ee4a3578e3087b6fcabe529c05.jpg",
  "https://i.pinimg.com/1200x/e3/a6/10/e3a610dba2a30bf3d0e32c5f9917e8c5.jpg",
  "https://i.pinimg.com/736x/15/97/a3/1597a3e948bd96ceb6d2895fb51c0314.jpg",
  "https://i.pinimg.com/1200x/a1/21/85/a121859446ddc762f3717113bda51682.jpg",
  "https://i.pinimg.com/1200x/7a/e6/07/7ae60792aba5b2e35e61c5b2d90d812a.jpg",
  "https://i.pinimg.com/736x/3b/0f/0d/3b0f0d1dc9b3cf423a748e7ead6916ba.jpg",
  "https://i.pinimg.com/736x/15/35/5b/15355b766841946e331ee1099410904a.jpg",
  "https://i.pinimg.com/736x/ca/cc/4c/cacc4c1f57bd77dc7ba33f9a00377847.jpg",
  "https://i.pinimg.com/736x/5e/ce/0d/5ece0d1a867ebc62093c0c02fc5da87c.jpg",
  "https://i.pinimg.com/736x/92/1f/39/921f39cb162f24905d52f46a82e889d9.jpg",
  "https://i.pinimg.com/736x/a2/dd/49/a2dd4904d3bf2f10bfc9ca316b5062b2.jpg",
  "https://i.pinimg.com/736x/02/f1/ce/02f1ce8d052351ae814a6349647557c5.jpg",
  "https://i.pinimg.com/736x/70/23/c0/7023c01a853d00dfe1a66672c76c8791.jpg",
  "https://i.pinimg.com/736x/1a/34/a2/1a34a275904e6be713377ac4e953299b.jpg",
  "https://i.pinimg.com/736x/d1/96/90/d196903164dc6c6b332b25895d1e507d.jpg",
];

const ITEMS_PER_PAGE = 8;

const OurGallery = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = images.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="relative bg-gradient-to-b from-white via-amber-50/30 to-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl"></div>
      
      <Container>
        <div className="py-16 lg:py-20 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block animate-bounce">
              <span className="bg-gradient-to-r from-[#FAB12F] to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                ✨ Visual Showcase
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#005461] via-teal-600 to-[#FAB12F] bg-clip-text text-transparent">
              Our Creative Gallery
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore stunning decorations and memorable moments from our portfolio of beautifully crafted events
            </p>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#FAB12F] rounded-full"></div>
              <div className="h-1.5 w-10 bg-[#FAB12F] rounded-full"></div>
              <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#FAB12F] rounded-full"></div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((img, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={img}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-4 border-[#FAB12F]/0 group-hover:border-[#FAB12F]/50 transition-all duration-500 rounded-2xl"></div>
                </div>

                {/* Image Number Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#005461] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  #{startIndex + index + 1}
                </div>

                {/* Bottom Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#005461] to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-semibold">View Details</span>
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap justify-center items-center mt-12 gap-3">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#005461] hover:bg-[#005461] hover:text-white shadow-lg hover:shadow-xl border-2 border-[#005461]/20"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages).keys()].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num + 1)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-110 ${
                    currentPage === num + 1
                      ? "bg-gradient-to-br from-[#FAB12F] to-amber-500 text-white shadow-lg shadow-amber-300/50 scale-110"
                      : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-[#FAB12F]/50"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-[#005461] hover:bg-[#005461] hover:text-white shadow-lg hover:shadow-xl border-2 border-[#005461]/20"
              }`}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OurGallery;