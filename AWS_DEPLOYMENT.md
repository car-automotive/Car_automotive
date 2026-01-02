# 🚗 Car Automotive - AWS Deployment Guide

## 📋 Prerequisites Checklist

- [x] GitHub repository with AWS secrets configured
- [ ] AWS CLI installed and configured
- [ ] Docker installed locally (for testing)
- [ ] AWS ECR repositories created
- [ ] AWS ECS cluster created

---

## 🔧 Step 1: Install AWS CLI

```bash
# macOS
brew install awscli

# Or download from: https://aws.amazon.com/cli/
```

Configure AWS CLI:
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Region: us-east-1 (or your preferred region)
# Output format: json
```

---

## 🗂️ Step 2: Create ECR Repositories

Run these commands to create the container registries:

```bash
# Create backend repository
aws ecr create-repository \
    --repository-name car-automotive-backend \
    --region us-east-1

# Create frontend repository
aws ecr create-repository \
    --repository-name car-automotive-frontend \
    --region us-east-1
```

---

## 🏗️ Step 3: Create ECS Cluster

```bash
# Create ECS cluster
aws ecs create-cluster \
    --cluster-name car-automotive-cluster \
    --region us-east-1
```

---

## 🚀 Step 4: Push Code to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add AWS deployment configuration"

# Push to main branch
git push origin main
```

This will automatically trigger the GitHub Actions pipeline!

---

## 📊 Step 5: Monitor Pipeline

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Watch the pipeline progress through:
   - 🔍 Code Quality & Security
   - 🏗️ Build & Test
   - 🐳 Build Docker Images
   - 🚀 Deploy to AWS
   - 📊 DORA Metrics

---

## 🧪 Local Testing with Docker

Before deploying, test locally:

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the app:
# Frontend: http://localhost:80
# Backend API: http://localhost:5000/api/health
```

---

## 🌐 Environment Variables

Set these in AWS ECS Task Definition or as GitHub secrets:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## 🔗 Useful AWS Commands

```bash
# Check ECS cluster status
aws ecs describe-clusters --clusters car-automotive-cluster

# List ECR images
aws ecr list-images --repository-name car-automotive-backend

# View ECS services
aws ecs list-services --cluster car-automotive-cluster

# Get service logs
aws logs get-log-events \
    --log-group-name /ecs/car-automotive \
    --log-stream-name <stream-name>
```

---

## 🎯 Expected Pipeline Output

```
═══════════════════════════════════════════════════════════════
📊 DORA METRICS SUMMARY
═══════════════════════════════════════════════════════════════
🚀 Deployment Frequency: On every push to main
⏱️ Lead Time for Changes: <calculated>
📈 Pipeline Status: success
🔄 Commit SHA: <your-commit-sha>
👤 Triggered by: <your-username>
═══════════════════════════════════════════════════════════════
```

---

## ❓ Troubleshooting

### Pipeline fails at ECR login
- Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are correct
- Ensure IAM user has `AmazonEC2ContainerRegistryFullAccess` policy

### Docker build fails
- Check Dockerfile syntax
- Verify all required files exist

### ECS deployment fails
- Ensure ECS cluster and services are created
- Check task definition is configured correctly

---

## 📞 Support

For issues with the deployment pipeline, check:
1. GitHub Actions logs
2. AWS CloudWatch logs
3. ECS task status in AWS Console

