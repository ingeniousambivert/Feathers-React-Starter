import { app } from "@/app.js";

const main = async ({ firstname, lastname, email, password, type, verified }) => {
  if (
    typeof firstname !== "string" ||
    typeof lastname !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("firstname, lastname, email, password should be of type string");
  }
  try {
    const role = typeof type !== "string" ? "user" : type;
    const created = await app.service("users").create({
      firstname,
      lastname,
      email,
      password,
      role
    });
    if (created) {
      if (Boolean(verified) === true) {
        const patched = await app.service("users")._patch(created._id, {
          isVerified: true,
          verifyToken: null,
          verifyShortToken: null,
          verifyChanges: null,
          verifyExpires: null
        });
        console.log("Created user :", JSON.stringify(patched));
      } else {
        console.log("Created user :", JSON.stringify(created));
      }
    } else {
      throw new Error("Failed to create user :", { firstname, lastname, email, password });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
  process.exit(0);
};

const args = process.argv.slice(2);

const parsedArgs = args.reduce((acc, arg) => {
  const [key, value] = arg.split("=");
  if (key && value) {
    acc[key.slice(2)] = value;
  }
  return acc;
}, {});

const firstname = parsedArgs.firstname;
const lastname = parsedArgs.lastname;
const email = parsedArgs.email;
const password = parsedArgs.password;
const type = parsedArgs.type;
const verified = parsedArgs.verified;

main({ firstname, lastname, email, password, type, verified });
