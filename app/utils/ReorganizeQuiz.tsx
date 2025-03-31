export function reorganizeQuizData(quizId:string, courseId: string, quiz: any, responses: any) {
    const maxMarks = quiz.questions.reduce((acc: any, question: any) => acc + question.marks, 0);
    let marksScored = 0;
    let totalQuestionsAttempted = 0;
    let totalCorrectQuestions = 0;

    const questions = quiz.questions.map((question: any) => {
        const userResponse = responses.find((response: any) => response.questionId === question.questionId);
        const selectedAnswer = userResponse ? userResponse.selectedAnswer : null;
        let isCorrect = false;
        const isAttempted = selectedAnswer !== null && selectedAnswer !== undefined;

        if (isAttempted) {
            totalQuestionsAttempted++;
            switch (question.type) {
                case "single":
                case "phrase":
                    isCorrect = question.correctAnswer === selectedAnswer;
                    break;
                case "multiple":
                    if (Array.isArray(selectedAnswer)) {
                        isCorrect =
                            Array.isArray(question.correctAnswer) &&
                            question.correctAnswer.length === selectedAnswer.length &&
                            question.correctAnswer.every((answer: any) => selectedAnswer.includes(answer));
                    }
                    break;
                case "numerical":
                    isCorrect = question.correctAnswer === selectedAnswer;
                    break;
                default:
                    isCorrect = false;
            }
        }

        if (isCorrect) {
            marksScored += question.marks;
            totalCorrectQuestions++;
        }

        return {
            questionId: question.questionId,
            selectedAnswer,
            isCorrect,
            isAttempted,
        };
    });

    return {
        quizId,
        courseId,
        maxMarks,
        marksScored,
        totalQuestionsAttempted,
        totalCorrectQuestions,
        completionTime: 0, // Placeholder for now
        isCompleted: totalQuestionsAttempted > 0,
        questions,
    };
}
