const fs = require("fs");
const path = require("path");

async function savePicture(base64File, filename, fileType) {
    if (!base64File)
        return '';

    //EXTRACT FILE EXTENSION
    const fileExt = base64File.split(';')[0].split('/')[1];

    if (!fileExt)
        return '';

    if (fileExt != 'png' && fileExt != 'jpeg')
        throw new Error('Only PNG and JPEG format are allowed');

    return await saveFile(base64File, filename, fileExt, fileType, 1024 * 1024) // 1MB limit for images
}

async function savePdf(base64File, filename, fileType) {
    if (!base64File)
        return '';

    //EXTRACT FILE EXTENSION
    const fileExt = base64File.split(';')[0].split('/')[1];

    if (!fileExt)
        return '';

    if (fileExt != 'pdf')
        throw new Error('Only PDF format is allowed');

    return await saveFile(base64File, filename, fileExt, fileType, 5 * 1024 * 1024) // 5MB limit for PDFs
}

async function saveFile(base64File, filename, fileExt, fileType, maxSize = 1024 * 1024) {
    let base64Data = RemoveBase64Mime(fileExt, base64File)

    //CHECK THE SIZE
    const numberOfequals = base64Data.slice(-2) == '==' ? 2 : 1;

    let fileSize = (base64Data.length * (3 / 4)) - numberOfequals;

    if (fileSize > maxSize)
        throw new Error(`File size must be less than ${Math.floor(maxSize / (1024 * 1024))}MB`);

    //SAVE PICTURE TO DISK
    const fileName = `${filename}-${Date.now()}.${fileExt}`;

    const filePath = generateFilePath(fileType);

    if (!filePath)
        throw new Error('Invalid file type');

    // Ensure directory exists
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    }

    try {
        fs.writeFileSync(path.join(filePath, fileName), base64Data, 'base64');
    } catch (err) {
        console.log(err);
        throw new Error("Failed to save photo");
    }

    return fileName;
}

function generateFilePath(fileType) {
    switch (fileType) {
        case 'AssociationPhoto':
            return path.join(__dirname, '..', 'public', 'associations');
        case 'YoungPhoto':
            return path.join(__dirname, '..', 'public', 'youth', 'photos');
        case 'YoungJustification':
            return path.join(__dirname, '..', 'public', 'youth', 'justifications');
        case 'Passwork':
            return path.join(__dirname, '..', 'public', 'passworks');
        case 'Document':
            return path.join(__dirname, '..', 'public', 'documents');
        default:
            return ''
    }
}

function RemoveBase64Mime(fileExt, base64File) {
    switch (fileExt) {
        case 'png':
            return base64File.replace(/^data:image\/png;base64,/, "");
        case 'jpeg':
            return base64File.replace(/^data:image\/jpeg;base64,/, "");
        case 'pdf':
            return base64File.replace(/^data:application\/pdf;base64,/, "");    
        default:
            return base64File
    }
}

function deleteFile(filename, filePath) {
    return fs.unlinkSync(filePath + filename);
}

module.exports.savePicture = savePicture;
module.exports.savePdf = savePdf;
module.exports.deleteFile = deleteFile;