[![CircleCI](https://img.shields.io/circleci/project/TechnologyAdvice/upyet/master.svg)]()

# UpYet

Parallel, multi-resource CLI and modular resource availability detection script.

## Installation

```
npm install upyet
```

*Use the `-g` flag for global CLI install*

## Examples - Module

```javascript
const upyet = require('upyet')

// Run config example: 
const testConfig = {
  resources: [ 'google.com:80', 'foo.bar:443' ],
  config: {
    retries: 3,
    timeout: 10
  }
}

// Execution:
upyet(testConfig).then((res) => {
  console.log('Connected, results:', res)
}).catch((res) => {
  console.log('Failed, results:', res)
})
```

---

## Examples - CLI

### Single Resource
```
upyet resource.com:5432
```

### Flag Config
```
upyet resource.com:5432 -r 10 -t 100
```

### Multiple Resources
```
upyet resource-a.com:5432 resource-b:2345
```

### Load Resource File
```
upyet -f resources.txt
```

Resource File Formatting:
```
resource-a.com:5432
resource-b.com:2345
```

---

## Config

| Option  | Name (module) | Flag (CLI)        | Description                                                           |
|---------|---------------|-------------------|-----------------------------------------------------------------------|
| Retries | `retries`     | `-r`, `--retries` | Designates the number of attempts to make to connect to resource      |
| Timeout | `timeout`     | `-t`, `--timeout` | Designates the time (in milliseconds) at which script assumes failure |
| File    | `file`        | `-f`, `--file`    | Line-delimited file from which to load resources                      |