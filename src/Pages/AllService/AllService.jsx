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

   if(isLoading){
    return <Loading></Loading>
   }

  return (
    <section className="py-16 bg-gray-100 mt-15">
      <title>spark decore | All Service</title>
      <Container>
        <h1 className="text-4xl font-bold text-center text-[#005461] mb-6">
          All <span className="text-[#FAB12F]">Services</span>
        </h1>
        <p className="max-w-4xl mx-auto text-center mb-10 text-black ">
          Explore our complete collection of professional services designed to meet every need. From home and office interiors to weddings and special events, we offer carefully crafted solutions with quality, creativity, and reliability. Easily search by service name, filter by category, and sort by budget to find the perfect service that matches your requirements. Our experienced team ensures excellence in every detail, delivering services you can trust.
        </p>

        {/*  FILTER BAR */}
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

        {/*  SERVICES GRID card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              🔍 No services found
            </p>
          )}
        </div>

      </Container>
    </section>
  );
};

export default AllService;


