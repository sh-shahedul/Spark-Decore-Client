// // import React, { useState } from "react";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // import ServiceCard from "../ServiceCard/ServiceCard";
// // import Container from "../../Component/Container/Container";

// // const AllService = () => {
// //   const axiosSecure = useAxiosSecure();
// //   const [selectedCategory, setSelectedCategory] = useState("all");

// //   const { data: services = [] } = useQuery({
// //     queryKey: ["all-services"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/services/all");
// //       return res.data;
// //     },
// //   });

// //   const categories = ["all", ...new Set(services.map((s) => s.service_category))];

// //   const filteredServices =
// //     selectedCategory === "all"
// //       ? services
// //       : services.filter((s) => s.service_category === selectedCategory);

// //   return (
// //     <section className="py-16 bg-gray-100 mt-15">
// //       <Container>
// //         <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
// //           All Services
// //         </h1>
// //         <h2 className="text-center  mb-8 text-base md:text-xl max-w-4xl mx-auto">
// //          Explore our wide range of services tailored for every need. Whether it's <span className="text-pink-600">home interiors, office makeovers, weddings, or events</span>, we provide professional and <span className="text-pink-600" >high-quality</span> solutions to make your space or occasion perfect.
// //           </h2>

// //         {/* Grid container: left filter, right cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">

// //           {/* Left: Categories */}
// //           <div className="flex flex-col gap-4">
// //             {categories.map((cat) => (
// //               <button
// //                 key={cat}
// //                 className={`px-4 py-2 rounded-full font-medium text-left ${
// //                   selectedCategory === cat
// //                     ? "bg-pink-600 text-white"
// //                     : "bg-white border border-gray-300 text-gray-700"
// //                 }`}
// //                 onClick={() => setSelectedCategory(cat)}
// //               >
// //                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Right: Services */}
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
// //             {filteredServices.map((service) => (
// //               <ServiceCard key={service._id} service={service} />
// //             ))}
// //           </div>

// //         </div>
// //       </Container>
// //     </section>
// //   );
// // };

// // export default AllService;



// // import React, { useState } from "react";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";
// // import ServiceCard from "../ServiceCard/ServiceCard";
// // import Container from "../../Component/Container/Container";

// // const AllService = () => {
// //   const axiosSecure = useAxiosSecure();

// //   // states
// //   const [search, setSearch] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [minBudget, setMinBudget] = useState("");
// //   const [maxBudget, setMaxBudget] = useState("");

// //   const { data: services = [] } = useQuery({
// //     queryKey: ["all-services"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/services/all");
// //       return res.data;
// //     },
// //   });

// //   // unique categories
// //   const categories = ["all", ...new Set(services.map(s => s.service_category))];

// //   // filtering logic
// //   const filteredServices = services.filter(service => {
// //     const matchName = service.service_name
// //       .toLowerCase()
// //       .includes(search.toLowerCase());

// //     const matchCategory =
// //       selectedCategory === "all" ||
// //       service.service_category === selectedCategory;

// //     const matchMin =
// //       minBudget === "" || service.cost >= parseInt(minBudget);

// //     const matchMax =
// //       maxBudget === "" || service.cost <= parseInt(maxBudget);

// //     return matchName && matchCategory && matchMin && matchMax;
// //   });

// //   return (
// //     <section className="py-16 bg-gray-100 mt-15">
// //       <Container>
// //         <h1 className="text-4xl font-bold text-center text-pink-600 mb-4">
// //           All Services
// //         </h1>

// //         <p className="text-center mb-8 max-w-4xl mx-auto text-gray-600">
// //           Find services easily by searching, filtering by category, and selecting
// //           your preferred budget range.
// //         </p>

// //         {/* 🔍 FILTER BAR */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-white p-4 rounded-lg shadow">
          
// //           {/* Search */}
// //           <input
// //             type="text"
// //             placeholder="Search service name..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="border px-4 py-2 rounded w-full"
// //           />

// //           {/* Category */}
// //           <select
// //             value={selectedCategory}
// //             onChange={(e) => setSelectedCategory(e.target.value)}
// //             className="border px-4 py-2 rounded w-full"
// //           >
// //             {categories.map(cat => (
// //               <option key={cat} value={cat}>
// //                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Min Budget */}
// //           <input
// //             type="number"
// //             placeholder="Min Budget"
// //             value={minBudget}
// //             onChange={(e) => setMinBudget(e.target.value)}
// //             className="border px-4 py-2 rounded w-full"
// //           />

// //           {/* Max Budget */}
// //           <input
// //             type="number"
// //             placeholder="Max Budget"
// //             value={maxBudget}
// //             onChange={(e) => setMaxBudget(e.target.value)}
// //             className="border px-4 py-2 rounded w-full"
// //           />
// //         </div>

// //         {/* 🧩 SERVICES GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
// //           {filteredServices.length > 0 ? (
// //             filteredServices.map(service => (
// //               <ServiceCard key={service._id} service={service} />
// //             ))
// //           ) : (
// //             <p className="col-span-full text-center text-gray-500">
// //               No services found
// //             </p>
// //           )}
// //         </div>

// //       </Container>
// //     </section>
// //   );
// // };

// // export default AllService;


// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import ServiceCard from "../ServiceCard/ServiceCard";
// import Container from "../../Component/Container/Container";

