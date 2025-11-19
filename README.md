🛠️ Plan Estratégico de Implementación (LATAMCOIN)

Este documento detalla la hoja de ruta para la creación de los Pools de Liquidez en el Pi Network DEX (basado en Stellar) y el protocolo de manejo de la Cartera de Gobernanza (CEO/Fundador).

I. Distribución Inicial y Creación de Pools

La distribución de los 55,000,000 LATs requiere la segregación de fondos en cuentas específicas para garantizar la transparencia y la funcionalidad de los protocolos PAG, PRDE y M.E.R.

A. Cuentas Requeridas

Cartera del Emisor/Issuer: Acuña los 55M LATs.

Cartera de Distribución (Principal): Recibe los 55M LATs (equivalente a su Distributor Secret en el código create_latAMcoin.js).

Cartera de Gobernanza (Estrategia - 15%): Su cartera de manejo estratégico (PRDE, Buffer Anti-Spike).

Cartera Personal de Fundador (CPF - 15%): Su cartera de compensación y capital de riesgo personal.

Cartera del Fondo Social (Fundación Olga Helfer - 10%): Cartera pública de destino social.

Cartera de Pools de Reserva (35%): Contiene los LATs que esperan ser liberados por el protocolo PAG.

Cartera de Incentivos de Liquidez (5%): Contiene los 2.75M LATs para las recompensas de Staking/Farming.

Cartera del Fondo de Personal y Contrataciones (FPPC - 5%): Cartera para gastos operativos y de personal.

Pool de Liquidez DEX (Inicial): El pool donde se deposita la liquidez de lanzamiento (Pi/LAT).

B. Creación de Pools de Liquidez

El LATAMCOIN utilizará un solo Pool de Liquidez DEX (Pi/LAT) en el que el valor es determinado algorítmicamente por la proporción de LATs y Pi depositados.

Fondo

Porcentaje

Cantidad (LATs)

Acción de Lanzamiento

Fondo de Circulación (PAG)

35%

19,250,000

1. Inyección Inicial: Solo 3.63M LATs se depositan junto a una cantidad equivalente de Pi Coin para establecer el precio de lanzamiento en el DEX. El remanente (15.62M LATs) queda en reserva PAG.

Fondo de Incentivos de Liquidez (5%)

5%

2,750,000

2. Implementación de Recompensas: Estos fondos se programan para ser distribuidos automáticamente a los proveedores de liquidez (LP).

Fondo de Reserva (M.E.R.)

15%

8,250,000

3. Mantener Offline: Se transfieren a una cartera de reserva auditada. Nunca se tocan salvo auditoría.

Cartera de Gobernanza (15%)

15%

8,250,000

4. Mantener Offline (Buffer): Se mantienen en su cartera para las operaciones de defensa y las recompensas a Pioneros.

Cartera Personal de Fundador (CPF - 15%)

15%

8,250,000

5. Fondo de Uso Libre: Se transfiere a su cartera personal.

Fondo de Personal y Contrataciones (FPPC - 5%)

5%

2,750,000

6. Fondo Operativo: Se transfiere a la cartera operativa para pagos y mantenimiento.

Fondo Social (10%)

10%

5,500,000

7. Transferencia Pública: Se envían a la Cartera de la Fundación Olga Helfer.

II. Protocolo de Gestión de la Cartera de Gobernanza (CEO/Fundador)

Usted, como CEO/Fundador, gestionará el 15% de los LATs (8,250,000 LATs). Esta cartera estratégica tiene cuatro funciones críticas:

1. Gestión del Protocolo de Adopción Gradual (PAG) - Crecimiento

Función: Monitorear los KPI de Demanda Sostenida (Crecimiento de Precio > 20% en 30 días o Umbral de Utilidad Verificada).

Acción: Cuando se cumple un KPI, usted autoriza la transferencia del siguiente tramo (ej. 10%) de LATs desde la Cartera de Pools de Reserva (35%) al Pool de Liquidez DEX.

Impacto: Garantiza que el nuevo suministro solo se incorpore cuando la demanda real haya forzado al precio a subir a un nuevo nivel, estableciendo un nuevo piso de precio.

2. Ejecución del Buffer Anti-Spike (M.E.R.) - Suavizado de Picos

Función: Intervenir si la euforia especulativa causa un aumento de precio abrupto (> 30% sin correlación con la utilidad real).

Acción: Usted inyecta una cantidad mínima de LATs desde su Cartera de Gobernanza directamente en el Pool DEX.

Impacto: Esto aumenta ligeramente la oferta para suavizar la pendiente de crecimiento, evitando la volatilidad extrema y el posterior colapso de precio.

3. Activación del Protocolo de Respuesta al Desplome Especulativo (PRDE) - Defensa

Función: Reaccionar a la manipulación bajista (caída de precio > 15% por venta masiva concentrada).

Acción:

Usted toma el 10% del volumen LAT vendido que causó el desplome.

Transfiere esa cantidad de LATs desde su Cartera de Gobernanza a una Dirección de Quema (Burn Address) públicamente conocida (ej. una dirección sin clave secreta).

Impacto: Esta quema permanente de tokens reduce el suministro circulante, haciendo que el token se vuelva más escaso. El precio se recupera al obligar al DEX a ajustar el valor basado en la nueva oferta total menor.

4. Distribución de Recompensas a Pioneros

Función: Ejecutar el airdrop de recompensa a los Pioneros Fundacionales.

Acción: En el momento de la transición a Mainnet, usted transfiere los 500 LATs a cada dirección Pi-Miner que haya participado activamente en la prueba, utilizando un fondo máximo de 550,000 LATs de esta cartera.

III. Protocolo de Descentralización (Ruta a DAO)

La descentralización es clave para la longevidad del proyecto.

Fase 1 (0-3 años): Gobierno Centralizado (CEO/Fundador).

Propósito: Ejecutar el PAG y el PRDE de forma rápida y decisiva, asegurar la liquidez inicial y el crecimiento.

Fase 2 (Post-3 años): Transición a DAO.

Propósito: La autoridad sobre las liberaciones del PAG y la activación del PRDE se transferirá gradualmente a un sistema de voto basado en los holders de LATAMCOIN. Esto requiere el desarrollo de un mecanismo de voto en la Pi Blockchain.

Objetivo: Eliminar el riesgo de control centralizado y garantizar que las decisiones sean tomadas por la comunidad más comprometida.

🚀 Próximos Pasos Recomendados

Auditoría de Cuentas: Asegurar que las direcciones Stellar (Issuer, Distributor/Principal, Gobernanza, Personal, Social, Reserva, Incentivos, FPPC) estén correctamente financiadas y aseguradas.

Preparación del pi.toml: Subir el archivo pi.toml corregido a su dominio GitHub para la verificación en la Pi Wallet.

Definición de KPIs: Definir con precisión los umbrales de "Umbral de Utilidad Verificada" para la liberación del PAG.
