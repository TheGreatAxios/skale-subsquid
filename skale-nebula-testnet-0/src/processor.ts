import { TypeormDatabase } from "@subsquid/typeorm-store";
import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { EvmBlock, EvmLog, EvmTransaction } from "./model";

const processor = new EvmBatchProcessor()
    .setDataSource({
        chain: "https://staging-v3.skalenodes.com/v1/staging-faint-slimy-achird",
        archive: lookupArchive("skale-nebula-staging"),
    })
    .addTransaction([], {
        range: {
            from: 0,
        },
        data: {
            block: {
                id: true,
                height: true,
                hash: true,
                parentHash: true,
                nonce: true,
                sha3Uncles: true,
                logsBloom: true,
                transactionsRoot: true,
                stateRoot: true,
                receiptsRoot: true,
                miner: true,
                difficulty: true,
                totalDifficulty: true,
                extraData: true,
                size: true,
                gasLimit: true,
                gasUsed: true,
                timestamp: true,
                mixHash: true,
                baseFeePerGas: true,
            },
            evmLog: {
                id: true,
                address: true,
                data: true,
                index: true,
                removed: true,
                topics: true,
                transactionIndex: true
            },
            transaction: {
                id: true,
                from: true,
                gas: true,
                gasPrice: true,
                hash: true,
                input: true,
                nonce: true,
                to: true,
                index: true,
                value: true,
                type: true,
                chainId: true,
                v: true,
                r: true,
                s: true,
                maxPriorityFeePerGas: true,
                maxFeePerGas: true,
                yParity: true,
                status: true,
            },
        },
    });

function formatID(height: any, hash: string) {
    return `${String(height).padStart(10, "0")}-${hash}`;
}

processor.run(new TypeormDatabase(), async (ctx) => {
    const blocks: EvmBlock[] = [];
    const txs: EvmTransaction[] = [];
    const logs: EvmLog[] = [];

    for (let block of ctx.blocks) {
        /// Store Block
        blocks.push(new EvmBlock({
            ...block.header,
            timestamp: BigInt(block.header.timestamp),
        }));

        for (let item of block.items) {
            if (item.kind === "evmLog") logs.push(new EvmLog({ 
                ...item.evmLog,
                blockNumber: block.header.height,
                blockHash: block.header.hash
            }));
            else if (item.kind === "transaction") txs.push(new EvmTransaction({ 
                ...item.transaction,
                blockNumber: block.header.height,
                blockHash: block.header.hash
            }));
        }

        
    }
    
    await ctx.store.save(txs);
    await ctx.store.save(logs);
    await ctx.store.save(blocks);
});
