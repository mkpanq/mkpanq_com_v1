# syntax=docker/dockerfile:1
FROM ubuntu:latest AS os_install
SHELL ["/bin/bash", "-l", "-c"]
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
  curl \
  git \
  jq \
  coreutils \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
RUN git clone https://github.com/asdf-vm/asdf.git ./.asdf --branch v0.15.0

# Install asdf plugins and versions
FROM os_install AS asdf_config
WORKDIR /root
COPY --from=os_install .asdf .asdf
COPY .tool-versions .tool-versions
RUN source .asdf/asdf.sh && \
    for tool in $(awk '{print $1}' .tool-versions); do \
        asdf plugin-add $tool; \
    done && \
    asdf install && \
    asdf reshim

# Install dependencies
FROM asdf_config AS application_deps_install
WORKDIR /root/app
COPY pnpm-lock.yaml package.json ./
RUN source ~/.asdf/asdf.sh && pnpm i --frozen-lockfile --prod

# Building image
FROM asdf_config AS application_building
WORKDIR /root/app
COPY --from=application_deps_install /root/app/node_modules ./node_modules
COPY . .
RUN source ~/.asdf/asdf.sh && pnpm run build

# Production image, copy all the files and run next
FROM asdf_config AS application_run
ENV NODE_ENV=production
WORKDIR /root/app

COPY --from=application_building /root/app/dist ./dist
COPY --from=application_building /root/app/entrypoint.sh ./entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
RUN chmod 755 ./entrypoint.sh
ENTRYPOINT [ "./entrypoint.sh" ]
