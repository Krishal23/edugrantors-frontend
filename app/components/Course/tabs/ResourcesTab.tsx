import { FaChalkboardTeacher, FaFileDownload, FaLink } from "react-icons/fa"

type ResourceLink = {
  title: string
  url: string
}

type Props = {
  links?: ResourceLink[]
}

const ResourcesTab = ({ links = [] }: Props) => {
  return (
    <div className="pb-6 min-h-[10vh] rounded-lg shadow-lg space-y-6">
      {links.map((item, index) => {
        // Determine styles and properties dynamically
        const linkIcon =
          item.title === "Live Class" ? (
            <FaChalkboardTeacher className="text-blue-400" size={20} />
          ) : item.title === "DPP" ? (
            <FaFileDownload className="text-yellow-400" size={20} />
          ) : (
            <FaLink className="text-gray-400" size={20} />
          )

        const linkText =
          item.title === "Live Class" ? "Join Live Class" : item.title === "DPP" ? "Download DPP" : "Access Resource"

        const buttonStyle =
          item.title === "Live Class"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : item.title === "DPP"
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-600 hover:bg-gray-700 text-gray-100"

        return (
          <div key={index} className="relative p-4 bg-gray-900 rounded-md shadow-sm hover:shadow-md transition-shadow">
            {/* Top Border Divider */}
            {index !== 0 && <hr className="absolute top-0 left-0 w-full border-gray-700" />}

            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">{linkIcon}</div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-lg font-medium text-white">{item.title || "Resource"}</h2>
                <p className="text-sm text-gray-400">
                  {item.title === "Live Class"
                    ? "Interactive sessions with instructors."
                    : item.title === "DPP"
                      ? "Practice and test your knowledge."
                      : "Explore additional materials."}
                </p>
              </div>

              <a
                href={item.url}
                className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all ${buttonStyle}`}
              >
                {linkText}
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ResourcesTab

