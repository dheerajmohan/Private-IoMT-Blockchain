from flask import Flask, jsonify
# from piozero import CPUTemperature
from flask import Flask
from flask_cors import CORS
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

f = open('pubKey.pem','r')
pubKey = RSA.importKey(f.read())
f.close()

f = open('privKey.pem','r')
privKey = RSA.importKey(f.read())
f.close()

app = Flask(__name__)
CORS(app)

i = 0

tempval = ['55', '60', '65']

@app.route('/')
def hello():
    # cpu = CPUTemperature()
    # cpu = 55.66
    # temp = str(cpu.temperature)
    # temp = input("Enter temp: ");
    global i
    temp = tempval[i]
    if i==2:
        i = 0
    else:
        i = i + 1

    msg = temp.encode('UTF-8')
    encryptor = PKCS1_OAEP.new(pubKey)
    encrypted = encryptor.encrypt(msg)
    encrypt = str(binascii.hexlify(encrypted))
#encrypted = pubKey.encrypt(b'hey')
    print("Encrypted:", binascii.hexlify(encrypted))

    decryptor = PKCS1_OAEP.new(privKey)
    decrypted = decryptor.decrypt(encrypted)
    decrypt = decrypted.decode('UTF-8')
    print('Decrypted:', (decrypt))
    
    value = [decrypt, encrypt]
    return jsonify(value)

if __name__ == '__main__':  
    app.run()
