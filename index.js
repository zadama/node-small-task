const fs = require("fs");
const http = require("http");
const os = require("os");
const readline = require("readline");

const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userInput = () => {
  let isDone = false;

  inputInterface.question(
    "Choose an option: \n1. Read package.json \n2. Display OS Info \n3. Start HTTP Server \nType a number: ",
    function (input) {
      const option = Number(input);

      switch (option) {
        case 1:
          readFromJsonPackage();
          isDone = true;
          break;
        case 2:
          displayOsInfo();
          isDone = true;
          break;
        case 3:
          startHttpServer();
          isDone = true;
          break;
        default:
          console.log(
            "\nInvalid option. Choose an option between 1-3. Try again... \n"
          );
          userInput();
      }

      if (isDone) {
        inputInterface.close();
      }
    }
  );
};

userInput();

const readFromJsonPackage = () => {
  fs.readFile("package.json", (err, content) => {
    if (err) {
      console.log("\nAn error occured reading from the file: ");
      console.log("\n" + err);
      return;
    }

    console.log("\nReading from package.json\n ");
    console.log(JSON.parse(content));
  });
};

const displayOsInfo = () => {
  console.log(
    "Getting OS info...\n" + "SYSTEM MEMORY: ",
    (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) +
      " GB \n" +
      "FREE MEMORY: ",
    +(os.freemem() / 1024 / 1024 / 1024).toFixed(2) +
      " GB \n" +
      "CPU CORES: " +
      os.cpus().length +
      "\n" +
      "ARCH: " +
      os.arch() +
      "\n" +
      "OS PLATFORM: " +
      os.platform() +
      "\n" +
      "RELEASE: " +
      os.release() +
      "\n" +
      "USER: " +
      os.userInfo().username
  );
};

const startHttpServer = () => {
  const PORT = process.env.PORT || 3000;

  console.log("Starting HTTP server...");
  http
    .createServer(function (req, res) {
      // All endpoints receive the same message.
      res.write("API is working!");
      res.end();
    })
    .listen(PORT, function () {
      console.log(`Listening on port ${PORT}`);
    });
};
