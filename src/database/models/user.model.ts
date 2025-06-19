import {Table,Column,Model,DataType, PrimaryKey} from "sequelize-typescript"
@Table({
    tableName:'users',//this is the namw of the table,phpmyadmin ma dekhini
    modelName:'user',//project bhitra mathi ko table lai manipulate ganri ,odel ko name 
    timestamps:true//user le halkeo data kati bel thiyo bhanni kura 
})
//sequelize-typescript ma chai hamlay calss based huni bhako bhara we use class hai ta 

//class paxi ko user chai praaya model name nai hnxa ,extends bhanni le chai tyo class lai power dini kaam garxa column banauna  , tyo Model chai mathi import gareko xa jo class pani ho

class user extends Model{
    //Column mati import gareko wala 

    @Column({
        primaryKey: true,
        type: DataType.UUID,  
        defaultValue:DataType.UUIDV4
    })
    declare id :string
    @Column({
        type:DataType.STRING
    })
    declare username:string

    @Column({
        type:DataType.STRING
    })
    declare password:string

    @Column({
        type:DataType.STRING
    })
    declare email:string
 //enum le boundry set garxa ,,role ma aauni data bhaneko yeti matrai ho yo bhanda aru aaunaa mildaina 
    @Column({
        type:DataType.ENUM('teacher','institute','super-admin','student'),
        defaultValue:'student',
    })
    declare role:string
}
export default user
//yo export bhako bhaneko mathi ko class ho hai