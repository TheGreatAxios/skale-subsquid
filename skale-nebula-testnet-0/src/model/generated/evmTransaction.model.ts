import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class EvmTransaction {
    constructor(props?: Partial<EvmTransaction>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("text", {nullable: true})
    from!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gas!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    gasPrice!: bigint | undefined | null

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: false})
    input!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    nonce!: bigint

    @Column_("text", {nullable: true})
    to!: string | undefined | null

    @Column_("int4", {nullable: false})
    index!: number

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @Column_("int4", {nullable: true})
    type!: number | undefined | null

    @Column_("int4", {nullable: true})
    chainId!: number | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    v!: bigint

    @Column_("text", {nullable: false})
    r!: string

    @Column_("text", {nullable: false})
    s!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    maxPriorityFeePerGas!: bigint | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    maxFeePerGas!: bigint | undefined | null

    @Column_("int4", {nullable: true})
    yParity!: number | undefined | null

    @Column_("int4", {nullable: true})
    status!: number | undefined | null
}
