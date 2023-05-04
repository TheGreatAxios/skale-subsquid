import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"

@Entity_()
export class EvmLog {
    constructor(props?: Partial<EvmLog>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: false})
    address!: string

    @Column_("text", {nullable: false})
    data!: string

    @Column_("int4", {nullable: false})
    index!: number

    @Column_("bool", {nullable: true})
    removed!: boolean | undefined | null

    @Column_("text", {array: true, nullable: false})
    topics!: (string)[]

    @Column_("int4", {nullable: false})
    transactionIndex!: number
}
