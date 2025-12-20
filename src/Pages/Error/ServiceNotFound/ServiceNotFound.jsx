import { MdCloudOff, MdHome, MdArrowBack, MdWarning } from "react-icons/md";

const ServiceNotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005461]/10 via-[#005461]/5 to-[#FAB12F]/10 flex items-center justify-center px-4 relative overflow-hidden">
      <title>spark decore | Service Not Found</title>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#005461]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FAB12F]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#005461]/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Warning Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <MdWarning size={30} className="absolute top-10 left-10 text-[#005461]/30 animate-bounce" />
        <MdWarning size={24} className="absolute top-20 right-32 text-[#FAB12F]/40 animate-pulse" />
        <MdWarning size={28} className="absolute bottom-32 left-20 text-[#005461]/30 animate-bounce delay-500" />
        <MdWarning size={26} className="absolute bottom-20 right-20 text-[#FAB12F]/40 animate-pulse delay-700" />
        <MdWarning size={32} className="absolute top-1/3 right-10 text-[#005461]/30 animate-bounce delay-1000" />
        <MdWarning size={22} className="absolute top-2/3 left-32 text-[#FAB12F]/40 animate-pulse delay-300" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Animated Cloud Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#005461]/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-[#005461]/10 animate-pulse"></div>

            <div className="relative bg-white rounded-full p-8 shadow-2xl animate-bounce">
              <MdCloudOff size={80} className="text-[#005461]" />
            </div>
          </div>
        </div>

        {/* 503 Error Code */}
        <div className="mb-6">
          <h1 className="text-9xl font-black bg-gradient-to-r from-[#005461] to-[#FAB12F] text-transparent bg-clip-text animate-pulse">
            503
          </h1>
        </div>

        {/* Title */}
        <div className="mb-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Service <span className="text-[#005461]">Unavailable</span>
          </h2>
        </div>

        {/* Description */}
        <div className="mb-8 animate-fade-in">
          <p className="text-gray-600 text-lg mb-2">
            Oops! The service is temporarily unavailable.
          </p>
          <p className="text-gray-500">
            We're working to fix it. Please try again later.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#005461]/40 to-transparent"></div>
          <MdWarning size={20} className="text-[#FAB12F] animate-spin" style={{ animationDuration: "3s" }} />
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#005461]/40 to-transparent"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="btn btn-outline btn-lg gap-2 border-[#005461] text-[#005461] hover:bg-[#005461] hover:text-white group hover:scale-105 transition-transform"
          >
            <MdArrowBack size={20} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          <button
            onClick={handleGoHome}
            className="btn btn-lg gap-2 bg-[#005461] hover:bg-[#003f48] text-white group hover:scale-105 transition-transform"
          >
            <MdHome size={20} className="group-hover:rotate-12 transition-transform" />
            Go to Home
          </button>
        </div>

        {/* Error Badge */}
        <div className="mt-12">
          <div className="badge badge-lg gap-2 bg-[#FAB12F] text-[#005461] animate-pulse">
            <MdCloudOff size={14} />
            <span className="font-mono">ERR_SERVICE_UNAVAILABLE_503</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceNotFound;

