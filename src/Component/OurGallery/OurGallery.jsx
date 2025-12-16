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
    <Container>
      <div className="py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Gallery
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {currentImages.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={img}
                alt="Gallery"
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition
                ${
                  currentPage === num + 1
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OurGallery;
