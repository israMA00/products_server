import { Model, Table, DataType, Column, Default } from "sequelize-typescript";

@Table({
    tableName: 'products'
})

class Products extends Model {
    @Column({
        type: DataType.STRING
    })
    declare name: string

    @Column({
        type: DataType.FLOAT
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare available: boolean
}

export default Products;

