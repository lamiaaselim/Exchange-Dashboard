const fs = require("fs");

const envConfig = `export const environment = {
  production: true,
  apiKey: '${process.env.NG_APP_API_KEY}'
};`;

fs.writeFileSync("./src/environments/environment.prod.ts", envConfig);
console.log("✅ environment.prod.ts file created successfully.");
