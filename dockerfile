# Stage 1: Build
FROM node:14 AS build
WORKDIR /app
COPY package.json .
RUN npm install

# Stage 2: Run
FROM node:14
WORKDIR /app
COPY --from=build /app /app
COPY . .
EXPOSE 80
CMD ["npm", "start"]


