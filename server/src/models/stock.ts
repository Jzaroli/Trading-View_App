import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface StockAttributes {
    id: number;
    symbol: string;
    assignedUserId?: number;
  }

interface StockCreationAttributes extends Optional<StockAttributes, 'id'> {}

export class Stock extends Model<StockAttributes, StockCreationAttributes> implements StockAttributes {
    public id!: number;
    public symbol!: string;
    public assignedUserId!: number;
    
    // associated user model:
    public readonly assignedUser?: User;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

export function StockFactory(sequelize: Sequelize): typeof Stock {
    Stock.init(
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          symbol: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        },
        {
            tableName: 'stocks',
            sequelize,
        }
    );

    return Stock;
}

