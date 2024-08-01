import socket
import threading

devices_conected = {}
connected_addresses = set()

def is_first_connection(addr):
    return addr not in connected_addresses

def handle_client(client_socket, addr):
    print("ESP32 IP ADDRESS:", addr)
    try:
        while True:
            try:
                request = client_socket.recv(1024)

                if not request:
                    break

                if is_first_connection(addr):
                    mac_address = request.decode()
                    devices_conected[addr] = mac_address
                    connected_addresses.add(addr)
                    print(f"New device connected: {addr} | MAC: {mac_address}")
                    client_socket.send("Conected to server".encode())

                else:
                    print(f"Received: {request.decode()}")
                    client_socket.send("200".encode())
                
            except socket.error as error:
                print(f"Error: {error}")
                break
    finally:
        client_socket.close()
        if addr in connected_addresses:
            connected_addresses.remove(addr)
            del devices_conected[addr]
        print(f"Device {addr} removed. Total devices: {len(devices_conected)}")

if __name__ == '__main__':
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind(('localhost', 1234))
    server_socket.listen(5)
    print("Server listening on port 1234")

    while True:
        client_socket, addr = server_socket.accept()
        print(f"Accepted connection from {addr}")
        client_handler = threading.Thread(target=handle_client, args=(client_socket, addr))
        client_handler.start()