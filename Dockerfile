## Build Stage
FROM node:lts-alpine as build-stage
LABEL maintainer=bing.zhub@gmail.com
## Create a working directory
WORKDIR /app
## Copy source code to container, work with .dockerignore file
COPY . .
## Using taobao mirror
RUN yarn install --registry=https://registry.npm.taobao.org --production

## Develop Stage(using dev server)
EXPOSE 8000
CMD ["npm", "run", "start"]

## Build
RUN yarn run build

# ## Production Stage(Using http-server)
# EXPOSE 8080
# CMD [ "http-server", "dist" ]

# ## Production Stage(Using nginx)
# FROM nginx:stable-alpine as production-stage
# ## copy conf file to nginx
# ## /api/ direct to 127.0.0.1:8080
# COPY nginx.conf /etc/nginx/nginx.conf
# ## copy dist file to nginx
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# ## Expose port 80
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]