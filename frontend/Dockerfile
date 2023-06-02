FROM node:16.18.0-alpine3.15

WORKDIR /usr/src/app

COPY package*.json ./

COPY . . 

# If you are building your code for production
# RUN npm ci --only=production
RUN npm install

# COPY . .

# Not good to use root as service runner since there are more security problems
# USER node

EXPOSE 3000
CMD [ "npm", "start" ]
