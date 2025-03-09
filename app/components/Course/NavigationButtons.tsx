import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

type Props = {
  activeVideo: number
  setActiveVideo: (activeVideo: number) => void
  totalVideos: number
}

const NavigationButtons = ({ activeVideo, setActiveVideo, totalVideos }: Props) => {
  const isFirstLesson = activeVideo === 0
  const isLastLesson = activeVideo === totalVideos - 1

  return (
    <div className="w-full flex items-center justify-between my-3">
      <div
        className={`!min-h-[40px] !py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer 
                ${isFirstLesson && "!cursor-not-allowed opacity-80"} 
                ${!isFirstLesson && "hover:bg-blue-600 transition duration-200 ease-in-out"}`}
        onClick={() => setActiveVideo(isFirstLesson ? 0 : activeVideo - 1)}
      >
        <AiOutlineArrowLeft className="mr-2" />
        Prev Lesson
      </div>

      <div
        className={`!min-h-[40px] !py-2 px-4 bg-blue-500 text-white rounded-md flex items-center justify-center cursor-pointer 
                ${isLastLesson && "!cursor-not-allowed opacity-80"} 
                ${!isLastLesson && "hover:bg-blue-600 transition duration-200 ease-in-out"}`}
        onClick={() => setActiveVideo(isLastLesson ? activeVideo : activeVideo + 1)}
      >
        Next Lesson
        <AiOutlineArrowRight className="ml-2" />
      </div>
    </div>
  )
}

export default NavigationButtons

