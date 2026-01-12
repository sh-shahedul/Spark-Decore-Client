import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "../../Component/Container/Container";
import Loading from "../../Component/Loading/Loading";

const AllService = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [search, setSearch] = useState(""); // 🔍 NEW
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 12;

  const { data: services = [] ,isLoading} = useQuery({
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

  // Pagination calculation
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  // Page change handler
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when filters change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

   if(isLoading){
    return <Loading></Loading>
   }

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 mt-15">
      <title>spark decore | All Service</title>
      <Container>
        <h1 className="text-4xl font-bold text-center text-[#005461] dark:text-teal-400 mb-6">
          All <span className="text-[#FAB12F] dark:text-amber-400">Services</span>
        </h1>
        <p className="max-w-4xl mx-auto text-center mb-10 text-black dark:text-gray-300">
          Explore our complete collection of professional services designed to meet every need. From home and office interiors to weddings and special events, we offer carefully crafted solutions with quality, creativity, and reliability. Easily search by service name, filter by category, and sort by budget to find the perfect service that matches your requirements. Our experienced team ensures excellence in every detail, delivering services you can trust.
        </p>

        {/*  FILTER BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#005461] dark:bg-gray-800 p-10 rounded-lg shadow mb-10">

          {/* Search by service name */}
          <input
            type="text"
            placeholder="Search by service name..."
            value={search}
            onChange={handleSearchChange}
            className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
          />

          {/* Category */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 select"
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
            onChange={handleSortChange}
            className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 select"
          >
            <option value="">Sort by price</option>
            <option value="highToLow">Higher → Lower </option>
            <option value="lowToHigh">Lower → Higher </option>
          </select>
        </div>

        {/*  SERVICES GRID card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {currentServices.length > 0 ? (
            currentServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              🔍 No services found
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                currentPage === 1
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-[#005461] dark:bg-teal-600 text-white hover:bg-[#FAB12F] dark:hover:bg-amber-500 shadow-md hover:shadow-lg'
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => paginate(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-[#FAB12F] dark:bg-amber-500 text-white shadow-lg scale-110'
                          : 'bg-white dark:bg-gray-800 text-[#005461] dark:text-teal-400 hover:bg-[#005461] hover:text-white dark:hover:bg-teal-600 dark:hover:text-white shadow-md hover:shadow-lg'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                currentPage === totalPages
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-[#005461] dark:bg-teal-600 text-white hover:bg-[#FAB12F] dark:hover:bg-amber-500 shadow-md hover:shadow-lg'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

      </Container>
    </section>
  );
};

export default AllService;