FROM node:alpine

WORKDIR /apps/frontend

COPY ./apps/frontend .

RUN npm install

EXPOSE 5173

# if you want to run the app in development mode
CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]
# if you want to run the app in production mode
#CMD [ "npm", "run", "deploy" ]