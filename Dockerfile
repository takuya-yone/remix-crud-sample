# Install dependencies only when needed
FROM node:20.10.0-alpine AS builder
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
RUN corepack enable && yarn -v
ENV NODE_ENV=production 

RUN yarn install

RUN yarn build

# RUN yarn workspace pankration2024-frontend start

# EXPOSE 3000

CMD ["yarn","start"]


# FROM node:20.10.0-alpine AS runner

# # COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter
# WORKDIR /app
# RUN corepack enable && yarn -v
# ENV NODE_ENV=production 
# ENV AWS_LWA_PORT=3000

# COPY --from=builder /app/frontend/.next/standalone/. .
# COPY --from=builder /app/frontend/.next/static ./frontend/.next/static
# COPY --from=builder /app/frontend/public ./frontend/public
# COPY --from=builder /app/frontend/.env.build.production .env


# EXPOSE 3000

# CMD ["node","frontend/server.js"]