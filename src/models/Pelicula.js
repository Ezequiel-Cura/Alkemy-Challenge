const {DataTypes} = require("sequelize");

module.exports=(sequilize)=>{
    sequilize.define("pelicula",{
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true
        },
        title:{
            type:DataTypes.STRING,
            require:true
        },
        pelicula_genre:{
            type:DataTypes.STRING
        },
        calification:{
            type:DataTypes.NUMBER,
            validate:{
                max:5,
                min:0
            }
        }
    },{
        timestamps:true
    });
}