import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'text' })
    comment_text: string;
    /*_tags: number;*/
}
