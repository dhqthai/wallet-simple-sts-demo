## Overview
This is a Wallet Simple Demo project was built base RoR and ReactJs by Thai Do.

- ruby: "3.0.1"
- rails: "~> 6.1.1"
- antd: "^4.16.8"
- pg: "1.2.3"

## Getting Started

**1. Clone the source code to your local machine:**

**2. Setup PostgresDB:**

**3. Create development.key file in config/credentials with this content 47192c1dddd6154497bc2f472849544e. Open development credential file and update some database configs as below:**
```
db:
 host: <<changeme>>
 name: <<changeme>>
 username: <<changeme>>
 password: <<changeme>>
 port: <<changeme>>
```
**4. Install dependencies:**

```
bundle install
```

```
rails db:migrate
```

```
rails db:seed
```

```
yarn install
```

**5. Start development:**

```
rails c
```
**6. Access the webpage:**
```
http://localhost:3000
```