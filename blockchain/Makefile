CC=gcc
LDFLAGS=-L/opt/homebrew/opt/openssl@3/lib
CFLAGS=-I/opt/homebrew/opt/openssl@3/include
all:
	$(CC) $(CFLAGS) blockchain.c -o blockchain $(LDFLAGS) -lcrypto -lssl