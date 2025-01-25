export class Question {
    text: string;
    options: string[];
    correctAnswers: [string, string,]; 
    // Tuple with format [correctAnswer, letter correct answer]

    constructor(text: string, options: string[], correctAnswers: [string, string]) {
        if (options.length < 2) {
            throw new Error("A question must have at least 2 options.");
        }
        this.text = text;
        this.options = options;
        this.correctAnswers = correctAnswers;
    }
}
