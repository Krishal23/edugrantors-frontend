import { useGetAllCourseNamesQuery } from "@/app/redux/features/courses/coursesApi";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

const RenderCourses = ({ userData }: any) => 
{
    const { data: allCourses } = useGetAllCourseNamesQuery({});


  function mapUserCoursesWithNames2(userData: any, allCourses: any) {
    // Create a map of course IDs to course names
    const courseMap = new Map(allCourses?.courses?.map(course => [course._id, course.name]));
  
    // Helper function to update course arrays with names
    const updateCoursesWithNames = (courses: any) => {
      return courses.map(course => ({
        ...course,
        name: courseMap.get(course.courseId) || 'Unknown Course'
      }));
    };
  
    // Update user's courses and coursesCreated with course names
    const updatedCourses = updateCoursesWithNames(userData.courses);
    const updatedCoursesCreated = updateCoursesWithNames(userData.coursesCreated);
  
    // Return updated user data
    return {
      ...userData,
      courses: updatedCourses,
      coursesCreated: updatedCoursesCreated
    };
  }

  
  userData = mapUserCoursesWithNames2(userData, allCourses);
console.log(userData);
  return (
    <div className="p-6 space-y-4 bg-gray-800 rounded-lg shadow-lg">
      <h2>Courses Enrolled: </h2>
      {userData.courses.length === 0 ? (
        <p className="text-gray-400">No courses enrolled yet.</p>
      ) : (
        userData.courses.map((course, idx) => (
          <Link href={`/admin/course/${course.courseId}`} key={idx}>
            <div
              className="p-4 bg-gray-700 rounded-lg flex gap-2 items-center justify-between cursor-pointer hover:bg-gray-600"
            >
              <h4 className="text-lg font-semibold text-gray-200">
                Course: {course.name ? course.name : course.courseId}
              </h4>
              <FaExternalLinkAlt size={15} />
            </div>
          </Link>
        ))
      )}
      <hr />
      {(userData.role === "admin" || userData.role === "teacher") && (
        <>
          <h2>Courses Created: </h2>
          {userData.coursesCreated.length === 0 ? (
            <p className="text-gray-400">No courses created yet.</p>
          ) : (
            userData.coursesCreated.map((course, idx) => (
              <Link href={`/admin/course/${course.courseId}`} key={idx}>
                <div
                  className="p-4 bg-gray-700 rounded-lg flex gap-2 items-center justify-between cursor-pointer hover:bg-gray-600"
                >
                  <h4 className="text-lg font-semibold text-gray-200">
                    Course : {course.name}
                  </h4>
                  <FaExternalLinkAlt size={15} />
                </div>
              </Link>
            ))
          )}
        </>
      )}
    </div>
  );
}
  

export default RenderCourses;
