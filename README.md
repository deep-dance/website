# deep.dance | website

This is the Hugo-powered website available at https://deep.dance.

## Develop and deploy

### 1. Clone repositories

Let's assume you have local directory for all the deep.dance reposity called `deep-dance`:

```
cd deep-dance
git clone --recursive git@github.com:deep-dance/website.git
```

Github-Pages uses a custom domain configuration for https://deep.dance, which overrides the default URL https://deep-dance.github.io. Clone the repository that only contains the generated website code:

```
cd deep-dance
git clone git@github.com:deep-dance/deep-dance.github.io.git
```

#### 2. Make changes

...

#### 3. Deploy

```
cd deep-dance/website/
hugo

cd ..
cp -R website/public/* deep-dance.github.io/

cd deep-dance.github.io
git add .
git commit -m "<your commit message>"
git push
```
