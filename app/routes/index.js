const express = require('express');
const router = express.Router();

const jsonQuery = require('json-query');

const fs = require('fs');
const path = require('path');

let response_json,input_vars ={};

    router.get('/:request_type/:request_workflow', function(req, res) {
        fs.readFile(path.resolve(__dirname, "../data/payload.json"),function (err,rawdata) {
            if (err) throw err;
            let data = JSON.parse(rawdata);
            input_vars.request_type = req.params.request_type;
            input_vars.request_workflow = req.params.request_workflow;


            let validateJson = checkInputValidation(input_vars, rawdata);
            if (validateJson) {

                response_json = jsonQuery('payload[*type=' + input_vars.request_type + ' ' +
                '& workflow = ' + input_vars.request_workflow + ']', {data: data}).value;

                let filtered_data = filterData(response_json);
                let data_write = JSON.stringify(filtered_data, null, 2);

                fs.writeFile(path.resolve(__dirname, "../data/response.json"), data_write, (err) => {
                    if (err) throw err;
                });
                res.json({response:filtered_data});
                //res.render('index', {title: 'Small API App', response: filtered_data});

            }else{
                res.status(400).json({ error: "Could not decode request: JSON parsing failed" });

            }
        });
});
 router.get('/', function(req, res) {
     res.render('index', {title: 'Small API App'});
});


function filterData(data){
    let concate_address;
    data.map((obj) => {
        concate_address = obj.address.buildingNumber+' '+obj.address.street+' '+obj.address.suburb+' ' +
            ''+obj.address.state+' '+obj.address.postcode ;

        obj.concataddress = concate_address;

         //delete unwanted
        delete obj.address;
        delete obj.propertyTypeId;
        delete obj.readyState;
        delete obj.reference;
        delete obj.shortId;
        delete obj.status;
        delete obj.valfirm;
        return obj;

    });

    return data;
}

function checkInputValidation(inputs,json_data){
    let arr_type=[],arr_wrkfw =[];

    JSON.parse(json_data, (key, value) =>{
        if(key == 'type'){
            arr_type.push(value);
        }
        if(key == 'workflow'){
            arr_wrkfw.push(value);
        }
    });

    let check_request_type = arr_type.includes(inputs.request_type);
    let check_request_workflow = arr_wrkfw.includes(inputs.request_workflow);

    if(check_request_type == true && check_request_workflow== true)
        return true;


}


module.exports = router;
