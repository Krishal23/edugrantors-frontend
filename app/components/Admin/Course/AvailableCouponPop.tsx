import { useGetCouponsQuery, useToggleCouponActiveMutation } from "@/app/redux/features/courses/coursesApi";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillLightbulbOffFill } from "react-icons/bs";
import { FiX, FiEye, FiEyeOff, FiGlobe } from "react-icons/fi";
import { MdPublicOff } from "react-icons/md";

type Props = {
  courseId: string;
  onClose: () => void;
};

const AvailableCouponPop = ({ courseId, onClose }: Props) => {
  const { data, isLoading, refetch } = useGetCouponsQuery(
    { courseId },
    { refetchOnMountOrArgChange: true }
  );

  const [expandedCoupon, setExpandedCoupon] = useState<string | null>(null);
  const [toggleCouponActive] = useToggleCouponActiveMutation();

  const handleTogglePublicity = async (couponId: string) => {
    try {
      const response = await toggleCouponActive({ courseId, couponId }).unwrap();
      refetch()
      toast.success(response?.message)
    } catch (error) {
      console.error("Failed to toggle coupon publicity:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 w-[400px] bg-gray-950 text-white rounded-lg shadow-md">
        <p className="text-center text-lg font-medium">Loading coupons...</p>
      </div>
    );
  }

  return (
    <div className="relative p-6 w-[400px] bg-gray-950 text-white rounded-lg shadow-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
      >
        <FiX size={20} />
      </button>
      <h2 className="text-xl font-semibold text-center mb-4">Available Coupons</h2>
      {data?.coupons?.length ? (
        <ul className="space-y-3">
          {data.coupons.map((coupon: any) => (
            <li
              key={coupon._id}
              className="p-4 bg-gray-800 rounded-md hover:bg-gray-700 transition duration-300"
            >
              <div className="flex items-center justify-between">
                <p className="text-gray-300 font-medium">{coupon.couponId}</p>
                <div className="flex items-center space-x-3">

                  {
                    !expandedCoupon && (
                      <button
                        onClick={() => handleTogglePublicity(coupon.couponId)}
                        className="text-gray-400 hover:text-green-400 transition"
                      >
                        {coupon.isActive ? 
                        <div className="flex gap-2 text-green-400 items-center">
                        LIVE
                        <FiGlobe size={18} /> 
                        </div>
                        : 
                        <div className="flex gap-2 items-center">
                        Archived
                        <MdPublicOff size={18} />
                        </div>
                        }
                      </button>

                    )

                  }
                  <button
                    onClick={() =>
                      setExpandedCoupon(expandedCoupon === coupon._id ? null : coupon._id)
                    }
                    className="text-gray-400 hover:text-indigo-400 transition"
                  >
                    {expandedCoupon === coupon._id ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
              {expandedCoupon === coupon._id && (
                <div className="mt-3 space-y-2">
                  <p>
                    <span className="text-indigo-400 font-medium">Discount:</span> {coupon.discount}%
                  </p>
                  <p>
                    <span className="text-indigo-400 font-medium">Total Used:</span> {coupon.beneficiary.length}
                  </p>
                  <p>
                    <span className="text-indigo-400 font-medium">Max Allowed:</span> {coupon.maxAllowed}
                  </p>
                  <p>
                    <span className="text-indigo-400 font-medium">Validity:</span> {new Date(coupon.validity).toLocaleDateString()}
                  </p>
                  <p className="flex justify-between items-center">
                    <div>

                      <span className="text-indigo-400 font-medium">Is Active:</span> {coupon.isActive ? "Yes" : "No"}
                    </div>
                    <button
                      onClick={() => handleTogglePublicity(coupon.couponId)}
                      className="text-gray-400 hover:text-green-400 transition"
                    >
                      {coupon.isActive ? <FiGlobe size={18} /> : <MdPublicOff size={18} />}
                    </button>
                  </p>
                  <p>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No coupons available for this course.</p>
      )}
      <button
        onClick={onClose}
        className="mt-6 w-full py-2 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm transition-all"
      >
        Close
      </button>
    </div>
  );
};

export default AvailableCouponPop;
