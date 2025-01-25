"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
class Question {
    constructor(text, options, correctAnswers) {
        if (options.length < 2) {
            throw new Error("A question must have at least 2 options.");
        }
        this.text = text;
        this.options = options;
        this.correctAnswers = correctAnswers;
    }
}
exports.Question = Question;
