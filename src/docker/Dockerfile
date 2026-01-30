FROM python:3.12-slim AS builder

WORKDIR /app
RUN python -m venv .venv
ENV PATH="/app/.venv/bin:$PATH"

COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

RUN useradd -m appuser && chown appuser:appuser /app
USER appuser

COPY --from=builder --chown=appuser:appuser /app/.venv /app/.venv
COPY --chown=appuser:appuser . .

ENV PATH="/app/.venv/bin:$PATH"

EXPOSE 8000
ENV PYTHONPATH=/app
CMD [ "uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000" ]