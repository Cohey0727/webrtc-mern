## How to deploy

```sh
pnpm run deploy
```

## How to set secrets

- Secret Environment

```sh
# set secret
fly secrets set DATABASE_URL="mongodb+srv://mongodb.com"

# confirm envs
fly secrets list
```

- Not Secret Environment

```fly.toml
[env]
  PORT = 8000
```
