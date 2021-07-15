"use strict";

const fs = require("fs");
const path = require("path");
/**search Files by the keywords and return file paths contained the keywords
 * @param {string} directoryPath directory path
 * @param {string} keyWord keywork to search
 * @param {string} regexpModifier modifier for regexp e.g i -case insensitive, g -multiple occurences, default- case sensitive
 * @param {string} outputFile file name to store the output of search result
 * @returns {promise} promise for the file path which contain keyword
*/
module.exports.searchFiles = function (directoryPath, keyWord, outputFile, regexpModifier) {
    if (typeof (directoryPath) === "undefined" || typeof (keyWord) === "undefined") {
        return new Error("invalid parameters");
    }

    let self = {};
    self.directoryPath = directoryPath;
    self.keyWord = keyWord;
    self.regexpModifier = regexpModifier || "";
    self.outputFile = outputFile || "output.txt";
    self.regexCase = new RegExp(self.keyWord, self.regexpModifier);

    //link to output folder
    self.outputFile = path.join(__dirname, "../output", self.outputFile);
    let logFile = fs.createWriteStream(self.outputFile);

    /**Search engine
     * @param dirPath directory path
     * @param arrFiles keywork to search
     * @returns arrFiles array file found
    */
    async function searchEngine(dirPath, arrFiles) {
        try {
            let files = fs.readdirSync(dirPath);
            arrFiles = arrFiles || [];
            for (const file of files) {
                //Merge the path and file name
                let pathMerge = path.join(dirPath, file);
                if (fs.statSync(pathMerge).isDirectory()) {
                    //Go in another level down to directory
                    arrFiles = await searchEngine(pathMerge, arrFiles);
                } else {
                    try {
                        let fileReadStream = fs.createReadStream(pathMerge, "utf8");
                        for await (const data of fileReadStream) {
                            //Check whether the keywords match
                            let matchKeyWord = data.match(self.regexCase);
                            if (matchKeyWord) {
                                arrFiles.push(pathMerge);
                                //Write to file
                                logFile.write(pathMerge + "\n");
                                //Destroy the stream, stop the loop
                                fileReadStream.destroy();
                            }
                        }
                    } catch (error) {
                        new Error("readFileSync " + error);
                    }
                }
            }
            return arrFiles;
        } catch (error) {
            new Error("readdirSync " + error);
        }
    }
    return searchEngine(self.directoryPath);
};

/**Check the path is valid, is a directory or file
 * @param {string} fileDirectory path to insert
 * @returns {boolean} true valid path, false invalid path 
*/
module.exports.validFilePathDirectory = function (fileDirectory) {
    try {
        const chkPath = fs.statSync(fileDirectory);
        return (chkPath.isDirectory() || chkPath.isFile()) ? true : false;
        
    } catch (error) {
        return false;
    }
};