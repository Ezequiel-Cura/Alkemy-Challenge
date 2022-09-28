const {DataTypes} = require("sequelize");

module.exports=(sequilize)=>{
    sequilize.define("personaje",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            require:true,
            unique:true
        },
        image:{
            type:DataTypes.STRING
        },
        age:{
            type:DataTypes.INTEGER,

        },
        weight:{
            type:DataTypes.INTEGER
        }
    },{
        timestamps:true
    });
}