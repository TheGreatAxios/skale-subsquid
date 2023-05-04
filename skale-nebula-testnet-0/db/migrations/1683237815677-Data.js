module.exports = class Data1683237815677 {
    name = 'Data1683237815677'

    async up(db) {
        await db.query(`CREATE TABLE "evm_block" ("id" character varying NOT NULL, "height" integer NOT NULL, "hash" text NOT NULL, "parent_hash" text NOT NULL, "nonce" numeric, "sha3_uncles" text NOT NULL, "logs_bloom" text NOT NULL, "transactions_root" text NOT NULL, "state_root" text NOT NULL, "receipts_root" text NOT NULL, "miner" text NOT NULL, "difficulty" text, "total_difficulty" text, "extra_data" text NOT NULL, "size" numeric NOT NULL, "gas_limit" numeric NOT NULL, "gas_used" numeric NOT NULL, "timestamp" numeric NOT NULL, "mix_hash" text, "base_fee_per_gas" numeric, CONSTRAINT "PK_eccdff59e1fd345239a106b7196" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "evm_transaction" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_hash" text NOT NULL, "from" text, "gas" numeric NOT NULL, "gas_price" numeric, "hash" text NOT NULL, "input" text NOT NULL, "nonce" numeric NOT NULL, "to" text, "index" integer NOT NULL, "value" numeric NOT NULL, "type" integer, "chain_id" integer, "v" numeric NOT NULL, "r" text NOT NULL, "s" text NOT NULL, "max_priority_fee_per_gas" numeric, "max_fee_per_gas" numeric, "y_parity" integer, "status" integer, CONSTRAINT "PK_5cb059f05ba72ac04ac1cfb3775" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "evm_log" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_hash" text NOT NULL, "address" text NOT NULL, "data" text NOT NULL, "index" integer NOT NULL, "removed" boolean, "topics" text array NOT NULL, "transaction_index" integer NOT NULL, CONSTRAINT "PK_46aa4562a71db276862c5960c85" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "evm_block"`)
        await db.query(`DROP TABLE "evm_transaction"`)
        await db.query(`DROP TABLE "evm_log"`)
    }
}
