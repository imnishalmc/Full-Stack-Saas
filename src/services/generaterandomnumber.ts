//okay this file is make to store the useful function so that we can export it from here  and use it in another file 

const generateRandomNumberInstitute=()=>{
    return Math.floor(10000 + Math.random() * 90000);
}
export default generateRandomNumberInstitute;

//this floor method is used to round down the number to the nearest integer