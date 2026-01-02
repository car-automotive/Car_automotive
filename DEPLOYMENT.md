# Car Automotive - AWS EKS Deployment Guide

This application is configured for automated deployment to AWS EKS using GitOps with ArgoCD.

## 🚀 Quick Start

### Prerequisites

1. **GitHub Repository**: Push this code to a GitHub repository
2. **AWS Credentials**: Configure GitHub Secrets with AWS access
3. **GitHub Token**: For ArgoCD repository access

### Deployment Steps

#### 1. Push to GitHub

```bash
# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_ORG/car-automotive.git

# Push the car-automotive branch
git push -u origin car-automotive
```

#### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `GH_PAT` (optional): GitHub Personal Access Token for ArgoCD (or use `GITHUB_TOKEN`)

#### 3. Update ArgoCD Application

Edit `gitops/argocd/application.yaml` and update the `repoURL`:

```yaml
source:
  repoURL: https://github.com/YOUR_ORG/car-automotive.git
```

#### 4. Bootstrap Infrastructure

Run the bootstrap workflow to set up ECR repositories and ArgoCD:

1. Go to GitHub Actions → "Bootstrap Infrastructure"
2. Click "Run workflow" → Select branch `car-automotive` → Run

This will:
- Create ECR repositories: `car-automotive-backend`, `car-automotive-frontend`
- Create ArgoCD repository secret
- Deploy ArgoCD application

#### 5. Deploy Application

Push any change to the `car-automotive` branch, or manually trigger the CI/CD workflow:

1. Go to GitHub Actions → "CI/CD Pipeline"
2. Click "Run workflow" → Select branch `car-automotive` → Run

The pipeline will:
- Build and push Docker images to ECR
- Update Kubernetes manifests with new image tags
- ArgoCD will automatically sync and deploy to EKS

#### 6. Access Your Application

Once deployed, your application will be available at:

**https://car-automotive.agents.opsera-labs.com**

## 📋 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Deployment Flow                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  GitHub Push → CI/CD Pipeline → ECR → ArgoCD → EKS          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Build   │→ │   Push   │→ │  Update  │→ │   Sync   │   │
│  │  Images  │  │   ECR    │  │ Kustomize│  │  ArgoCD  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Components

- **Backend**: Node.js Express API (port 5000)
- **Frontend**: React + Vite + Nginx (port 3000)
- **Kubernetes**: Deployments, Services, LoadBalancer
- **ArgoCD**: GitOps continuous deployment
- **ExternalDNS**: Automatic Route53 DNS records
- **NLB**: Network Load Balancer with HTTPS (TLS termination)

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

**Backend** (`backend/server.js`):
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (production in K8s)
- `FRONTEND_URL`: Frontend URL (set automatically in K8s)

**Frontend** (`frontend/src/store/api.js`):
- Uses relative `/api` URLs (proxied by nginx in production)

### Kubernetes Resources

- **Namespace**: `car-automotive`
- **Backend Service**: `car-automotive-backend` (ClusterIP)
- **Frontend Service**: `car-automotive-frontend` (LoadBalancer)
- **Replicas**: 1 (dev environment)

## 🔍 Troubleshooting

### Check Deployment Status

```bash
# Configure kubectl
aws eks update-kubeconfig --name argocd-nonprod-eks --region us-west-1

# Check ArgoCD application
kubectl get application car-automotive -n argocd

# Check pods
kubectl get pods -n car-automotive

# Check services
kubectl get svc -n car-automotive

# View logs
kubectl logs -f deployment/car-automotive-backend -n car-automotive
kubectl logs -f deployment/car-automotive-frontend -n car-automotive
```

### Common Issues

1. **ArgoCD shows "Unknown" status**
   - Check repository secret: `kubectl get secret repo-car-automotive -n argocd`
   - Ensure GitHub token has repository access

2. **Pods not starting**
   - Check image pull: `kubectl describe pod <pod-name> -n car-automotive`
   - Verify ECR image exists: `aws ecr describe-images --repository-name car-automotive-backend --region us-west-2`

3. **DNS not resolving**
   - Check ExternalDNS logs: `kubectl logs -l app=external-dns -n kube-system`
   - Verify Route53 record: `aws route53 list-resource-record-sets --hosted-zone-id Z00814191D1XSXELJVTKT`

4. **HTTPS not working**
   - Check NLB listeners: `aws elbv2 describe-listeners --load-balancer-arn <nlb-arn>`
   - Verify ACM certificate: `aws acm describe-certificate --certificate-arn <arn> --region us-west-1`

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [AWS EKS Documentation](https://docs.aws.amazon.com/eks/)

## 🎯 Next Steps

1. **Set up monitoring**: Add Prometheus/Grafana for metrics
2. **Add staging environment**: Create `k8s/overlays/staging/`
3. **Enable autoscaling**: Configure HPA for backend/frontend
4. **Set up CI/CD for production**: Add approval gates for production deployments

