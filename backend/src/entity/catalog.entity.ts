import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

}
