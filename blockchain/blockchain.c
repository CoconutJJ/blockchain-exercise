#include "blockchain.h"
#include <openssl/evp.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

void handle_error (char *message)
{
        fprintf (stderr, "%s", message);
        exit (EXIT_FAILURE);
}

uint8_t *digest_message (uint8_t *message, size_t len, unsigned int *digest_len)
{
        EVP_MD_CTX *ctx = EVP_MD_CTX_new ();

        if (!ctx)
                handle_error ("could not create hash context");

        if (EVP_DigestInit (ctx, EVP_sha256 ()) != 1)
                handle_error ("could not initialize digest");

        uint8_t *digest = malloc (EVP_MD_size (EVP_sha256 ()));

        if (!digest)
                handle_error ("could not create digest");

        if (EVP_DigestUpdate (ctx, message, len) != 1)
                handle_error ("could not update digest");

        if (EVP_DigestFinal (ctx, digest, digest_len) != 1)
                handle_error ("could not retrive digest");

        EVP_MD_CTX_free (ctx);

        return digest;
}

void hexify (char *message, size_t len)
{
        char *hex = "0123456789abcdef";
        for (size_t i = 0; i < len; i++) {
                int upper = (message[i] & 0xf0) >> 4,
                    lower = (message[i] & 0x0f);

                printf ("%c%c", hex[upper], hex[lower]);
        }
        printf ("\n");
}

int main (int argc, char **argv)
{
        unsigned int sz;
        uint8_t *digest = digest_message ((uint8_t *)"Hello", 5, &sz);
        printf ("size: %d\n", sz);
        hexify (digest, sz);
}