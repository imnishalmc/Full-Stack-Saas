import sequelize from "../../database/connection"
import { Request, Response } from "express"
import generateRandomNumberInstitute from "../../services/generaterandomnumber"
class instituteController {
    static async createInstitute(req: Request, res: Response) {
        const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body

        const instituteVatNo = req.body.instituteVatNo || null
        // const {instituteVatNo=null}=req.body;//this code is as same as the above code , it just that destructure the code
        const institutePanNo = req.body.institutePanNo || null

        if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
            res.status(400).json({
                message: "please provide institute Name, instituteEmail, institutePhoneNumber, instituteAddress"
            })
            return
        }
        //raw query lai orm bhitra nai rakhna parcha, NOT NULL

        const instituteNumberr = generateRandomNumberInstitute()
        await sequelize.query(` CREATE TABLE IF NOT EXISTS institute_${instituteNumberr}(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    instituteName VARCHAR(255) NOT NULL,
    instituteEmail VARCHAR(255) NOT NULL,
    institutePhoneNumber VARCHAR(255) NOT NULL UNIQUE,
    instituteAddress VARCHAR(255) NOT NULL,
    institutePanNo VARCHAR(255),
    instituteVatNo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )`)
   
   await sequelize.query(`INSERT INTO institute_${instituteNumberr}(instituteName,instituteEmail,institutePhoneNumber,instituteAddress,institutePanNo, instituteVatNo) VALUES (?,?,?,?,?,?)` ,{
    replacements : [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, institutePanNo, instituteVatNo]
   })
   
   
   
   
   //making the table name institute using the raw query
        res.status(200).json({
            message: "Institute created successfully"
        })
    }
}
export default instituteController
