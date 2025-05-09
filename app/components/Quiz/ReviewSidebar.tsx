

type SidebarProps = {
    totalQuestions: number;
    totalScore: number;
  };
  
  const ReviewSidebar = ({ totalQuestions, totalScore }: SidebarProps) => {
    return (
      <div className="w-64 relative min-h-screen bg-gray-900 text-white p-6 space-y-4">
        <h3 className="text-lg font-semibold">Quiz Info</h3>
        <p>Total Questions: {totalQuestions}</p>
        <p>Total Score: {totalScore}</p>
        {/* You can add more sidebar contents here */}
      </div>
    );
  };
  
  export default ReviewSidebar;
  