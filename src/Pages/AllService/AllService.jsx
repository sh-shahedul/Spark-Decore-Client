import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ServiceCard/ServiceCard";
import Container from "../../Component/Container/Container";

const AllService = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: services = [] } = useQuery({
    queryKey: ["all-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services/all");
      return res.data;
    },
  });

  const categories = ["all", ...new Set(services.map((s) => s.service_category))];

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.service_category === selectedCategory);

  return (
    <section className="py-16 bg-gray-100 mt-15">
      <Container>
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-6">
          All Services
        </h1>
        <h2 className="text-center  mb-8 text-base md:text-xl max-w-4xl mx-auto">
         Explore our wide range of services tailored for every need. Whether it's <span className="text-pink-600">home interiors, office makeovers, weddings, or events</span>, we provide professional and <span className="text-pink-600" >high-quality</span> solutions to make your space or occasion perfect.
          </h2>

        {/* Grid container: left filter, right cards */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">

          {/* Left: Categories */}
          <div className="flex flex-col gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-medium text-left ${
                  selectedCategory === cat
                    ? "bg-pink-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Right: Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default AllService;
