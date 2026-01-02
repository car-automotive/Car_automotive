# Car Automotive - AWS EKS Deployment Setup Summary

## ✅ What Has Been Created

Your application is now configured for automated deployment to AWS EKS. Here's what was set up:

### 📦 Docker Configuration
- **Backend Dockerfile** (`backend/Dockerfile`): Node.js 20 Alpine with non-root user
- **Frontend Dockerfile** (`frontend/Dockerfile`): React build with Nginx serving
- **Nginx Configuration** (`frontend/nginx.conf`): Proxies `/api` requests to backend service

### ☸️ Kubernetes Manifests
- **Base Resources** (`k8s/base/`):
  - Backend deployment & service (ClusterIP, port 5000)
  - Frontend deployment & service (LoadBalancer with HTTPS, port 3000)
  - Kustomization configuration
- **Dev Overlay** (`k8s/overlays/dev/`):
  - Namespace: `car-automotive`
  - Environment-specific image tags

### 🔄 CI/CD Pipeline
- **GitHub Actions Workflow** (`.github/workflows/ci-cd.yaml`):
  - Builds and pushes Docker images to ECR
  - Updates Kubernetes manifests with new image tags
  - Verifies deployment (waits for ArgoCD sync, pods, LoadBalancer, DNS)
- **Bootstrap Workflow** (`.github/workflows/bootstrap-infra.yaml`):
  - Creates ECR repositories
  - Sets up ArgoCD repository secret
  - Deploys ArgoCD application

### 🎯 GitOps Configuration
- **ArgoCD Application** (`gitops/argocd/application.yaml`):
  - Watches `car-automotive` branch
  - Auto-syncs from Git to Kubernetes
  - Creates namespace automatically

## 🚀 Next Steps

### 1. Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_ORG/car-automotive.git

# Commit the deployment files
git commit -m "feat: add AWS EKS deployment configuration"

# Push to car-automotive branch
git push -u origin car-automotive
```

### 2. Configure GitHub Secrets

Go to your repository → **Settings** → **Secrets and variables** → **Actions**, and add:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `GH_PAT` (optional): GitHub Personal Access Token for ArgoCD (or use `GITHUB_TOKEN`)

### 3. Update ArgoCD Application

Edit `gitops/argocd/application.yaml` and update the repository URL:

```yaml
source:
  repoURL: https://github.com/YOUR_ORG/car-automotive.git
```

### 4. Bootstrap Infrastructure

1. Go to **GitHub Actions** → **Bootstrap Infrastructure**
2. Click **Run workflow** → Select branch `car-automotive` → **Run**

This will:
- ✅ Create ECR repositories: `car-automotive-backend`, `car-automotive-frontend`
- ✅ Create ArgoCD repository secret
- ✅ Deploy ArgoCD application

### 5. Deploy Application

After bootstrap completes, push any change or manually trigger the CI/CD workflow:

1. Go to **GitHub Actions** → **CI/CD Pipeline**
2. Click **Run workflow** → Select branch `car-automotive` → **Run**

The pipeline will:
- ✅ Build Docker images
- ✅ Push to ECR
- ✅ Update Kubernetes manifests
- ✅ ArgoCD automatically syncs and deploys
- ✅ Verify deployment is ready

### 6. Access Your Application

Once deployed, your application will be available at:

**🌐 https://car-automotive.agents.opsera-labs.com**

## 📋 Configuration Details

### Application Name
- **App Name**: `car-automotive`
- **Branch**: `car-automotive`
- **Namespace**: `car-automotive`
- **Endpoint**: `https://car-automotive.agents.opsera-labs.com`

### AWS Resources
- **ECR Region**: `us-west-2`
- **EKS Region**: `us-west-1`
- **EKS Cluster**: `argocd-nonprod-eks`
- **ECR Repositories**: 
  - `792373136340.dkr.ecr.us-west-2.amazonaws.com/car-automotive-backend`
  - `792373136340.dkr.ecr.us-west-2.amazonaws.com/car-automotive-frontend`

### Kubernetes Resources
- **Backend**: 1 replica, ClusterIP service (internal only)
- **Frontend**: 1 replica, LoadBalancer service (external with HTTPS)
- **HTTPS**: Automatic via NLB with ACM certificate

## 🔍 Troubleshooting

See `DEPLOYMENT.md` for detailed troubleshooting guide.

### Quick Checks

```bash
# Configure kubectl
aws eks update-kubeconfig --name argocd-nonprod-eks --region us-west-1

# Check ArgoCD application
kubectl get application car-automotive -n argocd

# Check pods
kubectl get pods -n car-automotive

# View logs
kubectl logs -f deployment/car-automotive-backend -n car-automotive
kubectl logs -f deployment/car-automotive-frontend -n car-automotive
```

## 📚 Files Created

```
car-automotive/
├── backend/
│   ├── Dockerfile
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── nginx.conf
├── k8s/
│   ├── base/
│   │   ├── backend-deployment.yaml
│   │   ├── backend-service.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── frontend-service.yaml
│   │   └── kustomization.yaml
│   └── overlays/
│       └── dev/
│           ├── kustomization.yaml
│           └── namespace.yaml
├── .github/
│   └── workflows/
│       ├── ci-cd.yaml
│       └── bootstrap-infra.yaml
├── gitops/
│   └── argocd/
│       └── application.yaml
├── .gitignore
├── DEPLOYMENT.md
└── SETUP_SUMMARY.md (this file)
```

## ✨ Features

- ✅ **GitOps**: All infrastructure defined in Git
- ✅ **Automated CI/CD**: Push to branch triggers deployment
- ✅ **HTTPS**: Automatic SSL/TLS via NLB
- ✅ **DNS**: Automatic Route53 record creation
- ✅ **Security**: Non-root containers, read-only filesystem
- ✅ **Health Checks**: Liveness and readiness probes
- ✅ **Deployment Verification**: Pipeline waits for endpoint to be ready

---

**Ready to deploy!** Follow the steps above to get your application running on AWS EKS.

