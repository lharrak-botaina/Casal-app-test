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

    return await saveFile(base64File, filename, fileExt, fileType)
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

    return await saveFile(base64File, filename, fileExt, fileType)
}

async function saveFile(base64File, filename, fileExt, fileType) {
    let base64Data = RemoveBase64Mime(fileExt, base64File)

    //CHECK THE SIZE
    const numberOfequals = base64Data.slice(-2) == '==' ? 2 : 1;

    let fileSize = (base64Data.length * (3 / 4)) - numberOfequals;

    if (fileSize > '1048576 ')
        throw new Error('Image size must be less than 1Mb');

    //SAVE PICTURE TO DISK
    const fileName = `${filename}-${Date.now()}.${fileExt}`;

    const filePath = generateFilePath(fileType);

    await fs.writeFileSync(filePath + fileName, base64Data, 'base64', function (err) {
        console.log(err);
        throw new Error("Failed to save photo");
    });

    return fileName;
}

function generateFilePath(fileType) {
    switch (fileType) {
        case 'AssociationPhoto':
            return `${path.join(__dirname, '../public')}/associations/`;    
        case 'YoungPhoto':
            return `${path.join(__dirname, '../public')}/youth/photos/`;   
        case 'YoungJustification':
            return `${path.join(__dirname, '../public')}/youth/justifications/`;   
        case 'CompanyLogo':
            return `${path.join(__dirname, '../public')}/companies/`;  
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

module.exports.savePicture = savePicture;
module.exports.savePdf = savePdf;
