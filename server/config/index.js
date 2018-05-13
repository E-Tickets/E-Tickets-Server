const config = {
    port: 8080,
    database: {
        DATABASE: 'e_tickets',
        USERNAME: 'tickets_admin',
        PASSWORD: 'tickets',
        HOST: 'localhost',
        PORT: 3306
    },
    session: {
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false 
    },
    path: {
        avatarPath: '/home/qyb225/Documents/Nginx/website/static/images/avatar',
        posterPath: '/home/qyb225/Documents/Nginx/website/static/images/poster'
    }
};

module.exports = config;