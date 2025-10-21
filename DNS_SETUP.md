# DNS Setup Instructions for captainhooksjinglefactory.com

## Current Status
Your GitHub Pages site is working at:
https://sidewayz8solutions.github.io/Captain-Hook-s-Jingle-Factory/

But your custom domain (captainhooksjinglefactory.com) is not working due to DNS configuration issues.

## Required DNS Configuration

To fix the DNS issue, you need to configure your domain registrar's DNS settings. Here's how:

### Step 1: Access Your Domain Registrar
1. Log in to your domain registrar's control panel (where you purchased captainhooksjinglefactory.com)
2. Find the DNS management section

### Step 2: Add DNS Records
Add the following DNS records:

#### For A Records (IPv4):
Add these A records pointing to GitHub Pages IP addresses:
```
A @ 185.199.108.153
A @ 185.199.109.153
A @ 185.199.110.153
A @ 185.199.111.153
```

#### For AAAA Records (IPv6):
Add these AAAA records pointing to GitHub Pages IPv6 addresses:
```
AAAA @ 2606:50c0:8000::153
AAAA @ 2606:50c0:8001::153
AAAA @ 2606:50c0:8002::153
AAAA @ 2606:50c0:8003::153
```

#### For WWW Subdomain (Optional):
If you want www.captainhooksjinglefactory.com to work:
```
CNAME www sidewayz8solutions.github.io
```

### Step 3: Remove Conflicting Records
Remove any existing A or CNAME records for the root domain (@) and www subdomain that might conflict with these new records.

### Step 4: Enable GitHub Pages Custom Domain
1. Go to your GitHub repository: https://github.com/sidewayz8solutions/Captain-Hook-s-Jingle-Factory
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. In the "Custom domain" field, enter: captainhooksjinglefactory.com
5. Click "Save"
6. Check "Enforce HTTPS" once DNS resolves

## Verification Commands

You can verify your DNS configuration using these commands:

```bash
# Check A records
nslookup captainhooksjinglefactory.com

# Check CNAME records (if you set up www)
nslookup www.captainhooksjinglefactory.com
```

## DNS Propagation Time
DNS changes can take anywhere from a few minutes to 48 hours to propagate globally. Typically it takes 1-4 hours.

## Troubleshooting

If after 4 hours your domain still doesn't work:

1. Double-check all DNS records are entered correctly
2. Verify there are no typos in your CNAME file in the repository
3. Ensure your GitHub Pages is properly configured
4. Contact your domain registrar for specific DNS setup instructions if needed

## Alternative Solution: Temporary Redirect

While waiting for DNS to propagate, you can tell people to access your site directly at:
https://sidewayz8solutions.github.io/Captain-Hook-s-Jingle-Factory/