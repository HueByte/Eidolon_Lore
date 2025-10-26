# Deployment Guide - Eidolon Line Lore Wiki

## 📋 Overview

Your wiki is configured to deploy automatically to GitHub Pages from the `web` branch.

## 🌿 Branch Structure

- **`master`** - Your main development branch with lore content
- **`web`** - Deployment branch for the React app (orphan branch)

## 🚀 Deployment Process

### First-Time Setup

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to: `Settings` → `Pages`
   - Under "Source", select: `GitHub Actions`
   - Save the settings

2. **Commit your changes to the web branch:**
   ```bash
   git add .
   git commit -m "Initial React app setup"
   git push origin web
   ```

3. **Automatic deployment will start:**
   - Go to the `Actions` tab in your repository
   - You'll see the "Deploy to GitHub Pages" workflow running
   - Once complete, your site will be live!

### Site URL

Your wiki will be available at:
```
https://HueByte.github.io/Eidolon_Lore/
```

## 🔄 Updating Content

### Updating Lore Content

When you want to add or update lore:

1. **Edit markdown files in `src/lore/`:**
   ```bash
   # Example: Edit a concept file
   vim src/lore/concepts/society-of-the-line.md
   ```

2. **Copy to public directory:**
   ```bash
   cp src/lore/concepts/society-of-the-line.md public/lore/concepts/
   ```

3. **If adding new pages, update navigation:**
   Edit `src/data/loreStructure.js` to add the new entry

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: Society of the Line lore"
   git push origin web
   ```

5. **Automatic deployment:**
   - GitHub Actions will automatically build and deploy
   - Changes will be live in ~2-3 minutes

### Updating Styles or Components

1. **Make your changes to React components or CSS**

2. **Test locally:**
   ```bash
   npm run dev
   ```

3. **Build and verify:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: Component styling"
   git push origin web
   ```

## 📊 Monitoring Deployments

### Check Deployment Status

1. Go to the `Actions` tab in your repository
2. Click on the most recent workflow run
3. You can see:
   - Build logs
   - Deployment status
   - Any errors or warnings

### Common Deployment Issues

#### Issue: Workflow fails with "npm ci" error
**Solution:** Make sure `package-lock.json` is committed
```bash
git add package-lock.json
git commit -m "Add package-lock.json"
git push origin web
```

#### Issue: 404 errors on deployed site
**Solutions:**
- Ensure GitHub Pages is set to "GitHub Actions" (not branch)
- Verify the workflow completed successfully
- Check that `vite.config.js` has correct `base: '/Eidolon_Lore/'`
- Verify `App.jsx` has matching `basename="/Eidolon_Lore"`

#### Issue: Markdown files not loading
**Solutions:**
- Ensure files are in `public/lore/` directory
- Check file paths in `src/data/loreStructure.js` match filenames (without .md)
- Verify markdown files were included in the build

## 🔧 Manual Deployment (Alternative)

If you prefer to deploy manually:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The `dist/` folder contains your built site**

3. **Deploy using one of these methods:**
   - Upload to any static hosting service
   - Use Netlify, Vercel, or similar
   - Serve from your own server

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. **Add a `CNAME` file to `public/` directory:**
   ```bash
   echo "yourdomain.com" > public/CNAME
   ```

2. **Update vite config to use root base:**
   ```javascript
   // vite.config.js
   export default defineConfig({
     base: '/',  // Change from '/Eidolon_Lore/'
     // ... rest of config
   })
   ```

3. **Update App.jsx basename:**
   ```javascript
   <Router basename="/">  // Change from "/Eidolon_Lore"
   ```

4. **Configure DNS:**
   - Add CNAME record pointing to: `HueByte.github.io`
   - Or A records to GitHub's IPs

5. **Configure in GitHub:**
   - Settings → Pages → Custom domain
   - Enter your domain
   - Enable "Enforce HTTPS"

## 📈 Performance Optimization

### Already Configured
- ✅ Vite for fast builds
- ✅ Code splitting with React Router
- ✅ Lazy loading for images
- ✅ Optimized production builds

### Optional Improvements
- Add a CDN for markdown files
- Enable service worker for offline support
- Implement search functionality
- Add analytics (Google Analytics, Plausible, etc.)

## 🔒 Security

GitHub Actions deployment is secure by default:
- Uses GitHub's own tokens
- No manual credential management
- Workflow only runs on authorized branches
- All traffic served over HTTPS

## 📝 Workflow File Location

The deployment configuration is at:
```
.github/workflows/deploy.yml
```

You can customize:
- Node version
- Build commands
- Deployment triggers
- Environment variables

## 🆘 Getting Help

If you encounter issues:

1. **Check GitHub Actions logs** for specific errors
2. **Test locally** with `npm run build && npm run preview`
3. **Verify configuration:**
   - `vite.config.js` base path
   - `App.jsx` router basename
   - `package.json` scripts
4. **Common fixes:**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`
   - Ensure all files are committed

## ✅ Deployment Checklist

Before pushing to production:

- [ ] Test locally with `npm run dev`
- [ ] Build succeeds with `npm run build`
- [ ] Preview looks correct with `npm run preview`
- [ ] All markdown files copied to `public/lore/`
- [ ] Navigation updated in `loreStructure.js`
- [ ] Commit messages are descriptive
- [ ] GitHub Pages is enabled and set to "GitHub Actions"

---

Happy deploying! 🚀
