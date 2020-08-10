from flask import Flask, jsonify
from gpiozero import CPUTemperature
from flask import Flask
from flask_cors import CORS
import binascii
from math import pow
import base64
import hashlib
from Crypto.Cipher import AES
from Crypto import Random
import random
import string
#from ecies.utils import generate_eth_key, generate_key
#from ecies import encrypt, decrypt

BLOCK_SIZE = 16
pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
unpad = lambda s: s[:-ord(s[len(s) - 1:])]
password_characters = string.ascii_letters + string.digits + string.punctuation
count = 0


def aes_encrypt(raw, password):
    private_key = hashlib.sha256(password.encode("utf-8")).digest()
    raw = pad(raw).encode("utf-8")
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return base64.b64encode(iv + cipher.encrypt(raw))


def aes_decrypt(enc, password):
    private_key = hashlib.sha256(password.encode("utf-8")).digest()
    enc = base64.b64decode(enc)
    iv = enc[:16]
    cipher = AES.new(private_key, AES.MODE_CBC, iv)
    return unpad(cipher.decrypt(enc[16:]))

# def ecc_encrypt(msg):
#     f = open("public-key.txt", 'r')
#     pk_hex = f.readline()
#     f.close()
#     intp = int(pk_hex, 16)
#     enc = encrypt(hex(intp), msg)
    # send this encrypted secret key to the receiver


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    # cpu = CPUTemperature()
    # temp = str(cpu.temperature)
    temp = "123.34"
    print(temp)
    global count
    f = open("key.txt", 'r')
    password = f.readline()
    f.close()

    if (count == pow(2, 24) or count == 0):
        password = ''.join(random.choice(password_characters) for i in range(10))
        count = 0
        f = open("key.txt", 'w')
        f.write(str(password))
        f.close()
        # ecc_encrypt(password)
        # for sharing newly created secret key with the receiving entity
    count = count + 1
    print(str(count))
    #msg = temp.encode('UTF-8')
    msg = temp
    encryptval = aes_encrypt(msg, password)
    print("Encrypted:", encryptval)

    decrypted = aes_decrypt(encryptval, password)
    decryptval = decrypted.decode('UTF-8')
    print('Decrypted:', (decryptval))
    value = [decryptval, str(encryptval)]
    return jsonify(value)


if __name__ == '__main__':
    app.run()