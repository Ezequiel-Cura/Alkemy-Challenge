const {DataTypes} = require("sequelize");

module.exports=(sequilize)=>{
    sequilize.define("user",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            require:true
        },
        email:{
            type:DataTypes.STRING,
            require:true,
            unique:true
        },
        password:{
            type:DataTypes.STRING
        },
        token:{
            type:DataTypes.STRING
        }
    },{
        timestamps:true
    });
}