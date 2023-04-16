FROM node:19-alpine as build
WORKDIR /app
COPY package.json package-lock* ./

# This below is for the node-gyp dependency install
RUN apk add --no-cache libc6-compat gcompat
RUN npm i
COPY . ./
RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;'"]

# docker build -t aether-client-user .
# docker run -d --rm -p 4001:80 --name aether_client_user aether-client-user