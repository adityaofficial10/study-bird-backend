require('dotenv').config({
    path: 'config/.env'
});

const api = require('../../config/api');
const ML_API_URL = process.env.ML_API_URL;

module.exports = {
    analyseText : async function(req,res,next){
        let txt = req.body.text;
        let data = {
            "text-stream" : txt 
        }
        let resp = await api.post(ML_API_URL, data);
        // resp.data -> summary, keywords, status

        res.json({code: 200, status: 'success', message: 'Text Analysed Successfully', data: resp.data});
    }
}