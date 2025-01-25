import { Question } from "./Question";

export class Quiz {
    title: string;
    questions: Question[];
    wrongQuestions: Question[];

    constructor(title: string) {
        this.title = title;
        this.questions = [];
        this.wrongQuestions = [];
    }

    displayQuestion(index: number): void {
        const question = this.questions[index];
        console.log(`${index + 1}. ${question.text}`);
        question.options.forEach((option, optIndex) => {
            console.log(`   ${String.fromCharCode(65 + optIndex)}. ${option}`);
        });
    }
    
    markQuestionQuizzed(questionId: number): void {
        const question = this.questions[questionId];
 
    }
}