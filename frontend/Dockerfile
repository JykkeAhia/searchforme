FROM node:16.18.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./
COPY package-lock.json ./

# RUN npm cache clean --force

# If you are building your code for production
# RUN npm ci --only=production
# MOVED TO CMD so it will not be over run by host copy in docker-compose dev
# TODO later do build stage and dev to clarify

COPY . .

# Not good to use root as service runner since there are more security problems
# USER node

EXPOSE 3000

# CMD [ "npm", "start" ]
# OR mayby do npm intall in docker compose yml
# We do npm install here since this is a development use case and this 
# will create node_modules and sync container and host since CMD is run when compose starts images to containers
CMD npm install && npm start
