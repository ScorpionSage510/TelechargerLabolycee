import socket
import threading
import base64
import hashlib
import os
from telecharger import *

class WebSocketServer:
    def __init__(self, host='localhost', port=6789):
        self.host = host
        self.port = port
        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.bind((self.host, self.port))
        self.server_socket.listen(5)
        print(f"Serveur WebSocket démarré sur ws://{self.host}:{self.port}")

    def accept_clients(self):
        while True:
            client_socket, addr = self.server_socket.accept()
            print(f"Connexion établie avec {addr}")
            threading.Thread(target=self.handle_client, args=(client_socket,)).start()

    def handle_client(self, client_socket):
        # Effectuer la handshake WebSocket
        self.handshake(client_socket)

        while True:
            try:
                message = self.receive_message(client_socket)
                if message:
                    print(f"Message reçu: {message}")
                    result = telecharger(message)
                    response_message = "Fichier téléchargé avec succès"
                    self.send_message(client_socket, response_message)
                else:
                    break
            except Exception as e:
                print(f"Erreur: {str(e)}")
                break

        client_socket.close()

    def handshake(self, client_socket):
        request = client_socket.recv(1024).decode('utf-8')
        headers = {key: value for (key, value) in [line.split(': ') for line in request.splitlines()[1:] if ': ' in line]}
        webkey = headers['Sec-WebSocket-Key']
        webaccept = base64.b64encode(hashlib.sha1((webkey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').encode('utf-8')).digest()).decode('utf-8')
        response = 'HTTP/1.1 101 Switching Protocols\r\n' + \
                   'Upgrade: websocket\r\n' + \
                   'Connection: Upgrade\r\n' + \
                   'Sec-WebSocket-Accept: ' + webaccept + '\r\n\r\n'
        client_socket.send(response.encode('utf-8'))

    def receive_message(self, client_socket):
        byte_header = client_socket.recv(2)
        if not byte_header:
            return None
        length = byte_header[1] & 127
        if length == 126:
            length = int.from_bytes(client_socket.recv(2), 'big')
        elif length == 127:
            length = int.from_bytes(client_socket.recv(8), 'big')
        masks = client_socket.recv(4)
        message = bytearray()
        for i in range(length):
            message.append(masks[i % 4] ^ client_socket.recv(1)[0])
        return message.decode('utf-8')

    def send_message(self, client_socket, message):
        message = message.encode('utf-8')
        length = len(message)
        if length <= 125:
            header = bytearray([129, length])
        elif length >= 126 and length <= 65535:
            header = bytearray([129, 126]) + length.to_bytes(2, 'big')
        else:
            header = bytearray([129, 127]) + length.to_bytes(8, 'big')
        client_socket.send(header + message)

if __name__ == "__main__":
    ws_server = WebSocketServer()
    ws_server.accept_clients()
