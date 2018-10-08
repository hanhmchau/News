const consts = {
    API: process.env.RUN_AT === 'server' ? '/api' : 'http://localhost:3000/api',
    roles: {
        READER: 0,
        JOURNALIST: 1
    }
};

export default consts;