FROM node:22-bookworm

WORKDIR /app

COPY repo/ ./

RUN if [ ! -d .git ]; then git init && git config user.email docker@example.com && git config user.name docker && git add . && git commit -m "Initial repo state"; fi

WORKDIR /app/boardgame-shop

RUN rm -rf node_modules .next && npm install

EXPOSE 24880

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "24880"]
