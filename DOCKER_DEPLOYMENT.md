# Bagel Frontend Docker Deployment Guide

This guide provides comprehensive instructions for building, testing, and deploying the Bagel Frontend application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Hub account (for pushing images)
- Git (for version control)

## Quick Start

### 1. Build and Push to Docker Hub

**Using PowerShell (Recommended):**
```powershell
.\build-docker.ps1 -DockerUsername "your-username" -Push
```

**Using Batch Script:**
```cmd
# First, edit build-docker.bat and update DOCKER_USERNAME
.\build-docker.bat
```

**Manual Commands:**
```bash
# Build the image
docker build -t your-username/bagel-ui:latest .

# Push to Docker Hub
docker push your-username/bagel-ui:latest
```

### 2. Run the Container

```bash
# Basic run
docker run -p 3000:3000 your-username/bagel-ui:latest

# With environment variables
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000 \
  your-username/bagel-frontend:latest
```

## Docker Image Features

### Security Enhancements
- ✅ Non-root user execution
- ✅ Security updates applied
- ✅ Minimal attack surface (Alpine Linux)
- ✅ Proper file permissions
- ✅ Security audit during build

### Performance Optimizations
- ✅ Multi-stage build for smaller image size
- ✅ Standalone Next.js output
- ✅ Optimized layer caching
- ✅ Memory limit configuration
- ✅ Production-ready optimizations

### Monitoring & Health Checks
- ✅ Built-in health checks
- ✅ Proper logging configuration
- ✅ Graceful shutdown handling

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node.js environment |
| `PORT` | `3000` | Application port |
| `HOSTNAME` | `0.0.0.0` | Bind address |
| `NEXT_TELEMETRY_DISABLED` | `1` | Disable Next.js telemetry |
| `NODE_OPTIONS` | `--max-old-space-size=512` | Node.js memory limit |

### Custom Environment Variables

Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Advanced Usage

### Docker Compose Integration

```yaml
version: '3.8'
services:
  bagel-frontend:
    image: your-username/bagel-frontend:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://backend:5000
    depends_on:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 30s

  backend:
    image: your-username/bagel-backend:latest
    ports:
      - "5000:5000"
    restart: unless-stopped
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bagel-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bagel-frontend
  template:
    metadata:
      labels:
        app: bagel-frontend
    spec:
      containers:
      - name: bagel-frontend
        image: your-username/bagel-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: NEXT_PUBLIC_API_URL
          value: "http://backend-service:5000"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: bagel-frontend-service
spec:
  selector:
    app: bagel-frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Troubleshooting

### Common Issues

1. **Build Fails with Memory Error**
   ```bash
   # Increase Docker memory limit in Docker Desktop settings
   # Or use: docker build --memory=4g -t your-image .
   ```

2. **Permission Denied Errors**
   ```bash
   # Ensure proper file permissions
   chmod +x build-docker.ps1
   chmod +x build-docker.bat
   ```

3. **Docker Hub Authentication Issues**
   ```bash
   # Re-authenticate with Docker Hub
   docker logout
   docker login
   ```

4. **Health Check Failures**
   ```bash
   # Check if the application is running
   docker exec -it container-name curl http://localhost:3000/
   ```

### Debugging

```bash
# Run container in interactive mode
docker run -it --entrypoint /bin/sh your-username/bagel-frontend:latest

# Check container logs
docker logs container-name

# Inspect container
docker inspect container-name

# Check image layers
docker history your-username/bagel-frontend:latest
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: ./bagel-final/bagel-frontend/env0-lite-frontend
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/bagel-frontend:latest
        cache-from: type=gha
        cache-to: type=gha,mode=max
```

## Security Best Practices

1. **Regular Updates**: Keep base images updated
2. **Secret Management**: Use Docker secrets or environment files
3. **Network Security**: Use proper network segmentation
4. **Image Scanning**: Regularly scan images for vulnerabilities
5. **Access Control**: Implement proper RBAC policies

## Performance Monitoring

```bash
# Monitor container resource usage
docker stats container-name

# Check image size
docker images your-username/bagel-frontend:latest

# Analyze build performance
docker build --progress=plain -t your-image .
```

## Support

For issues or questions regarding Docker deployment:
- Check the troubleshooting section above
- Review Docker and Next.js documentation
- Create an issue in the project repository

---

**Note**: Remember to replace `your-username` with your actual Docker Hub username in all examples.
