FROM denoland/deno:2.5.6

# Port that app listens to
EXPOSE 8000

USER deno

WORKDIR /usr/src/deskjockey.tech

COPY deno.* ./

RUN deno task build && deno task start


# Adapted from https://hub.docker.com/r/denoland/deno
