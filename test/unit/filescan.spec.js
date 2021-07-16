const getAllFiles = require("../../src/scanFile");
const path = require('path');

describe("getAllFiles()", () => {
    const expected = [
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir', 'somemodule', 'somefile.js'),
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir', 'somemodule', 'someotherfile.js'),
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir2', 'anotherdir', 'index.js'),
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir2', 'anotherdir', 'yet_another_dir', 'index.js'),
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir2', 'index.js'),
        path.join(__dirname, '/../../', 'path', 'to', 'your', 'dir', 'somdir3', 'another_file.js')
    ];
    it('should return array contains directory path', async () => {
        expect(await getAllFiles.searchFiles(__dirname + "/../../path", "TODO")).toEqual(expect.arrayContaining(expected));
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
