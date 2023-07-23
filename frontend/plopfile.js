const fs = require("fs");
const path = require("path");

// Get the list of subdirectories in src/components
const componentsPath = path.join(__dirname, "src/components");
const templatesPath = path.join(__dirname, "templates");
const getDirectories = (srcPath) =>
  fs.readdirSync(srcPath, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());

const directories = getDirectories(componentsPath).map(
  (dirent) =>
    `src/components/${path.relative(componentsPath, path.join(componentsPath, dirent.name))}`,
);

const templates = getDirectories(templatesPath);

module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a new React component",
    prompts: [
      {
        type: "list",
        name: "componentType",
        message: "What type of component do you want to create?",
        choices: templates,
      },
      {
        type: "input",
        name: "name",
        message: "What is your component name?",
      },
      {
        type: "list",
        name: "folder",
        message: "Which folder do you want to create the component in?",
        choices: (answers) => directories,
      },
    ],
    actions: (data) => {
      const actions = [
        {
          type: "add",
          path: "{{folder}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
          templateFile: "templates/{{componentType}}/{{componentType}}.tsx.hbs",
        },
        {
          type: "add",
          path: "{{folder}}/{{pascalCase name}}/index.ts",
          templateFile: "templates/{{componentType}}/index.ts.hbs",
        },
        {
          type: "add",
          path: "{{folder}}/{{pascalCase name}}/styles.ts",
          templateFile: "templates/{{componentType}}/styles.ts.hbs",
        },
      ];

      if (data.componentType === "TableComponent") {
        actions.push({
          type: "add",
          path: "{{folder}}/{{pascalCase name}}/columns.tsx",
          templateFile: "templates/TableComponent/columns.tsx.hbs",
        });
        actions.push({
          type: "add",
          path: "{{folder}}/{{pascalCase name}}/filters.tsx",
          templateFile: "templates/TableComponent/filters.tsx.hbs",
        });
      }

      return actions;
    },
  });
};
