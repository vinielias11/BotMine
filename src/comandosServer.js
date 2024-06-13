import { promisify } from 'util';
import { exec, spawn } from 'child_process';
const executaComando = promisify(exec);

let USOU_START = false;
const DEZ_MINUTOS = 10 * 60 * 1000;
let ULTIMO_START = Date.now();
let TIMESTAMP_ALVO = ULTIMO_START + DEZ_MINUTOS;
let processoServer = null;

export const getStatusServer = async (isComando) => {
    const retornoComando = await executaComando('jps', {
        windowsHide: true
    });

    const jarsRodandoObj = retornoComando.stdout.trim().split("\n").reduce((acc, linha) => {
        const [pid, ...nomes] = linha.split(' '),
            nome = nomes.join(' ');

        acc[pid] = nome.trim();

        return acc;
    }, {});

    const nomesJarsRodando = Object.values(jarsRodandoObj),
        status = nomesJarsRodando.includes('server.jar');

    if (isComando) {
        if (status) {
            return 'O servidor está online!'
        } else {
            return 'O servidor está offline!'
        }
    } else {
        return status;
    }
};

export const stopServer = async () => {
    if (!await getStatusServer(false)) {
        return 'Servidor já está offline!';
    }

    if (processoServer !== null) {
        processoServer.stdin.write('stop\r');
        processoServer = null;
    }

    return 'Parando o servidor...'
};

export const startServer = async () => {
    const AGORA = Date.now();

    if (await getStatusServer(false)) {
        return 'Servidor já está online!';
    }

    // Primeiro start do dia
    if (!USOU_START) {
        USOU_START = true;
        
        executaComandoStartServer();

        return 'Iniciando servidor...';
    } else {
        if (AGORA >= TIMESTAMP_ALVO) {
            ULTIMO_START = AGORA;
            TIMESTAMP_ALVO = ULTIMO_START + DEZ_MINUTOS;

            executaComandoStartServer();

            return 'Iniciando servidor...';
        } else {
            return 'O comando já foi usado nos últimos 10 minutos. Não sobrecarregue o PC do Vinicius!'
        }
    }
};

const executaComandoStartServer = () => {
    processoServer = spawn('javaw', [
        '-jar',
        'server.jar',
        '--nogui'
    ], {
        cwd: process.env.PASTA_SERVER,
    });
};

export const fazFicarDeDia = async () => {
    if (!await getStatusServer(false)) {
        return 'Servidor está offline!';
    }

    if (processoServer !== null) {
        processoServer.stdin.write('time set 0\r');
    }

    return 'Deus disse: "Faça-se a luz!" E a luz foi feita.';
};