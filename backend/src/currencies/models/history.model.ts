import {
  Column,
  Model,
  Table,
  DataType,
  Sequelize,
} from 'sequelize-typescript';

@Table({ createdAt: true })
export class History extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: Sequelize.fn('public.uuid_generate_v4'),
  })
  id: string;

  @Column({ allowNull: false })
  currencyFrom: string;

  @Column({ allowNull: false })
  currencyTo: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  valueFrom: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  valueTo: number;
}
