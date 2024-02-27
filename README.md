# Team-Profile-Generator

## Description

This Node.js command-line application allows you to generate a webpage that displays basic information about your software engineering team. It prompts the user to input details about the team members, including the manager, engineers, and interns, and then generates an HTML file based on the provided information.

### User story

As a team manager, I require a convenient way to compile and access essential information about my software engineering team. This tool enables me to swiftly generate a webpage displaying key details, such as names, roles, email addresses, and GitHub profiles, for each team member. This streamlines communication and collaboration within the team, enhancing productivity and efficiency.

I want to be able to:

- Input the details of the team manager, including their name, employee ID, email address, and office number.
- Add engineers to the team, including their name, ID, email, and GitHub username.
- Add interns to the team, including their name, ID, email, and school they are attending.
- Finish building the team when all necessary members have been added.
- Have an HTML file generated automatically containing all the team members' information, which I can refer to later for reference.

### Features

- Utilizes Node.js for command-line interface.
- Prompts users for information about each team member.
- Supports different roles within the team, including managers, engineers, and interns.
- Automatically generates an HTML webpage based on the provided information.
- Includes tests to ensure the correctness and functionality of the application.

### Visual presentation

#### Mock-Up

![mock-up](./assets/mock-up.png)

#### App photos

![mock-up](./assets/screenshot-team.html-page.png)

#### Tests

![test-screenshot](./assets/screenshot-tests.png)

#### terminal app video preview

![terminal-app-video](./assets/add-employee-from-terminal.gif)

