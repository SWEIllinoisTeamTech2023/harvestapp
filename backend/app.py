from flask import Flask, request
import json
from secret import CLUSTER_ARN, SECRET_ARN, EIA_FUEL_PRICE_API_KEY
from test_endpoint import temporary_endpoint, edit_endpoint
from model import train
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

    # send inputs and API results as parameter
    input_id = response['generatedFields'][0]['longValue']
    # print("input id: ", input_id)

    # modelResults = temporary_endpoint() # REPLACE WITH MODEL OUTPUTS
    modelResults = train({})
    print(modelResults)
    # res = {}
    costresponse = storeCostDistributions(modelResults, input_id)
    print(costresponse)
    cost_id = costresponse['generatedFields'][0]['longValue']
    # cost_id = 1

    # Call API and store API results into APIPrice Table
    # fuel_price = getFuelPrice()
    # crop_price = getCropPrice(data['crop_type'])
    res = {
        'data': {"input_id": input_id, "cost_id":cost_id}
    }
    print("store input res:: ", res)
    # TODO: Run model with inputs & return simulation variables
    # print("response: ", response['generatedFields'][0]['longValue'])
    # Return a response
    return res, 200


def storeCostDistributions(data, input_id):
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.CostDistribution(inputId, grain_loss, labor_cost, fuel_cost, depreciation_cost, total_costofharvest) VALUES ({}, {},{},{},{},{})'.format(input_id, data["grain_loss"], data["labor_cost"], data["fuel_cost"], data["depreciation_cost"], data["total_costofharvest"]))
    print("stored cost distributions")
    print(response)
    return response


@app.route('/getCostDistribution', methods=['GET'])
def getCostDistributions():
    cost_id = request.args['id']
    # print(input_id)
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='SELECT * FROM harvest.CostDistribution WHERE id = {}'.format(cost_id))
    print("cost distribution received: ", response)
    return json.dumps(response['records'])


@app.route('/saveSimulation', methods=['POST'])
def saveSimulation():
    data = request.get_json()
    print("this is the data: ", data)
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='INSERT INTO harvest.SavedSimulations (costId, inputId, date, crop_type, yield, header_width, annual_hours, total_costofharvest, machine_type, user, name, rotor_speed, fan_speed, speed, sieve_clearance, concave_clearance, chaffer_clearance) VALUES ({},{},"{}","{}",{},{},{},{},"{}","{}","{}",{},{},{},{},{},{})'.format(data["cost_id"],data["input_id"], data["date"], data["crop_type"], data["yield"], data["header_width"], data["annual_hours"], data["total_costofharvest"], data["machine_type"], data["user"], data["name"], data["rotorSpeed"], data["fanSpeed"], data["speed"], data["sieveClear"], data["concaveClear"], data["chafferClear"]))

    return jsonify(response), 200


@app.route('/sendSimulationInputs', methods=['POST'])
def sendSimulationInputs():
    data = request.get_json()
    print("Simulation inputs", data)
    # send simulation inputs to model


@app.route('/getSavedSimulations', methods=['GET'])
def viewSavedSimulations():
    user = request.args['user']
    print("in viewSavedSimul for ", user)
    response = rdsData.execute_statement(
        resourceArn=CLUSTER_ARN,
        secretArn=SECRET_ARN,
        database='harvest',
        sql='SELECT * FROM harvest.SavedSimulations WHERE user = "{}"'.format(
            user)
    )
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

@app.route('/editSimulation', methods=['POST'])
def editSimulation():
    # Call edit Simulation function in model with parameters
    inputId = request.get_json()['inputId']
    # modelResults = edit_endpoint()
    modelResults = train(request.get_json())
    print("in edit simulation endpoint: ", modelResults)
    costResponse = storeCostDistributions(modelResults, inputId)
    print(costResponse)
    cost_id = costResponse['generatedFields'][0]['longValue']
    print(cost_id)
    res = {
        'data': {"cost_id":cost_id}
    }
    return res
    

if __name__ == '__main__':
    app.run(host='localhost', port=8000)
