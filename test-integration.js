const { Connection, PublicKey, Keypair, SystemProgram } = require('@solana/web3.js');
const { Program, AnchorProvider, Wallet, BN } = require('@coral-xyz/anchor');
const { createMint, createAssociatedTokenAccount, getAssociatedTokenAddress } = require('@solana/spl-token');
const fs = require('fs');

// Загружаем IDL
const idl = JSON.parse(fs.readFileSync('./public/idl/luxeshare.json', 'utf8'));

// Конфигурация
const PROGRAM_ID = new PublicKey('EF9CQ7WfxzUmTpmQxhMv9WFCJoLkyTKniXdDYXaUg5Kh');
const NETWORK = 'http://127.0.0.1:8899'; // localnet
const USDC_MINT = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');

// Создаем подключение
const connection = new Connection(NETWORK, 'confirmed');

// Создаем тестовый кошелек
const wallet = Keypair.generate();
console.log('🔑 Тестовый кошелек создан:', wallet.publicKey.toString());

// Создаем провайдер
const provider = new AnchorProvider(connection, new Wallet(wallet), { commitment: 'confirmed' });
const program = new Program(idl, PROGRAM_ID, provider);

// Функция для получения PDA
function getAssetPDA(assetMint) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('asset'), assetMint.toBuffer()],
    PROGRAM_ID
  );
}

function getUserPositionPDA(asset, user) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('pos'), asset.toBuffer(), user.toBuffer()],
    PROGRAM_ID
  );
}

async function testIntegration() {
  try {
    console.log('🚀 Начинаем тестирование интеграции...\n');

    // 1. Создаем NFT mint для актива
    console.log('1️⃣ Создаем NFT mint для актива...');
    const assetMint = await createMint(
      connection,
      wallet,
      wallet.publicKey,
      wallet.publicKey,
      0 // 0 decimals for NFT
    );
    console.log('✅ NFT mint создан:', assetMint.toString());

    // 2. Создаем shares mint
    console.log('\n2️⃣ Создаем shares mint...');
    const sharesMint = await createMint(
      connection,
      wallet,
      wallet.publicKey,
      wallet.publicKey,
      0 // 0 decimals for whole shares
    );
    console.log('✅ Shares mint создан:', sharesMint.toString());

    // 3. Получаем PDA для актива
    console.log('\n3️⃣ Получаем PDA для актива...');
    const [assetPDA] = getAssetPDA(assetMint);
    console.log('✅ Asset PDA:', assetPDA.toString());

    // 4. Создаем ATA для vault и staking vault
    console.log('\n4️⃣ Создаем ATA для vault и staking vault...');
    const vault = await getAssociatedTokenAddress(USDC_MINT, assetPDA, true);
    const stakingVault = await getAssociatedTokenAddress(sharesMint, assetPDA, true);
    console.log('✅ Vault ATA:', vault.toString());
    console.log('✅ Staking vault ATA:', stakingVault.toString());

    // 5. Инициализируем актив
    console.log('\n5️⃣ Инициализируем актив...');
    const tx = await program.methods
      .initAsset(
        'Test Yacht',
        new BN(1000000), // $1000 per day (6 decimals)
        500 // 5% fee
      )
      .accounts({
        authority: wallet.publicKey,
        assetMint,
        sharesMint,
        usdcMint: USDC_MINT,
        asset: assetPDA,
        vault,
        stakingVault,
        tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('✅ Актив инициализирован! TX:', tx);

    // 6. Получаем данные актива
    console.log('\n6️⃣ Получаем данные актива...');
    const asset = await program.account.asset.fetch(assetPDA);
    console.log('✅ Данные актива:');
    console.log('   - Название:', Buffer.from(asset.name).toString('utf8').replace(/\0/g, ''));
    console.log('   - Базовая цена:', asset.baseDailyPriceUsd.toString());
    console.log('   - Текущая цена:', asset.currentDailyPriceUsd.toString());
    console.log('   - Комиссия:', asset.feeBps.toString() + '%');
    console.log('   - Всего застейкано:', asset.totalStaked.toString());

    // 7. Минтим доли
    console.log('\n7️⃣ Минтим доли...');
    const userSharesAta = await getAssociatedTokenAddress(sharesMint, wallet.publicKey);
    
    // Создаем ATA если не существует
    try {
      await createAssociatedTokenAccount(connection, wallet, sharesMint, wallet.publicKey);
    } catch (e) {
      // ATA уже существует
    }

    const mintTx = await program.methods
      .mintShares(new BN(100)) // 100 долей
      .accounts({
        authority: wallet.publicKey,
        asset: assetPDA,
        sharesMint,
        toSharesAta: userSharesAta,
        tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
      })
      .rpc();

    console.log('✅ Доли заминчены! TX:', mintTx);

    // 8. Стейкинг
    console.log('\n8️⃣ Выполняем стейкинг...');
    const [userPositionPDA] = getUserPositionPDA(assetPDA, wallet.publicKey);
    
    const stakeTx = await program.methods
      .stake(new BN(50)) // Стейкаем 50 долей
      .accounts({
        user: wallet.publicKey,
        asset: assetPDA,
        sharesMint,
        usdcMint: USDC_MINT,
        userSharesAta,
        stakingVault,
        userPosition: userPositionPDA,
        tokenProgram: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log('✅ Стейкинг выполнен! TX:', stakeTx);

    // 9. Получаем позицию пользователя
    console.log('\n9️⃣ Получаем позицию пользователя...');
    const position = await program.account.userPosition.fetch(userPositionPDA);
    console.log('✅ Позиция пользователя:');
    console.log('   - Доли застейкано:', position.sharesStaked.toString());
    console.log('   - Награды:', position.accruedRewards.toString());

    console.log('\n🎉 Все тесты прошли успешно! Интеграция работает!');

  } catch (error) {
    console.error('❌ Ошибка:', error);
  }
}

// Запускаем тест
testIntegration();
