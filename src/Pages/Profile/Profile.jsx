import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Component/Loading/Loading";
import { Edit2, Check, X, Camera, MapPin, Phone, Mail, User, Award } from "lucide-react";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.email) return;
    axiosSecure.get("/users/profile").then((res) => {
      setProfile(res.data);
      setLoading(false);
    });
  }, [user, axiosSecure]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: profile.displayName,
        photoURL: profile.photoURL,
      });
      const res = await axiosSecure.patch("/users/profile", profile);
      setProfile({ ...profile, profileCompletion: res.data.profileCompletion });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* LEFT SIDEBAR */}
            <div className="bg-gradient-to-br from-[#005461] to-[#003840] p-6 sm:p-8 text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#FAB12F] opacity-10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
              
              {/* Profile Photo */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-[#FAB12F] shadow-2xl overflow-hidden bg-gray-700">
                    {profile.photoURL ? (
                      <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
                        <User size={48} className="text-gray-400 sm:w-16 sm:h-16" />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="absolute bottom-2 right-2 bg-[#FAB12F] p-2 sm:p-3 rounded-full shadow-lg cursor-pointer hover:bg-[#e5a129] transition">
                      <Camera size={16} className="text-[#005461] sm:w-5 sm:h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Name & Email */}
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-2 break-words px-2">{profile.displayName || "Your Name"}</h1>
                <div className="flex items-center justify-center gap-2 text-[#FAB12F] text-xs sm:text-sm flex-wrap px-2">
                  <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-all">{profile.email}</span>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-[#FAB12F] sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">Profile Strength</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-bold text-[#FAB12F]">
                    {profile.profileCompletion || 0}%
                  </span>
                </div>
                
                <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 bg-[#FAB12F]"
                    style={{ width: `${profile.profileCompletion || 0}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-gray-300 mt-3">
                  {profile.profileCompletion < 50
                    ? "Keep going! Complete your profile"
                    : profile.profileCompletion < 80
                    ? "Almost there! Just a bit more"
                    : "Excellent! Your profile is complete"}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 sm:space-y-4">
                {profile.location && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="bg-[#FAB12F]/20 p-2 rounded-lg flex-shrink-0">
                      <MapPin size={16} className="text-[#FAB12F] sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span className="text-gray-200 break-words">{profile.location}</span>
                  </div>
                )}
                {profile.phoneNumber && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm">
                    <div className="bg-[#FAB12F]/20 p-2 rounded-lg flex-shrink-0">
                      <Phone size={16} className="text-[#FAB12F] sm:w-[18px] sm:h-[18px]" />
                    </div>
                    <span className="text-gray-200 break-words">{profile.phoneNumber}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="mt-6 sm:mt-8">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center gap-2 bg-[#FAB12F] text-[#005461] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:bg-[#e5a129] transition"
                  >
                    <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" /> Edit Profile
                  </button>
                ) : (
                  <div className="w-full text-center bg-orange-500/20 text-orange-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base">
                    ✏️ Editing Mode
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="lg:col-span-2 p-6 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Profile Information</h2>
                <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage your personal details</p>
              </div>

              {!isEditing ? (
                // VIEW MODE
                <div className="space-y-4 sm:space-y-6">
                  <InfoCard icon={<User className="text-[#005461]" size={18} />} label="Display Name" value={profile.displayName} />
                  <InfoCard icon={<Mail className="text-[#005461]" size={18} />} label="Email Address" value={profile.email} locked />
                  <InfoCard icon={<MapPin className="text-[#005461]" size={18} />} label="Location" value={profile.location} />
                  <InfoCard icon={<Phone className="text-[#005461]" size={18} />} label="Phone Number" value={profile.phoneNumber} />

                  {/* Bio Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                      <div className="bg-[#005461] p-2 rounded-lg flex-shrink-0">
                        <User className="text-white" size={18} />
                      </div>
                      <h3 className="font-bold text-gray-700 text-sm sm:text-base">About Me</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base break-words">
                      {profile.bioData || "No bio added yet. Tell others about yourself!"}
                    </p>
                  </div>
                </div>
              ) : (
                // EDIT MODE
                <div className="space-y-4 sm:space-y-6">
                  <Input
                    label="Display Name"
                    value={profile.displayName}
                    onChange={(v) => setProfile({ ...profile, displayName: v })}
                    placeholder="Enter your full name"
                  />

                  <Input
                    label="Photo URL"
                    value={profile.photoURL}
                    onChange={(v) => setProfile({ ...profile, photoURL: v })}
                    placeholder="https://example.com/photo.jpg"
                  />

                  <Input
                    label="Location"
                    value={profile.location}
                    onChange={(v) => setProfile({ ...profile, location: v })}
                    placeholder="City, Country"
                  />

                  <Input
                    label="Phone Number"
                    value={profile.phoneNumber}
                    onChange={(v) => setProfile({ ...profile, phoneNumber: v })}
                    placeholder="+880 XXX-XXXXXXX"
                  />

                  <TextArea
                    label="Bio Data"
                    value={profile.bioData}
                    onChange={(v) => setProfile({ ...profile, bioData: v })}
                    placeholder="Tell us about yourself..."
                  />

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <button
                      disabled={saving}
                      onClick={handleSave}
                      className="flex-1 bg-[#005461] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl flex justify-center items-center gap-2 font-semibold text-sm sm:text-base shadow-lg hover:bg-[#003840] transition disabled:opacity-50"
                    >
                      <Check size={18} className="sm:w-5 sm:h-5" /> {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 sm:py-4 rounded-xl sm:rounded-2xl flex justify-center items-center gap-2 font-semibold text-sm sm:text-base hover:bg-gray-300 transition"
                    >
                      <X size={18} className="sm:w-5 sm:h-5" /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Components
const InfoCard = ({ icon, label, value, locked }) => (
  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-gray-200 hover:border-[#FAB12F] transition-all hover:shadow-md">
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="bg-gray-100 p-2 sm:p-3 rounded-lg flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs sm:text-sm font-semibold text-gray-500">{label}</p>
          {locked && (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full whitespace-nowrap">
              Locked
            </span>
          )}
        </div>
        <p className="text-base sm:text-lg font-semibold text-gray-800 mt-1 break-words">{value || "Not added"}</p>
      </div>
    </div>
  </div>
);

const Input = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="text-xs sm:text-sm font-bold text-gray-700 block mb-2">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base focus:border-[#005461] focus:outline-none transition"
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="text-xs sm:text-sm font-bold text-gray-700 block mb-2">{label}</label>
    <textarea
      rows={4}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-2 border-gray-300 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base resize-none focus:border-[#005461] focus:outline-none transition"
    />
  </div>
);