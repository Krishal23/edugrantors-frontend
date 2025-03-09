import { useGetQuizzesQuery } from '@/app/redux/features/courses/coursesApi'
import React from 'react'
import { SiQuizlet } from 'react-icons/si';

type Props = {
    id: any;
    user:any;
}


const Quizzes = ({id,user}: Props) => {
 
    const { data } = useGetQuizzesQuery(id);
    

    const hasAttemptedQuiz = (quizId: string) => {
        return user.quizProgress.some(
            (quiz: any) => quiz.quizId === quizId
        );
    };
  

    
    return (
        <div className="pb-6 min-h-[10vh] rounded-lg shadow-lg space-y-6 mb-40">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-300">Quizzes for Course</h2>
            <div>
                {data?.selectedQuizzes?.map((quiz: any, index: number) => {
                    
                    const quizIcon = (
                        <SiQuizlet  className="text-gray-400" size={20} />
                    );

                    const buttonStyle = `text-white ${
                        hasAttemptedQuiz(quiz.id) 
                        ? "bg-yellow-600 hover:bg-yellow-700" 
                        : "bg-blue-600 hover:bg-blue-700"
                    } `;
                    const buttonLabel = hasAttemptedQuiz(quiz.id) ? "Re-Take" : "Enter";
                   
                    return quiz?.isLive && (
                        <div
                            key={index}
                            className="relative p-4 mb-4 bg-gray-200 dark:bg-gray-900 rounded-md shadow-sm hover:shadow-md transition-shadow"
                        >
                            {index !== 0 && (
                                <hr className="absolute top-0 left-0 w-full border-gray-700" />
                            )}

                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <div className="flex-shrink-0">{quizIcon}</div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h2 className="text-lg font-medium text-black  dark:text-white">{quiz.title || "Quiz Title"}</h2>
                                    <p className="text-sm h-6 overflow-hidden text-black  dark:text-white">
                                        {quiz.description || "Description of the quiz"}
                                    </p>
                                </div>

                                {
                                    hasAttemptedQuiz(quiz.id) && (
                                        <a
                                        href={`/quiz-review/${id}/${quiz.id}`} 
                                        className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all bg-indigo-900 hover:bg-indigo-950`}
                                    >
                                         Review
                                    </a> 
                                    )
                                }
                                <a
                                    href={`/quiz/${id}/${quiz.id}`} 
                                    className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all ${buttonStyle}`}
                                >
                                     {buttonLabel}
                                </a>
                                
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Quizzes