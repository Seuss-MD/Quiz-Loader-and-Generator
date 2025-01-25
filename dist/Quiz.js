"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
class Quiz {
    constructor(title) {
        this.title = title;
        this.questions = [];
        this.wrongQuestions = [];
    }
    displayQuestion(index) {
        const question = this.questions[index];
        console.log(`${index + 1}. ${question.text}`);
        question.options.forEach((option, optIndex) => {
            console.log(`   ${String.fromCharCode(65 + optIndex)}. ${option}`);
        });
    }
    markQuestionQuizzed(questionId) {
        const question = this.questions[questionId];
    }
}
exports.Quiz = Quiz;
