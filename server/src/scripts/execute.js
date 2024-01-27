import path from "path";
import { exec } from "child_process";
import fs from "fs";

const [type, name, ...args] = process.argv.slice(2);
const scriptPath = path.join(process.cwd(), "src", "scripts", type, `${name}.js`);

if (!fs.existsSync(scriptPath)) {
  console.error(`The script file ${scriptPath} does not exist.`);
  process.exit(1);
}

exec(`node ${scriptPath} ${args.join(" ")}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing script:`);
    console.error(error);
    process.exit(1);
  }
  if (stderr) {
    console.error(`Script error:`);
    console.error(stderr);
  }
  console.log(`Script output:`);
  console.log(stdout);
});

/* Examples 
  npm run script -- create sync
  npm run script -- create user --email=foo@bar.com --password=foobar --firstname=Foo --lastname=Bar --type=admin --verified=true
*/
