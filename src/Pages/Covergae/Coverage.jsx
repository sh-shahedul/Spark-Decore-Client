import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import Container from '../../Component/Container/Container';

const Coverage = () => {
  const position = [23.68, 90.36];
  const serviceCenter = useLoaderData();
  const mapref = useRef();

  const handelSerch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const cordinate = [district.latitude, district.longitude];
      console.log(cordinate, district);
      mapref.current.flyTo(cordinate, 12);
    }
  };

  return (
    <div className='mt-20'>
      {/* <title>spark decore | Coverage</title> */}
      {/* Title */}
      <h1 className='md:text-4xl text-2xl px-3 text-center font-bold pt-5 '>
        We Are Available in All <span className='text-[#FAB12F] '>64</span> Districts of <span className='text-[#005461]'>Bangladesh</span>
      </h1>

      {/* Description */}
      <p className='text-center text-gray-600 mt-4 max-w-2xl mx-auto  px-3'>
        Enter the name of your district in the search box below, and the map 
        will automatically zoom to that location and show the available service areas.
      </p>

      {/* Search Input */}
      <div className='text-center py-10'>
        <form
          onSubmit={handelSerch}
          className='flex justify-center px-3'
        >
          <label className="flex items-center gap-3 bg-white shadow-md rounded-full px-5 py-3 w-full max-w-md border focus-within:border-blue-500 transition-all ">
            <svg
              className="h-[1.2em] opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>

            <input
              type="search"
              name="location"
              required
              placeholder="Search your district..."
              className="outline-none w-full text-lg  "
            />
          </label>
        </form>
      </div>

      {/* Map Section */}
     <Container>
         <div className='w-full h-[600px]'>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className='h-[600px] rounded-xl shadow-md'
          ref={mapref}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {serviceCenter?.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
     </Container>
    </div>
  );
};

export default Coverage;
