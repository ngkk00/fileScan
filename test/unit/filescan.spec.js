const getAllFiles = require("../../src/scanFile");

describe("getAllFiles()", () => {
    const expected = [
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir\\somemodule\\somefile.js',
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir\\somemodule\\someotherfile.js',
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir2\\anotherdir\\index.js',
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir2\\anotherdir\\yet_another_dir\\index.js',
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir2\\index.js',
        'C:\\Users\\kk_ng\\Documents\\vsproject\\fileScan\\path\\to\\your\\dir\\somdir3\\another_file.js'
    ];
    it('should return array contains directory path', async () => {
        expect(await getAllFiles.searchFiles(__dirname + "/../../path", "TODO")).toStrictEqual(expect.arrayContaining(expected));
    });

    it('Missing input parameter', () => {
        expect(getAllFiles.searchFiles(__dirname + "/../../path")).toEqual(new Error("invalid parameters"));
    });
   
    it('Invalid Path', () => {
        expect(getAllFiles.validFilePathDirectory(__dirname + "/../../pat")).toEqual(false);
    });
    it('Valid Path', () => {
        expect(getAllFiles.validFilePathDirectory(__dirname + "/../../path")).toEqual(true);
    });
})
