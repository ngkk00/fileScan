const scanFile = require("./scanFile.js");
const path = require("path");
const args = process.argv.slice(2);

//At least 2 arguments
if(args.length <= 1) {
    console.log("Please input the Path, Keyword, Output File [optional], Case-sensitive [optional] to search e.g.\n node .\\src\\index.js path TODO output.txt i ");
    process.exit(1);
}
//Check the path
if(!scanFile.validFilePathDirectory(args[0])) {
    console.log("Please input a valid Path, input \"" + args[0] + "\" is INVALID");
    process.exit(1);
}
//Use cwd so that the command can be executed outside the src folder
const filelist = scanFile.searchFiles(path.join(process.cwd(), args[0]), args[1], args[2], args[3]);
//output the search result
filelist.then((result)=> {
    console.log(result);
});