## Technologies
- [Node.js *v21.6.1*](https://nodejs.org/en)
- [Inquirer *v8.0.0*](https://www.npmjs.com/package/inquirer/v/8.0.0#documentation)
- [Jest *v29.7.0*](https://jestjs.io/)
- [HTML](https://html.com/)
- [Bootstrap](https://getbootstrap.com/)
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- [JavaScript](https://www.javascript.com/)
- [Prettier *v3.2.5*](https://prettier.io/)
- [Git](https://git-scm.com/)
- [JSDoc *v4.0.2*](https://jsdoc.app/)

## Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Install dependencies using ```npm install```.
4. Run the application using ```npm start```.
5. Follow the prompts to input information about each team member.
6. Once all information is provided, the application will generate an HTML file named ```team.html``` in the ```output``` directory.

### Installation

1. Download the project from [GitHub repository](https://github.com/FilipPaskalev/Team-Profile-Generator.git) on your local machine.
2. Unzip the project.
3. Open project with [VS Code](https://code.visualstudio.com/) or other IDE.

### Clone project from [GitHuB](https://github.com/)

```git clone https://github.com/FilipPaskalev/Team-Profile-Generator.git```

## Classes

This application utilizes classes for each team member:

```Employee```: Parent class with properties and methods for **name**, **ID**, **email**, and **role**.

```Manager```: Extends Employee with an additional property for **office number** and an **overridden getRole()** method.

```Engineer```: Extends Employee with an additional property for **GitHub username** and an **overridden getRole()** method.

```Intern```: Extends Employee with an additional property for **school** and an **overridden getRole** method.

```AppEngine```: Singleton that runs all operation for the app.

## Tests

Unit tests for each class are provided in the ```__tests__``` directory. Ensure that all tests pass using ```Jest```.

### Preview

```
> team-profile-generator@1.0.0 test
> jest --verbose

 PASS  __tests__/Employee.test.js
  √ Can instantiate Employee instance (5 ms)
  √ Can set name via constructor arguments (1 ms)
  √ Can set id via constructor argument (1 ms)
  √ Can set email via constructor argument
  √ Can get name via getName() (1 ms)
  √ Can get id via getId() (1 ms)
  √ Can get email via getEmail() (1 ms)
  √ getRole() should return "Employee" (1 ms)

 PASS  __tests__/Engineer.test.js
  √ Can set GitHUb account via constructor (5 ms)
  √ getRole() should return "Engineer" (1 ms)
  √ Can get GitHub username via getGithub() (1 ms)

 PASS  __tests__/Intern.test.js
  √ Can set school via constructor (2 ms)
  √ getRole() should return "Intern" (1 ms)
  √ Can get school via getSchool() (4 ms)

 PASS  __tests__/Manager.test.js
  √ Can set school via constructor (1 ms)
  √ getRole() should return "Intern" (1 ms)
  √ Can get school via getSchool() (1 ms)

Test Suites: 4 passed, 4 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        1.125 s
Ran all test suites.
```

## Resources

### NPM

[Link 1](https://www.geeksforgeeks.org/introduction-to-npm-scripts) | 
[Link 2](https://docs.npmjs.com/cli/v10/using-npm/scripts) | 
[Link 3](https://docs.npmjs.com/cli/v6/commands/npm-test) | 
[Link 4](https://docs.npmjs.com/cli/v6/commands/npm-start) | 
[Link 5](https://www.knowledgehut.com/blog/web-development/package-json-scripts-node-js) | 
[Link 7](https://codedamn.com/news/nodejs/remove-npm-package) | 
[Link 8](https://docs.npmjs.com/uninstalling-packages-and-dependencies)

### JavaScript

[Link 1](https://www.sohamkamani.com/javascript/enums/) | 
[Link 2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) | 
[Link 3](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) | 
[Link 4](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) | 
[Link 5](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) | 
[Link 6](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks) | 
[Link 7](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor#examples) |
[Link 8](https://stackoverflow.com/questions/21194934/how-to-create-a-directory-if-it-doesnt-exist-using-node-js) |
[Link 9](https://stackoverflow.com/questions/13696148/node-js-create-folder-or-use-existing) |
[Link 10](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs)
[Link 11](https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript) | 
[Link 12](https://emaillistvalidation.com/blog/email-validation-in-javascript-using-regular-expressions-the-ultimate-guide/) | 
[Link 13](https://woocoders.com/how-to-validate-email-in-js/) | 
[Link 14](https://www.youtube.com/watch?v=UQnEWtA9l1A) | 
[Link 15](https://javascript.plainenglish.io/validate-phone-number-in-javascript-9528fa93a7f0) | 
[Link 16](https://www.javascript-coder.com/form-validation/javascript-form-validation-phone-number/) | 
[Link 17](https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript)

### Jest

[Link 1](https://jestjs.io/docs/cli#--testnamepatternregex) | 
[Link 2](https://jestjs.io/docs/configuration) | 
[Link 3](https://jestjs.io/docs/setup-teardown)

### inquirer

[Link 1](https://github.com/sboudrias/Inquirer.js) | 
[Link 2](https://www.npmjs.com/package/inquirer/v/8.0.0) | 
[Link 3](https://www.digitalocean.com/community/tutorials/nodejs-interactive-command-line-prompts) | 
[Link 4](https://github.com/SBoudrias/Inquirer.js#plugins) | 
[Link 5](https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/README.md)

### Prettier

[Link 1](https://prettier.io/docs/en/configuration.html) | 
[Link 2](https://prettier.io/docs/en/options.html#print-width) | 
[Link 3](https://prettier.io/docs/en/options.) | 
[Link 4](html#:~:text=For%20readability%20we%20recommend%20against,up%20long%20lines%20for%20readability.) | 
[Link 5](https://stackoverflow.com/questions/45404823/how-to-remove-semicolons-in-prettier) | 
[Link 6](https://prettier.io/docs/en/ignore.html)

### Chalk
[link 1](https://www.npmjs.com/package/chalk) | 
[Link 2](https://github.com/chalk/chalk) | 
[link 3](https://github.com/chalk/chalk#readme) | 
[Link 4](https://stackoverflow.com/questions/70309135/chalk-error-err-require-esm-require-of-es-module) | 
[Link 5](https://geshan.com.np/blog/2022/10/npm-chalk/#:~:text=NPM%20chalk%20is%20a%20third,Terminal%20string%20styling%20done%20right) | 
[Link 6](https://www.npmjs.com/package/chalk/v/4.1.2)

### Bootstrap
[Link 1](https://getbootstrap.com/docs/4.0/utilities/spacing/) | 
[Link 2](https://getbootstrap.com/docs/4.3/utilities/sizing/)

## Dependencies

### JSDoc

[JSDoc 3](https://jsdoc.app/about-getting-started) is an API documentation generator for JavaScript, similar to Javadoc. You add documentation comments directly to your source code, right alongside the code itself. The JSDoc tool will scan your source code and generate an HTML documentation website for you.

#### Adding documentation comments to your code

JSDoc's purpose is to document the API of your JavaScript application or library. It is assumed that you will want to document things like modules, namespaces, classes, methods, method parameters, and so on.

### Prettier

Prettier is an opinionated code formatter with support for:

- JavaScript (including experimental features)
- JSX
- Angular
- Vue
- Flow
- TypeScript
- CSS, Less, and SCSS
- HTML
- Ember/Handlebars
- JSON
- GraphQL
- Markdown, including GFM and MDX v1
- YAML

It removes all original styling* and ensures that all outputted code conforms to a consistent style. (See this [blog post](https://archive.jlongster.com/A-Prettier-Formatter))

Prettier takes your code and reprints it from scratch by taking the line length into account.

### Chalk

[NPM chalk](https://www.npmjs.com/package/chalk/v/5.3.0) is a third-party Node.js module that is used to add colour and styling to text on the command-line output. It also allows creating your own themes for your Node.js project. As per the Chalk GitHub page, it is: 

>Terminal string styling done right

Chalk supports multiple text styles with backgrounds supporting different colours and formatting. For instance, you can show text in red colour with a grey background that is bold and underlined. The chalk module is easy to install and use, depending on your terminal colours it can support a lot of colours.

It is an actively maintained project without any dependencies. Chalk also has an expressive API and it is a performant library. In the next part, you will know about the popularity of the NPM chalk module.

### inquirer

Inquirer is an [NPM](https://www.npmjs.com/package/inquirer/v/9.2.15?activeTab=readme#documentation) package that provides an easy way to capture user input in your Node.js command line interface applications. It provides several methods for asking questions and returning answers from the user that can be accessed by a .then promise function.

### Jest

> "[Jest](https://jestjs.io/) is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly.
Jest is well-documented, requires little configuration and can be extended to match your requirements.
Jest makes testing delightful" - Jest Core Team

## Contributing

Contributions to this project are welcome. Feel free to submit bug reports, feature requests, or pull requests.

## Questions

If you have any questions about this projects, please contact me directly at paskalevfilip@gmail.com. You can view more of my projects at [https://github.com/FilipPaskalev](https://github.com/FilipPaskalev).

## License

<img title="a title" alt="Alt text" src="./assets/mit-photo.png">

This project is licensed under the MIT License, you can find link to the license  [here](https://github.com/FilipPaskalev/Team-Profile-Generator/blob/main/LICENSE).