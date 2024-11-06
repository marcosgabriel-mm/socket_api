import Log from "../models/log.js";

class LogService {

    static async getLogs() {

        const logs = await Log.findLogsByUserId(1);

        if (logs.length === 0) {
            return null;
        }

        return logs;
    }

    static async saveLog(log) {
        return await Log.saveLog(log);
    }

}

export default LogService;