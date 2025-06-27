// product-management-server/prisma/seed.ts
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// Dữ liệu được tạo ra bằng cách xử lý các giao dịch duy nhất từ JSON được cung cấp.
const tokenData = [
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPQYMRAKZPQPJAADX5JBEFT0FHE3RZZK9F8TYBQ3.dawgpool-stxcity/1.png',
        name: 'PEGGY',
        symbol: 'PEGGY',
        totalSupply: BigInt(21000000000),
        priceUsd: 0.000214832,
        description: 'PEGGY is a community-focused digital asset on the Stacks blockchain.',
        website: 'https://stxcity.com/token/peggy'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1H8AFVPWYVDCF1D9N1CKAWBNSHVEKFPR1SXXSQ3.asian-girls-are-the-best-stxcity/1.png',
        name: 'GIRLS',
        symbol: 'GIRLS',
        totalSupply: BigInt(1000000000000),
        priceUsd: 3.28525e-8,
        description: 'GIRLS is a social token celebrating art and culture on the Stacks network.',
        website: 'https://stxcity.com/token/girls'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1H8AFVPWYVDCF1D9N1CKAWBNSHVEKFPR1SXXSQ3.harrypotterobamasonic10inu-stxcity/1.png',
        name: 'BITCOIN',
        symbol: 'BITCOIN',
        totalSupply: BigInt(21000000),
        priceUsd: 1.70151e-7,
        description: 'A meme-inspired token on Stacks, not affiliated with the original Bitcoin.',
        website: 'https://stxcity.com/token/hpobamasonic'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3YKHP4K4XAWA7GM612VEHTC1MFT7R729DR7AMZ5.last-one-stxcity/1.png',
        name: 'finish',
        symbol: 'FINISH',
        totalSupply: BigInt(500000000),
        priceUsd: 6.41611e-7,
        description: 'finish is a utility token for a decentralized application ecosystem.',
        website: 'https://stxcity.com/token/finish'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPXZ32XFJZCT4TRDNE4R3HX3DRX9ZE6B5G2WZNRK.pixel-rozar-stxcity/1.png',
        name: 'Rozar',
        symbol: 'ROZAR',
        totalSupply: BigInt(100000000),
        priceUsd: 0.0333761,
        description: 'Rozar is the native token for a pixel art NFT marketplace.',
        website: 'https://stxcity.com/token/rozar'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2WCGAAASF2CGHNNK2596HF97JZNAYM6HMKK4B0F.cheetah-with-television-stxcity/1.png',
        name: 'CTV',
        symbol: 'CTV',
        totalSupply: BigInt(10000000000),
        priceUsd: 0.0000186205,
        description: 'CTV (Cheetah with Television) is a creative project token on Stacks.',
        website: 'https://stxcity.com/token/ctv'
    },
    {
        logo: 'https://pdakhjpwkuwtadzmpnjm.supabase.co/storage/v1/object/public/token_logo/ffZEIgOg-BitCorn-400x400.jpeg',
        name: 'BITCORN',
        symbol: 'BITCORN',
        totalSupply: BigInt(88888888888),
        priceUsd: 2.70171e-7,
        description: 'BITCORN is a fun, community-driven token on the Stacks blockchain.',
        website: 'https://stxcity.com/token/bitcorn'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3ATFW5VSD0W4N0E3K1E4CGFE8MJXQ9XFFMQ0HBY.make-stacks-great-again-stxcity/1.png',
        name: 'MSGA',
        symbol: 'MSGA',
        totalSupply: BigInt(1776000000),
        priceUsd: 6.8085e-7,
        description: 'MSGA (Make Stacks Great Again) is a politically-themed meme token.',
        website: 'https://stxcity.com/token/msga'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPT79WP9SKAVSCST3NZ1GMCA2G82SS8Y643SHEZM.tree-stuck-in-cat-stxcity/1.png',
        name: 'TREEINCAT',
        symbol: 'TREEINCAT',
        totalSupply: BigInt(999999999999),
        priceUsd: 1.00207e-8,
        description: 'TREEINCAT is a meme token with a focus on environmental causes.',
        website: 'https://stxcity.com/token/treeincat'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2AWE8GJ52MKEAGGBTTNEEXZSM9VF8CTYK7ZCZDC.bucket-coin-stxcity/1.png',
        name: 'BUCKET',
        symbol: 'BUCKET',
        totalSupply: BigInt(848000000),
        priceUsd: 0.0000796894,
        description: 'BUCKET is a community token for creators and collectors.',
        website: 'https://stxcity.com/token/bucket'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1T0VY3DNXRVP6HBM75DFWW0199CR0X15PC1D81B.teiko-token-stxcity/1.png',
        name: 'Teiko',
        symbol: 'TEIKO',
        totalSupply: BigInt(100000000),
        priceUsd: 0.000474875,
        description: 'Teiko is a token designed to power a decentralized gaming platform.',
        website: 'https://stxcity.com/token/teiko'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2J6Y09JMFWWZCT4VJX0BA5W7A9HZP5EX96Y6VZY.earlycrows-bonding-curve/1.png',
        name: 'CROW',
        symbol: 'CROW',
        totalSupply: BigInt(50000000),
        priceUsd: 0.00191595,
        description: 'CROW is the governance token for the EarlyCrows DAO.',
        website: 'https://stxcity.com/token/crow'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP11Z0M9SXMXM2BGQHDPT0B9Z03TDE56WFSF6EEX8.gm-stxcity/1.png',
        name: 'GM',
        symbol: 'GM',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.0000253096,
        description: 'GM (Good Morning) token is a social token to spread positivity.',
        website: 'https://stxcity.com/token/gm'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPPXV9FF4A7C509J79638VX751XT2FJEAQFWMDWN.dynamic-stxcity/1.png',
        name: 'DYM',
        symbol: 'DYM',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.0000416942,
        description: 'DYM is a dynamic token for a yield-farming protocol on Stacks.',
        website: 'https://stxcity.com/token/dym'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3P7ES438W0FKBJ0TAC1PCNN0J0SWC6PG7MWJQK3.broccoli-stxcity/1.png',
        name: 'Broccoli',
        symbol: 'BROC',
        totalSupply: BigInt(500000000000),
        priceUsd: 2.94389e-8,
        description: 'Broccoli is a green, healthy, and community-driven meme token.',
        website: 'https://stxcity.com/token/broccoli'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP17EQC4ZJCX3VYXDX1QHZRQZTP80AF373KHXRWY0.kitty-kash-stxcity/1.png',
        name: 'KK',
        symbol: 'KK',
        totalSupply: BigInt(100000000000),
        priceUsd: 5.47293e-7,
        description: 'KK (Kitty Kash) is a feline-themed token for digital collectibles.',
        website: 'https://stxcity.com/token/kk'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3SNCBK1ZH05J3SBST16ZXP2AHSPE9H645ZTRVQ6.building-blocks-stxcity/1.png',
        name: 'Blocks',
        symbol: 'BLOCKS',
        totalSupply: BigInt(10000000000),
        priceUsd: 0.00000862066,
        description: 'Blocks represents the fundamental building blocks of the decentralized web.',
        website: 'https://stxcity.com/token/blocks'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1C8ZG23WE412GV4GJ32AK82CCR1HYD6T9XRCA61.billionaireland-stxcity/1.png',
        name: 'LAND',
        symbol: 'LAND',
        totalSupply: BigInt(10000000000),
        priceUsd: 5.40883e-7,
        description: 'LAND is the native token for the BillionaireLand virtual world.',
        website: 'https://stxcity.com/token/land'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPBKM76FM8T8DEAQ11C9CF9WJKTSMKE140M0VXFM.capy-stxcity/1.png',
        name: 'Capy',
        symbol: 'CAPY',
        totalSupply: BigInt(100000000),
        priceUsd: 0.000244804,
        description: 'Capy is a friendly and relaxed community token inspired by capybaras.',
        website: 'https://stxcity.com/token/capy'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2QVKZ2GWP97TW4RNCT8TN65JRJPVAKERHYSS13E.quantumx-stxcity/1.png',
        name: 'QX',
        symbol: 'QX',
        totalSupply: BigInt(5000000000),
        priceUsd: 0.00000358302,
        description: 'QX (QuantumX) is a token exploring the future of decentralized technology.',
        website: 'https://stxcity.com/token/qx'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPW2CWKC61DTT1PBD6V0R7P81V5RJ2DX3FYSE8YK.alien-poop-stxcity/1.png',
        name: 'APOOP',
        symbol: 'APOOP',
        totalSupply: BigInt(10000000000),
        priceUsd: 7.74167e-7,
        description: 'APOOP (Alien Poop) is a humorous meme coin from another galaxy.',
        website: 'https://stxcity.com/token/apoop'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3VG3RBWCXWBS0ZF9XVRKBQH0HX3MFZCAJFZR1B8.cumrocket-stxcity/1.png',
        name: 'CUM',
        symbol: 'CUM',
        totalSupply: BigInt(100000000000),
        priceUsd: 1.09134e-8,
        description: 'CUM is a meme token with an adult-themed twist for the Stacks ecosystem.',
        website: 'https://stxcity.com/token/cum'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1CYPF2DNAN6G4BJAES82E4JFKE6GAB58YP7QJT1.besto-stxcity/1.png',
        name: 'PENGUIN',
        symbol: 'PENGUIN',
        totalSupply: BigInt(10000000000),
        priceUsd: 1.30965e-7,
        description: 'PENGUIN is a cool and collected token for a decentralized community.',
        website: 'https://stxcity.com/token/penguin'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1GGC8W8EY89HBK59KQSM0DR87CHVAQ3GMM5SZH2.nthn-stxcity/1.png',
        name: 'NTHN',
        symbol: 'NTHN',
        totalSupply: BigInt(10000000000),
        priceUsd: 8.11284e-8,
        description: 'NTHN (Nathan) is a personal token for a community project on Stacks.',
        website: 'https://stxcity.com/token/nthn'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPZPCKV8CNH9PRX2D3XB44DR9S72H10ERB6S57HG.satoshi-btc-stxcity/1.png',
        name: 'SABTC',
        symbol: 'SABTC',
        totalSupply: BigInt(2100000000000000),
        priceUsd: 0.000108064,
        description: 'SABTC aims to be a satoshi-pegged token within the Stacks ecosystem.',
        website: 'https://stxcity.com/token/sabtc'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3VP9X292TYK622MYS93952ZGPEMEQRRVG7C6J0P.the-american-dream-stxcity/1.png',
        name: 'DREAM',
        symbol: 'DREAM',
        totalSupply: BigInt(1776000000),
        priceUsd: 0.00000902739,
        description: 'DREAM is a token representing The American Dream on the blockchain.',
        website: 'https://stxcity.com/token/dream'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2X8WZK0A2X4BJC35JFX231CAHEQER5TMRFQBZ3K.test-dont-buy-stxcity/1.png',
        name: 'ALI',
        symbol: 'ALI',
        totalSupply: BigInt(100000000000),
        priceUsd: 1.04727e-7,
        description: 'ALI is an experimental token on the Stacks network, use with caution.',
        website: 'https://stxcity.com/token/ali'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPGWF6FPVXB6GBF5XVEC73ZHW7WT67Q7JMRJTXVK.assman-stxcity/1.png',
        name: 'SAUCE',
        symbol: 'SAUCE',
        totalSupply: BigInt(10000000000),
        priceUsd: 0.00000330259,
        description: 'SAUCE is the secret ingredient for a new DeFi protocol on Stacks.',
        website: 'https://stxcity.com/token/sauce'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP162XDG5A7FCD2H6DMZ1YAZKAAMD1VVE0Y873YFS.stacks-wif-hat-stxcity/1.png',
        name: 'WIFSTX',
        symbol: 'WIFSTX',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.0000189233,
        description: 'WIFSTX brings the "dog wif hat" meme to the Stacks ecosystem.',
        website: 'https://stxcity.com/token/wifstx'
    },
    {
        logo: 'https://pdakhjpwkuwtadzmpnjm.supabase.co/storage/v1/object/public/token_logo/AOWSTioi-Moon-400x400.jpg',
        name: 'JMOON',
        symbol: 'JMOON',
        totalSupply: BigInt(100000000000000),
        priceUsd: 3.36087e-9,
        description: 'JMOON (June Moon) is a monthly moon-shot token for the community.',
        website: 'https://stxcity.com/token/jmoon'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1GY5JAFE0YYP4DQ9E2JDH7WJATRB4GBZ4G0TSPP.sticks-stxcity/1.png',
        name: 'STICKS',
        symbol: 'STICKS',
        totalSupply: BigInt(10000000000),
        priceUsd: 5.64495e-7,
        description: 'STICKS is a fundamental utility token for a new Stacks-based platform.',
        website: 'https://stxcity.com/token/sticks'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPKMJBHD0P3DT5QPQ40WY3XPV6FV1PPP747AS7J2.stx-punks-stxcity/1.png',
        name: 'StxPunks',
        symbol: 'STXPUNKS',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.0000016333,
        description: 'StxPunks is the official community token for StxPunks NFT holders.',
        website: 'https://stxcity.com/token/stxpunks'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP1CKB57B1V4983HC3DTA05825P8RVQSVV9JN404S.nexa-stxcity/1.png',
        name: 'Nexa',
        symbol: 'NEXA',
        totalSupply: BigInt(21000000000000),
        priceUsd: 2.97073e-7,
        description: 'Nexa is a token aiming to enable fast and scalable transactions on Stacks.',
        website: 'https://stxcity.com/token/nexa'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP2DMWXE71KBCJFG3AQDWS12WP2RAZK9Z2X5H1V4X.stx-man-stxcity/1.png',
        name: 'STXMAN',
        symbol: 'STXMAN',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.00000112994,
        description: 'STXMAN is a superhero-themed meme coin for the Stacks community.',
        website: 'https://stxcity.com/token/stxman'
    },
    {
        logo: 'https://gaia.hiro.so/hub/1NS3xZVpANQ8i4ghAcsPfQhrUYmU58offM/Beard.jpeg',
        name: 'BEARD',
        symbol: 'BEARD',
        totalSupply: BigInt(100000000),
        priceUsd: 0.000445735,
        description: 'BEARD is the official token of Trevor\'s Beard, a community project.',
        website: 'https://stxcity.com/token/beard'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPSCB8RZF2KQ6H30X6V1XZ1HSJYGRA1RNWWG8Z0F.gravity-is-not-real-stxcity/1.png',
        name: 'WEIGHT',
        symbol: 'WEIGHT',
        totalSupply: BigInt(100000000000),
        priceUsd: 2.79963e-8,
        description: 'WEIGHT is a token that defies the laws of financial gravity. A meme experiment.',
        website: 'https://stxcity.com/token/weight'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP92DN6798JJED7W3QZHFEAB9Q1BCMCVE2YPMY5F.there-is-one-true-god-stxcity/1.png',
        name: 'PRAISE',
        symbol: 'PRAISE',
        totalSupply: BigInt(77777777777),
        priceUsd: 3.36105e-8,
        description: 'PRAISE is a token for a faith-based community on the Stacks blockchain.',
        website: 'https://stxcity.com/token/praise'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP3BJ0KSAF04HGFSBKHW4TMJ5MGAAADAHDFPPHF8M.orbit-ai-stxcity/1.png',
        name: 'OBT',
        symbol: 'OBT',
        totalSupply: BigInt(1000000000),
        priceUsd: 0.00000342865,
        description: 'OBT (Orbit AI) is a token for a decentralized AI and machine learning platform.',
        website: 'https://stxcity.com/token/obt'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SP38C4PCSDNSXD50PE28BM9NNTQ0J2CZ3D190M1XD.bitmap-stxcity/1.png',
        name: 'BITMAP',
        symbol: 'BITMAP',
        totalSupply: BigInt(210000000000),
        priceUsd: 3.12696e-7,
        description: 'BITMAP is a token linking the worlds of Bitcoin ordinals and Stacks.',
        website: 'https://stxcity.com/token/bitmap'
    },
    {
        logo: 'https://assets.hiro.so/api/mainnet/token-metadata-api/SPKRRY3W08RPFBTCZKN5N81SZQAVTAWSYE5VTTJP.stxongoggins-stxcity/1.png',
        name: 'GOGGINS',
        symbol: 'GOGGINS',
        totalSupply: BigInt(1000000000000),
        priceUsd: 7.9103e-8,
        description: 'GOGGINS is a motivational token inspired by David Goggins. Stay hard!',
        website: 'https://stxcity.com/token/goggins'
    }
];

async function main() {
    console.log('Start seeding...');

    // Clear existing data (optional)
    await prisma.token.deleteMany({});
    console.log('Cleared existing tokens');

    // Insert seed data
    for (const token of tokenData) {
        const result = await prisma.token.create({
            data: token
        });
        console.log(`Created token: ${result.name} (${result.symbol})`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });