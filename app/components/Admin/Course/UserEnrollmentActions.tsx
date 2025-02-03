"use client";

import React, { FC, useState } from "react";

type UserEnrollmentActionsProps = {
  userId: string;
  courseId: string;
  isEnrolled: boolean;
  onUnenroll: (userId: string, courseId: string) => void;
};

const UserEnrollmentActions: FC<UserEnrollmentActionsProps> = ({
  userId,
  courseId,
  isEnrolled,
  onUnenroll,
}) => {
  const [open, setOpen] = useState(false);
  

  const handleUnenroll = () => {
    onUnenroll(userId, courseId);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Action Button */}
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 rounded-md text-sm font-medium ${
          isEnrolled
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-500 text-white cursor-not-allowed"
        }`}
        disabled={!isEnrolled}
      >
        {isEnrolled ? "Unenroll" : "Not Enrolled"}
      </button>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-[480px] border-2 border-gray-700 w-full">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Confirm Unenrollment
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to unenroll this user from the course?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleUnenroll}
                className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
              >
                Confirm
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEnrollmentActions;
