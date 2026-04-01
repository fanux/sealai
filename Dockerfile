FROM scratch

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY dist/sealai-server /app/sealai-server
COPY public ./public

EXPOSE 3000

USER 65532:65532

ENTRYPOINT ["/app/sealai-server"]
