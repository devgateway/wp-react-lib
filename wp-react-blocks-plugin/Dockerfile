FROM node:12.16.3 AS compiler
WORKDIR /tmp/blocks
COPY blocks ./
RUN npm install
RUN npm run build

FROM alpine:latest
COPY --from=compiler /tmp/blocks/build/* /usr/src/
RUN ls -la /usr/src/
COPY update.sh /usr/local/bin
RUN chmod +x /usr/local/bin/update.sh
VOLUME /var/plugins
CMD ["/usr/local/bin/update.sh"]
