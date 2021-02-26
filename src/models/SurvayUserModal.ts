import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { SurveyModal } from "./SurveyModal";
import { UserMoldel } from './UserModel'

@Entity("surveys_users")
class SurveyUserModal {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => UserMoldel)
    @JoinColumn({ name: "user_id" })
    user: UserMoldel

    @Column()
    survey_id: string;

    @ManyToOne(() => SurveyModal)
    @JoinColumn({ name: "survey_id" })
    survey: SurveyModal

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
export { SurveyUserModal }