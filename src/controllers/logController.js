import LogService from "../services/logService.js";


class LogController {

    static async getUserLog(req, res) { 
        
        try {
            const response = await LogService.getLogs(req.body);

            if (response) {
                return res.status(200).json(response);
            } 

            return res.status(404).json({ message: 'No logs found' });
        
        } catch (error) {

            console.log(error);    
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

    static async postUserLog(req, res) {

        try {
            const response = await LogService.saveLog(req.body);

            if (response) {
                return res.status(201).json(response);
            }

            return res.status(400).json({ message: 'Error saving log' });
        
        } catch (error) {
         
            console.log(error);
            return res.status(500).json({ message: 'Internal server error' });
        }

    }

}

export default LogController;