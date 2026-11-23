
function registrarAuditoria(conn, {
    id_usuario = null,
    acao,
    descricao = null,
    entidade = null,
    id_entidade = null,
    ip = null
}) {
    return new Promise((resolve) => {

        if (!acao || typeof acao !== 'string') {
            console.error('Ação inválida ao registrar auditoria.');
            return resolve(false);
        }

        const sql = `
            INSERT INTO logs_auditoria (
                id_usuario,
                acao,
                descricao,
                entidade,
                id_entidade,
                ip
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const valores = [
            id_usuario,
            acao.trim().slice(0, 50),
            descricao,
            entidade,
            id_entidade,
            ip
        ];

        conn.query(sql, valores, (err) => {

            if (err) {
                console.error('Erro ao registrar auditoria:', err);
                return resolve(false);
            }

            resolve(true);
        });
    });
}

module.exports = registrarAuditoria;
