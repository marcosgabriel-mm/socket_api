import socket
import random
import time

mac_address = "00:00:00:00:00:00"
def generate_random_id():
    return "".join(random.choices('0123456789ABCDEF', k=7))

def connect_to_server():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect(('localhost', 1234))
        client_socket.send(mac_address.encode())        
        response = client_socket.recv(1024) 
        print(response.decode())

        return client_socket
    
    except ConnectionRefusedError:
        print("Server is not running")
        return None

def main():
    client_socket = connect_to_server()
    if client_socket is None:
        return

    try:
        while True:
            try:
                # Enviar dados ao servidor
                message = generate_random_id().encode()
                formated_message = f"MAC: {mac_address} - {message.decode()}"
                client_socket.send(formated_message.encode())

                # Receber dados do servidor
                response = client_socket.recv(1024)
                if not response:
                    print("Connection lost")
                    break

                print(f"Received: {response.decode()}")

                # Esperar um pouco antes de enviar a próxima mensagem
                time.sleep(5)
            except socket.error as e:
                print(f"Socket error: {e}")
                break
    finally:
        client_socket.close()
        print("Connection closed")

if __name__ == '__main__':
    main()