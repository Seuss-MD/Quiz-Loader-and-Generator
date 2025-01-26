## Overview

**Project Title**:
Basic Quiz Application


**Project Description**:
This is a simple command-line-based quiz application built using TypeScript. 
The application allows users to create quizzes by adding questions, take the
quizzes, and view their scores. It also supports saving and loading quizzes 
from files. 

**Project Goals**:
* Allow users to create a quiz with multiple questions.
* Enable users to take quizzes and display their scores.
* Support saving and loading quizzes to/from JSON files.
* Provide basic error handling for smoothwe user experience.
* Manage quizzes and questions efficiently.

## Instructions for Build and Use

Steps to build and/or run the software:

1. **Install Node.js**: Ensure that Node.js is installed on your machine. If not,
   download and install it from Node.js official website.
3. **Install Dependencies**: Navigate to the project folder in your terminal and
   run `npm install` to install required dependencies like **TypeScript** and **readline**.
4. **Compile TypeScript Code**: Run `tsc` in your terminal to compile the TypeScript code into JavaScript.
5. **Run the Application**: Execute the compiled JavaScript file by running **`node dist/main.js`** from your terminal.

Instructions for using the software:

1. **Create a new quiz**: From the main menu, select option 1 to add questions to the quiz.
   * Do this as much as you want :smiley:
3. **Take a quiz**: Select option 2 to answer the questions of the quiz. Your score will be calculated at the end.
4. **View the questions**: Select option 3 to see all the questions added to the quiz.
5. **Save the quiz**: Select option 4 to save your quiz to a file. It will be saved in the quiz_data folder.
   * A new folder will be made if you don't have one
7. **Load a quiz**: Select option 5 to load an existing quiz by entering the file name.
   * The file (quiz) must be in the quiz_data folder


## Development Environment 

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js v14.0.0 or higher
* TypeScript v4.5.0 or higher
* fs (File System) Node.js core library
* readline Node.js core library

## Useful Websites to Learn More

I found these websites useful in developing this software:

* [Type Script Offical Website]([Link](https://www.typescriptlang.org/docs/handbook/basic-types.html))
* [Visual Studio Code] (https://code.visualstudio.com/docs/languages/typescript#:~:text=Visual%20Studio%20Code%20includes%20TypeScript,ts%20).&text=You%20can%20test%20your%20install%20by%20checking%20the%20version.)
* [Digital Ocean] (https://www.digitalocean.com/community/tutorials/typescript-new-project)
* [zenrows] (https://www.zenrows.com/blog/web-scraping-typescript#scrape-one-element)

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ]  Add question types (e.g., true/false, multiple correct answers)
* [ ]  Improve the user interface (e.g., add color, make it more interactive)
* [ ]  Implement a more advanced scoring system (e.g., partial scoring for multiple correct answers)
* [ ]  Implement a timed quiz feature
* [ ]  Editing questions in the quiz
