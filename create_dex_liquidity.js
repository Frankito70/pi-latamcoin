const StellarSdk = require('stellar-sdk');

// NOTA DE SEGURIDAD CRÍTICA:
// **Nunca** se deben hardcodear las claves secretas en un entorno real.
// En producción, carga estas claves de variables de entorno (ej: process.env.SECRET_KEY).

// 1. CONFIGURACIÓN DE RED Y SERVIDOR
// Usamos la red de prueba estándar de Stellar
StellarSdk.Network.useTestNetwork(); 
const HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new StellarSdk.Server(HORIZON_URL);

// 2. CLAVES (Reemplaza los valores con tus claves SECRETAS reales antes de ejecutar)
const DISTRIBUTOR_SECRET = "SC6KAAEVA26KI6ABIJ4APG26IYFBCPT2QJYKUW32UCZC5PTIE7JJBISY"; // Clave Secreta del Distribuidor
const EMITTER_SECRET = "SAIXPTYM5BL2GQDBLFZGROSCI5DIY4JXJIEZDV4VW5KY4PML2HOAADU3";     // Clave Secreta del Emisor
const EMITTER_PUBLIC_KEY = "GCOQVGBWRBJ36TAUYLBE5R2AETKI3CQXYJEJNY6C6CMZ7C4F5GQUGMPK"; // Clave Pública del Emisor

// 3. CONFIGURACIÓN DEL TOKEN (Ajustado a "LAT" para coincidir con pi.toml)
const TOKEN_CODE = "LAT";
const INITIAL_SUPPLY = "55000000";

// Generación de Keypairs y Asset
const distributorKeypair = StellarSdk.Keypair.fromSecret(DISTRIBUTOR_SECRET);
const emitterKeypair = StellarSdk.Keypair.fromSecret(EMITTER_SECRET);
const LATAMcoin = new StellarSdk.Asset(TOKEN_CODE, EMITTER_PUBLIC_KEY);

/**
 * Función principal para crear la Trustline y acuñar los tokens.
 */
async function createAndMintToken() 
    try {
        console.log(`\n--> Iniciando creación y acuñación de ${TOKEN_CODE}...`);
        console.log(`- Emisor (Issuer): ${emitterKeypair.publicKey()}`);
        console.log(`- Distribuidor (Holder): ${distributorKeypair.publicKey()}`);

        // -----------------------------------------------
        // PASO 1: Crear Trustline (Línea de Confianza)
        // -----------------------------------------------
        console.log("\n[1/2] Creando Trustline en la cuenta del Distribuidor...");
        
        // Cargamos la cuenta del Distribuidor para obtener el número de secuencia
        let distributorAccount = await server.loadAccount(distributorKeypair.publicKey());

        // El límite alto permite que el Distribuidor pueda recibir hasta esa cantidad
        const trustTx = new StellarSdk.TransactionBuilder(distributorAccount, { fee: "100" })
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: LATAMcoin,
            limit: '900000000000.0000000', // Un límite muy alto
        }))
        .setTimeout(30)
        .build();

        // Firmar y enviar
        trustTx.sign(distributorKeypair);
        await server.submitTransaction(trustTx);
        console.log("    ✅ Trustline creada exitosamente.");

        // -----------------------------------------------
        // PASO 2: Acuñar (Minting) enviando los tokens del Emisor al Distribuidor
        // -----------------------------------------------
        console.log(`\n[2/2] Acuñando ${INITIAL_SUPPLY} tokens...`);
        
        // Cargamos la cuenta del Emisor para obtener el número de secuencia
        let emitterAccount = await server.loadAccount(emitterKeypair.publicKey());

        // Construimos la transacción de pago (minting)
        const paymentTx = new StellarSdk.TransactionBuilder(emitterAccount, { fee: "100" })
        .addOperation(StellarSdk.Operation.payment({
            destination: distributorKeypair.publicKey(), // El Distribuidor es el receptor
            asset: LATAMcoin,                           // El token LAT
            amount: INITIAL_SUPPLY,                     // La cantidad total a emitir
        }))
        .setTimeout(30)
        .build();

        // Firmar y enviar
        paymentTx.sign(emitterKeypair);
        await server.submitTransaction(paymentTx);
        console.log(`    ✅ Acuñación de ${INITIAL_SUPPLY} tokens completada.`);

        // -----------------------------------------------
        // Confirmación Final
        // -----------------------------------------------
        console.log("\n🎉 **¡OPERACIÓN COMPLETADA!**");
        console.log(`    Token: ${TOKEN_CODE}`);
        console.log(`    Cantidad total emitida: ${INITIAL_SUPPLY}`);
        console.log(`    Ver en explorador (Distribuidor): https://testnet.stellarchain.io/account/${distributorKeypair.publicKey()}`);

    } catch (error) {
        console.error("\n❌ Error en el proceso. Revisa si las cuentas están fondeadas o si el Trustline ya existe:");
        // Intentamos dar un detalle específico del error de Stellar
        if (error.response && error.response.data && error.response.data.extras) {
            console.error("    Detalle de Stellar:", JSON.stringify(error.response.data.extras.result_codes, null, 2));
        } else {
            console.error("    Mensaje General:", error.message);
        }
    }
}

createAndMintToken().catch(err => {
    console.error("Error fatal:", err);
});