// const AllService = () => {
//   const axiosSecure = useAxiosSecure();

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState(""); // NEW

//   const { data: services = [] } = useQuery({
//     queryKey: ["all-services"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/services/all");
//       return res.data;
//     },
//   });

//   const categories = ["all", ...new Set(services.map(s => s.service_category))];

//   // 🔽 FILTER + SORT
//   const filteredServices = (
//     selectedCategory === "all"
//       ? [...services]
//       : services.filter(s => s.service_category === selectedCategory)
//   ).sort((a, b) => {
//     if (sortOrder === "highToLow") {
//       return b.cost - a.cost;
//     }
//     if (sortOrder === "lowToHigh") {
//       return a.cost - b.cost;
//     }
//     return 0;
//   });

//   return (
//     <section className="py-16 bg-gray-100 mt-15">
//       <Container>
//         <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
//           All Services
//         </h1>

//         {/* 🔽 SORT DROPDOWN */}
//         <div className="flex justify-end mb-6">
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="border px-4 py-2 rounded-md"
//           >
//             <option value="">Sort by price</option>
//             <option value="highToLow">Higher → Lower amount</option>
//             <option value="lowToHigh">Lower → Higher amount</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
//           {/* Left: Categories */}
//           <div className="flex flex-col gap-4">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 className={`px-4 py-2 rounded-full font-medium text-left ${
//                   selectedCategory === cat
//                     ? "bg-pink-600 text-white"
//                     : "bg-white border border-gray-300 text-gray-700"
//                 }`}
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Right: Services */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//             {filteredServices.map((service) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default AllService;



// import React, { useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import ServiceCard from "../ServiceCard/ServiceCard";
// import Container from "../../Component/Container/Container";

// const AllService = () => {
//   const axiosSecure = useAxiosSecure();

//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOrder, setSortOrder] = useState("");

//   const { data: services = [] } = useQuery({
//     queryKey: ["all-services"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/services/all");
//       return res.data;
//     },
//   });

//   const categories = ["all", ...new Set(services.map(s => s.service_category))];

//   // 🔽 Filter + Sort logic
//   const filteredServices = (
//     selectedCategory === "all"
//       ? [...services]
//       : services.filter(s => s.service_category === selectedCategory)
//   ).sort((a, b) => {
//     if (sortOrder === "highToLow") return b.cost - a.cost;
//     if (sortOrder === "lowToHigh") return a.cost - b.cost;
//     return 0;
//   });

//   return (
//     <section className="py-16 bg-gray-100 mt-15">
//       <Container>
//         <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
//           All Services
//         </h1>

//         {/* 🔍 FILTER BAR (TOP) */}
//         <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow mb-10">

//           {/* Category */}
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="border px-4 py-2 rounded-md w-full md:w-60"
//           >
//             {categories.map(cat => (
//               <option key={cat} value={cat}>
//                 {cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </option>
//             ))}
//           </select>

//           {/* Sort */}
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="border px-4 py-2 rounded-md w-full md:w-60"
//           >
//             <option value="">Sort by price</option>
//             <option value="highToLow">Higher → Lower amount</option>
//             <option value="lowToHigh">Lower → Higher amount</option>
//           </select>
//         </div>

//         {/* 🧩 SERVICES GRID (4 cards) */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {filteredServices.length > 0 ? (
//             filteredServices.map(service => (
//               <ServiceCard key={service._id} service={service} />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No services found
//             </p>
//           )}
//         </div>

//       </Container>
//     </section>
//   );
// };

// export default AllService;




import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "../../Component/Container/Container";

const AllService = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState(""); // 🔍 NEW

  const { data: services = [] } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services/all");
      return res.data;
    },
  });

  const categories = ["all", ...new Set(services.map(s => s.service_category))];

  // FILTER
  const filteredServices = services
    .filter(service => {
      const matchCategory =
        selectedCategory === "all" ||
        service.service_category === selectedCategory;

      const matchSearch = service.service_name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "highToLow") return b.cost - a.cost;
      if (sortOrder === "lowToHigh") return a.cost - b.cost;
      return 0;
    });

  return (
    <section className="py-16 bg-gray-100 mt-15">
      <Container>
        <h1 className="text-4xl font-bold text-center text-[#005461] mb-6">
          All <span className="text-[#FAB12F]">Services</span>
        </h1>
        <p className="max-w-4xl mx-auto text-center mb-10 ">
          Explore our complete collection of professional services designed to meet every need. From home and office interiors to weddings and special events, we offer carefully crafted solutions with quality, creativity, and reliability. Easily search by service name, filter by category, and sort by budget to find the perfect service that matches your requirements. Our experienced team ensures excellence in every detail, delivering services you can trust.
        </p>

        {/* 🔍 FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#005461] p-10 rounded-lg shadow mb-10">

          {/* Search by service name */}
          <input
            type="text"
            placeholder="Search by service name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-md w-full bg-white"
          />

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border px-4 py-2 rounded-md w-full bg-white select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border px-4 py-2 rounded-md w-full bg-white select"
          >
            <option value="">Sort by price</option>
            <option value="highToLow">Higher → Lower </option>
            <option value="lowToHigh">Lower → Higher </option>
          </select>
        </div>

        {/* 🧩 SERVICES GRID (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No services found
            </p>
          )}
        </div>

      </Container>
    </section>
  );
};

export default AllService;


