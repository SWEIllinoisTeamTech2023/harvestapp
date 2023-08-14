from flask import Flask, request
import json
from secret import CLUSTER_ARN, SECRET_ARN, EIA_FUEL_PRICE_API_KEY
# import jsonpickle

from flask.json import jsonify
import boto3
import requests

app = Flask(__name__)

rdsData = boto3.client('rds-data')

# Request made when user clicks on compute cost of harvest


@app.route('/storeInputs', methods=['POST'])
def storeInputs():
    data = request.get_json()  # Get the JSON data from the request
    # data = {"machine_type":data[], "header_width":"12", "yield":200, "crop_type":"corn"} # Testing purposes
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.Inputs (user, machine_type, header_width, yield, crop_type, annual_hours) VALUES ("{}","{}", {}, {}, "{}",{})'.format(data["user"], data["machine_type"], data["header_width"], data["yield"], data["crop_type"], data["annual_hours"]))

    # Call API and store API results into APIPrice Table
    # fuel_price = getFuelPrice()
    # crop_price = getCropPrice(data['crop_type'])

    # TODO: Run model with inputs & return simulation variables

    # Return a response
    return jsonify(response), 200


@app.route('/saveSimulation', methods=['POST'])
def saveSimulation():
    data = request.get_json()
    print("this is the data: ", data)
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.SavedSimulations (user, name, rotor_speed, fan_speed, speed, sieve_clearance, concave_clearance, chaffer_clearance) VALUES ("{}","{}",{},{},{},{},{},{})'.format(data["user"], data["name"], data["rotorSpeed"], data["fanSpeed"], data["speed"], data["sieveClear"], data["concaveClear"], data["chafferClear"]))

    return jsonify(response), 200


@app.route('/getSavedSimulations', methods=['GET'])
def viewSavedSimulations():
    print("in viewSavedSimul")
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='SELECT * FROM harvest.SavedSimulations'
    )
    # print("jsonify reponse: ", response['records'])
    return json.dumps(response['records'])


def getFuelPrice():
    # TODO: Only call API if no value exists for date
    resp = requests.get(
        'http://api.eia.gov/v2/seriesid/PET.EMD_EPD2D_PTE_NUS_DPG.W?api_key='+EIA_FUEL_PRICE_API_KEY).json()
    fuel_price = resp['response']['data'][0]['value']
    print("Fuel Price: ",  resp['response']['data'][0]
          ['value'], resp['response']['data'][0]['units'])
    rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.APIPrices (date, fuel) VALUES (CURDATE(),{}) ON DUPLICATE KEY UPDATE fuel={}'.format(fuel_price, fuel_price))


def getCropPrice(crop):
    # TODO: Find Alternative to Commodities API
    # TODO: Only call API if no value exists for date
    resp = requests.get("REPLACE WITH API ENDPOINT").json()
    crop_price = ...
    rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.APIPrices (date, {}) VALUES (CURDATE(),{}) ON DUPLICATE KEY UPDATE {}={}'.format(crop, crop_price))
    return crop_price

# TODO: Create request to store model outputs in RDS and send to app


@ app.route('/storeOutputs', methods=['POST'])
def storeOutputs():
    # Testing purposes, this data should be sent over from model
    # id should represent foreign key from inputs table
    data = {"fan_speed": 30, "rotor_speed": 12, "concave_clearance": 200, "speed": 30,
            "chaffer_clearance": 20, "sieve_clearance": 10, "optimized_cost_of_harvest": 100, "id": 123}
    rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.Outputs (fan_speed, rotor_speed, concave_clearance, speed, chaffer_clearance, sieve_clearance, optimized_cost_of_harvest, id) VALUES ({},{},{},{},{},{},{},{})'.format(data["fan_speed"], data["rotor_speed"], data["concave_clearance"], data["speed"], data["chaffer_clearance"], data["sieve_clearance"], data["optimized_cost_of_harvest"], data["id"]))


@ app.route('/test', methods=['POST'])
def test():
    return "hi"


if __name__ == '__main__':
    app.run(host='localhost', port=8000)
