FROM node:alpine
ENV HOME=/home/app
COPY package.json yarn.lock $HOME/node_docker/
WORKDIR $HOME/node_docker
RUN yarn && yarn cache clean
COPY . $HOME/node_docker
RUN yarn build
CMD [ "yarn", "start" ]
