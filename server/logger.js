import bunyan from 'bunyan'
let log = bunyan.createLogger({name: 'run', level: 'info'});
export default log