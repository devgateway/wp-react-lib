FROM node:12.16.3 AS compiler
WORKDIR /tmp/ui
COPY package*.json ./
RUN npm install
RUN npm rebuild node-sass
COPY public ./public/
COPY src ./src/
RUN npm run build \
  && tar -C build -czf /tmp/ui.tgz .

FROM alpine:latest
COPY --from=compiler /tmp/ui.tgz /usr/src/ui.tgz
COPY update.sh /usr/local/bin
VOLUME /var/www/ui
CMD ["/usr/local/bin/update.sh"]
