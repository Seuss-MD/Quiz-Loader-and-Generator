"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Quiz_1 = require("./Quiz");
const Question_1 = require("./Question");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}
function saveQuizToFile(quiz, fileName) {
    let fs = require("fs");
    let folder = "./quiz_data";
    quiz.title = fileName;
    try {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
            console.log(`Created folder: ${folder}`);
        }
        let filePath = `${folder}/${fileName}`;
        console.log(`Attempting to save quiz to: ${filePath}`);
        fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2));
        console.log(`Quiz successfully saved to: ${filePath}`);
    }
    catch (error) {
        console.error(`Failed to save quiz to file: ${error}`);
    }
}
function loadQuizFromFile(fileName) {
    let fs = require("fs");
    let filePath = `./quiz_data/${fileName}`;
    try {
        if (fs.existsSync(filePath)) {
            let data = fs.readFileSync(filePath, "utf-8");
            let parsedData = JSON.parse(data);
            let quiz = new Quiz_1.Quiz(parsedData.title);
            quiz.questions = parsedData.questions.map((q) => {
                let question = new Question_1.Question(q.text, q.options, q.correctAnswers);
                return question;
            });
            console.log(`Quiz loaded from ${filePath}`);
            return quiz;
        }
        else {
            throw new Error(`File ${fileName} not found in quiz_data folder.`);
        }
    }
    catch (error) {
        console.error(error);
        return new Quiz_1.Quiz("New Quiz");
    }
}
function addQuestion(quiz, question) {
    quiz.questions.push(question);
}
function calculateScore(responses, quiz) {
    let score = 0;
    for (let [questionId, answer] of responses) {
        let question = quiz.questions[questionId];
        if (question.correctAnswers.includes(answer)) {
            score += 1;
        }
        else {
            quiz.wrongQuestions.push(question);
        }
    }
    return score;
}
function displayMenu() {
    console.log("Choose an option:");
    console.log("1. Add a new question");
    console.log("2. Take a quiz");
    console.log("3. View questions");
    console.log("4. Save quiz");
    console.log("5. Load quiz");
    console.log("6. Exit\n");
}
function handleMenuOption(option, quiz) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (option) {
            case 1:
                try {
                    let newQuestionText = yield askQuestion("Enter the question text: ");
                    let newQuestionOptions = (yield askQuestion("Enter the options separated by commas: ")).split(",");
                    let newCorrectAnswer = yield askQuestion("Enter the correct answer: ");
                    if (newQuestionOptions.length < 2) {
                        throw new Error("A question must have at least 2 options.");
                    }
                    let newCorrectAnswerIndex = newQuestionOptions.indexOf(newCorrectAnswer);
                    if (newCorrectAnswerIndex === -1) {
                        throw new Error("The correct answer must be one of the options.");
                    }
                    let newCorrectAnswerLetter = String.fromCharCode(65 + newCorrectAnswerIndex);
                    let newQuestion = new Question_1.Question(newQuestionText, newQuestionOptions, [newCorrectAnswer, newCorrectAnswerLetter]);
                    addQuestion(quiz, newQuestion);
                    console.log("Question added successfully.");
                }
                catch (error) {
                    console.error("Error adding question:", error);
                }
                break;
            case 2:
                if (quiz.questions.length === 0) {
                    console.log("No questions added yet. Please add a question first.\n");
                    break;
                }
                else {
                    const responses = [];
                    for (let index = 0; index < quiz.questions.length; index++) {
                        quiz.displayQuestion(index);
                        let answer = yield askQuestion("You selected the answer: ");
                        let normalizedAnswer = null;
                        if (answer.length === 1 && /^[A-Za-z]$/.test(answer)) {
                            const optionIndex = answer.toUpperCase().charCodeAt(0) - 65;
                            if (optionIndex >= 0 && optionIndex < quiz.questions[index].options.length) {
                                normalizedAnswer = quiz.questions[index].options[optionIndex];
                            }
                        }
                        else {
                            if (quiz.questions[index].options.includes(answer.trim())) {
                                normalizedAnswer = answer.trim();
                            }
                        }
                        if (normalizedAnswer) {
                            responses.push([index, normalizedAnswer]);
                            console.log(`You answered: ${normalizedAnswer}\n`);
                        }
                        else {
                            console.log("Invalid answer. Please enter a valid option");
                            index--;
                        }
                    }
                    let score = calculateScore(responses, quiz);
                    console.log(`Your score is: ${score}/${quiz.questions.length}`);
                }
                break;
            case 3:
                if (quiz.questions.length === 0) {
                    console.log("No questions added yet. Please add a question first.\n");
                    console.log("At the menu prompt, choose option 1 to add a question.");
                }
                else {
                    console.log("All questions in the quiz:");
                    quiz.questions.forEach((question, index) => {
                        console.log(`${index + 1}. ${question.text}`);
                        question.options.forEach((option, optIndex) => {
                            console.log(`   ${String.fromCharCode(65 + optIndex)}. ${option}`);
                        });
                        console.log(`Correct answer(s): ${question.correctAnswers[1]}. ${question.correctAnswers[0]}\n`);
                    });
                }
                break;
            case 4:
                let fileName = yield askQuestion("Enter the quiz name: ");
                fileName += ".json";
                saveQuizToFile(quiz, fileName);
                break;
            case 5:
                let loadFileName = yield askQuestion("Enter the quiz name: ");
                loadFileName += ".json";
                let loadedQuiz = loadQuizFromFile(loadFileName);
                quiz = loadedQuiz;
                console.log(`Quiz loaded from ${loadFileName}`);
                return loadedQuiz;
            case 6:
                console.log("Thank you for using QuizMaster! Goodbye.");
                rl.close();
                return false;
            default:
                console.log("Invalid option. Please try again.");
                break;
        }
        return true;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let quiz = new Quiz_1.Quiz("New Quiz");
        let keepRunning = true;
        console.log("Welcome to QuizMaster!\n");
        while (keepRunning) {
            displayMenu();
            let option = parseInt(yield askQuestion("Enter your choice: "), 10);
            let menuOption = yield handleMenuOption(option, quiz);
            if (menuOption instanceof Quiz_1.Quiz) {
                quiz = menuOption;
            }
            else {
                keepRunning = menuOption;
            }
            console.log("\n");
        }
    });
}
main();
