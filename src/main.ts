import { Quiz } from "./Quiz";
import { Question } from "./Question";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => rl.question(query, resolve));
}

// Save quiz data to a file
function saveQuizToFile(quiz: Quiz, fileName: string): void {
    let fs = require("fs");
    let folder = "./quiz_data";
    quiz.title = fileName;

    try {
        // Check if the folder exists, create if not
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
            console.log(`Created folder: ${folder}`);
        }

        // Construct the full file path
        let filePath = `${folder}/${fileName}`;
        console.log(`Attempting to save quiz to: ${filePath}`);

        // Write the quiz data to the file
        fs.writeFileSync(filePath, JSON.stringify(quiz, null, 2));
        console.log(`Quiz successfully saved to: ${filePath}`);
    } catch (error) {
        console.error(`Failed to save quiz to file: ${error}`);
    }
}

// Load quiz data from a file
function loadQuizFromFile(fileName: string): Quiz {
    let fs = require("fs");
    let filePath = `./quiz_data/${fileName}`;
    try {
        if (fs.existsSync(filePath)) {
            let data = fs.readFileSync(filePath, "utf-8");
            let parsedData = JSON.parse(data);
            let quiz = new Quiz(parsedData.title);
            quiz.questions = parsedData.questions.map((q: any) => {
                let question = new Question(q.text, q.options, q.correctAnswers);
                return question;
            });

            console.log(`Quiz loaded from ${filePath}`);
            return quiz;
        } 
        else {
            throw new Error(`File ${fileName} not found in quiz_data folder.`);
        }
    }
    catch (error){
            console.error(error);
            return new Quiz("New Quiz");
        }
    }

function addQuestion(quiz: Quiz, question: Question): void {
    quiz.questions.push(question);
    }   



function calculateScore(responses: [number, string][], quiz: Quiz): number {
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



function displayMenu(): void {
    console.log("Choose an option:");
    console.log("1. Add a new question");
    console.log("2. Take a quiz");
    console.log("3. View questions");
    console.log("4. Save quiz");
    console.log("5. Load quiz");
    console.log("6. Exit\n");
}

async function handleMenuOption(option: number, quiz: Quiz): Promise<boolean | Quiz> {
    switch (option) {
        // Add a new question
        case 1:
            try{

                
                let newQuestionText = await askQuestion("Enter the question text: ");
                let newQuestionOptions = (await askQuestion("Enter the options separated by commas: ")).split(",");
                let newCorrectAnswer = await askQuestion("Enter the correct answer: ");

                if(newQuestionOptions.length < 2) {
                    throw new Error("A question must have at least 2 options.");
                }
                
                let newCorrectAnswerIndex = newQuestionOptions.indexOf(newCorrectAnswer);
                if (newCorrectAnswerIndex === -1) {
                    throw new Error("The correct answer must be one of the options.");
                }

                let newCorrectAnswerLetter = String.fromCharCode(65 + newCorrectAnswerIndex);
                let newQuestion = new Question(newQuestionText, newQuestionOptions, [newCorrectAnswer, newCorrectAnswerLetter]);
                addQuestion(quiz, newQuestion);
                console.log("Question added successfully.");
            } 
            catch (error) 
            {
                console.error("Error adding question:", error);
            }
            
            break;


            // Take the quiz
        case 2:
            if (quiz.questions.length === 0) {
                console.log("No questions added yet. Please add a question first.\n");
                break;
            } else {
                const responses: [number, string][] = [];
                for (let index = 0; index < quiz.questions.length; index++) {
                    quiz.displayQuestion(index);
                    let answer = await askQuestion("You selected the answer: ");

                    // Normalize the answer (support a, b, c or A, B, C, or the full option text)
                    let normalizedAnswer: string | null = null;

                    // Check if the answer is a letter (a, b, c, or A, B, C)
                    if (answer.length === 1 && /^[A-Za-z]$/.test(answer)) {
                        const optionIndex = answer.toUpperCase().charCodeAt(0) - 65;
                        if (optionIndex >= 0 && optionIndex < quiz.questions[index].options.length) {
                            normalizedAnswer = quiz.questions[index].options[optionIndex];
                        }
                    } else {
                        // Check if it's the full text of the answer
                        if (quiz.questions[index].options.includes(answer.trim())) {
                            normalizedAnswer = answer.trim();
                        }
                    }

                    // If the answer is valid, save it; otherwise, ask again
                    if (normalizedAnswer) {
                        responses.push([index, normalizedAnswer]);
                        console.log(`You answered: ${normalizedAnswer}\n`);
                    } else {
                        console.log("Invalid answer. Please enter a valid option");
                        index--; // Retry the current question
                    }
                }
                let score = calculateScore(responses, quiz);
                console.log(`Your score is: ${score}/${quiz.questions.length}`);
            }
            break;

        // View all qustions
            case 3:
                if (quiz.questions.length === 0) {
                    console.log("No questions added yet. Please add a question first.\n");
                    console.log("At the menu prompt, choose option 1 to add a question.");
                } else {
                    console.log("All questions in the quiz:");
                    quiz.questions.forEach((question, index) => {
                        console.log(`${index + 1}. ${question.text}`);
                        question.options.forEach((option, optIndex) => {
                            console.log(`   ${String.fromCharCode(65 + optIndex)}. ${option}`);
                        });
                        console.log(
                            `Correct answer(s): ${question.correctAnswers[1]}. ${question.correctAnswers[0]}\n`
                        );
                    });
                }
                break;

            // Save the quiz
            case 4:
                let fileName = await askQuestion("Enter the quiz name: ");
                fileName += ".json";
                saveQuizToFile(quiz, fileName);
                break;
                
                // Load the quiz
            case 5:
                let loadFileName : string = await askQuestion("Enter the quiz name: ");
                loadFileName += ".json";
                let loadedQuiz = loadQuizFromFile(loadFileName);
                quiz = loadedQuiz;
                console.log(`Quiz loaded from ${loadFileName}`);
                
                return loadedQuiz;
            
            // Exit
            case 6:
                console.log("Thank you for using QuizMaster! Goodbye.");
                rl.close();
                return false;
                
            // Invalid option case
            default:
                console.log("Invalid option. Please try again.");
                break;
    }
    return true;
}

// Main Program Loop
async function main(): Promise<void> {
    let quiz = new Quiz("New Quiz");
    let keepRunning = true;
    
    console.log("Welcome to QuizMaster!\n");
    
    while (keepRunning) {
        displayMenu();
        let option = parseInt(await askQuestion("Enter your choice: "), 10);
        
        let menuOption = await handleMenuOption(option, quiz);
        if (menuOption instanceof Quiz) {
            quiz = menuOption;
        }
        else 
        {
            keepRunning = menuOption;   
        }
        console.log("\n");
    }
}

main();
