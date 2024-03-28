
/*
const list_profile_imgs = [
    "Profile/blue.png",
    "Profile/green.png",
    "Profile/orange.png",
    "Profile/purple.png",
    "Profile/red.png",
    "Profile/yellow.png"
];

const imgPath = list_profile_imgs[0];
function uploadFile(inputElement) {
    return new Promise((resolve, reject) => {
        const file = inputElement.files[0];

        if (!file) {
            reject(new Error("No file selected"));
            return;
        }

        const reader = new FileReader();

        reader.onloadend = function () {
            const base64Data = reader.result.split(',')[1];
            resolve(base64Data);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

const inputElement = list_profile_imgs[0]; // Replace with your actual file input ID
uploadFile(inputElement)
    .then(base64Data => {
        console.log('Base64 File String:', base64Data);
        // Do something with the base64Data
    })
    .catch(error => {
        console.error('Error:', error);
    });
*/


/*image to base64*/
/*
function imageToBase64(imagePath) {

    try {
        const data = require('fs').readFileSync(imagePath);

        const base64Data = Buffer.from(data).toString('base64');

        return base64Data;
    } catch (err) {
        console.error('Error reading image:', err);
        return null;
    }
}


const imagePath = 'Profile/yellow.png';

const base64Data = imageToBase64(imagePath);
if (base64Data) {
    console.log(base64Data);

}
*/
/*image to base64*/












/*
function base64ToImage(base64Data, outputPath) {
    // Remove the data URI prefix
    const base64WithoutPrefix = base64Data.replace(/^data:image\/\w+;base64,/, '');

    // Create a buffer from the base64 data
    const imageDataBuffer = Buffer.from(base64WithoutPrefix, 'base64');

    // Handle the buffer as needed
    // For example, if you want to save it to a file, you can use fs.writeFileSync

    console.log('Image data converted to buffer:', imageDataBuffer);

    // If you want to save it to a file, you can use fs.writeFile or any other method
    // For simplicity, I'll use fs.writeFileSync here
    try {
        require('fs').writeFileSync(outputPath, imageDataBuffer);
        console.log('Image saved successfully:', outputPath);
    } catch (err) {
        console.error('Error saving image:', err);
    }
}

// Example usage:
const base64Data = "";
const outputPath = 'output/path/originalImage.jpg'; // Set the desired output path and file type

base64ToImage(base64Data, outputPath);
*/
















function getRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 7);
    return randomNumber;
}


const list_profile_imgs = [];

list_profile_imgs.push("Images/blue.png");
list_profile_imgs.push("Images/green.png");
list_profile_imgs.push("Images/orange.png");
list_profile_imgs.push("Images/purple.png");
list_profile_imgs.push("Images/red.png");
list_profile_imgs.push("Images/yellow.png");

const profile_pic = list_profile_imgs[getRandomNumber()];

console.log(profile_pic);







