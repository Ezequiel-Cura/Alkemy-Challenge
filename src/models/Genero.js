const {DataTypes} = require("sequelize");

module.exports=(sequilize)=>{
    sequilize.define("genero",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            require:true
        },
        image:{
            type:DataTypes.STRING
        }
    })
}