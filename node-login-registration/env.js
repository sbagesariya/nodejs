
module.exports = {
    local: {
        baseURL: 'http://localhost:3001',
        DB_HOST: 'localhost',
        DB_User: '',
        DB_Pass: '',
        DB_PORT: process.env.DB_PORT || 27017,
        DB_NAME: process.env.DB_NAME || 'practical_test',
        PORT: 3000,
        jwt_secret:'jwt_secret@test123'
    }
};
