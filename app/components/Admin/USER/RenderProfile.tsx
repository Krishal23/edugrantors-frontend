import {
  FaFemale,
  FaGenderless,
  FaGraduationCap,
  FaMale,
  FaPhone,
} from "react-icons/fa";
import { MdClass } from "react-icons/md";

const avatarDefault = "/assets/avatar.png";
const getGenderIcon = (gender:any) => {
  switch (gender?.toLowerCase()) {
    case "male":
      return <FaMale className="inline-block mr-2 text-indigo-400" />;
    case "female":
      return <FaFemale className="inline-block mr-2 text-indigo-400" />;
    default:
      return <FaGenderless className="inline-block mr-2 text-indigo-400" />;
  }
};
const RenderProfile = ({ userData }:any) => (
  <div className="p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg">
    <div className="flex items-center space-x-6">
      {/* Profile Image */}
      <img
        alt="profile-user"
        width={100}
        height={100}
        src={userData?.avatar?.url || avatarDefault}
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          border: "3px solid #5b6fe6",
          objectFit: "cover",
        }}
      />
      <div>
        <h2 className="text-2xl font-semibold text-white">{userData.name}</h2>
        <p className="text-gray-400 text-sm">{userData.email}</p>
        <p className="text-gray-400 text-sm">{userData.role}</p>
      </div>
    </div>
    <div className="bg-gray-700 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-200 mb-4">
        Additional Information
      </h3>
      <div className="text-gray-300 space-y-2">
        {userData.contactnumber && (
          <p>
            <FaPhone className="inline-block mr-2 text-indigo-400" />
            {userData.contactnumber}
          </p>
        )}
        {userData.gender && (
          <p>
            {getGenderIcon(userData.gender)}
            {userData.gender}
          </p>
        )}
        {userData.classes && (
          <p>
            <MdClass className="inline-block mr-2 text-indigo-400" />
            Class: {userData.classes}
          </p>
        )}
        {userData.targetYear && (
          <p>
            <FaGraduationCap className="inline-block mr-2 text-indigo-400" />
            Target Year: {userData.targetYear}
          </p>
        )}
        {userData.stream && (
          <p>
            <FaGraduationCap className="inline-block mr-2 text-indigo-400" />
            Stream: {userData.stream}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default RenderProfile;
