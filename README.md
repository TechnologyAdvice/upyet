# UpYet

Paralell, multi-resource CLI and modular resource availability detection script.

## Examples - CLI

### Single Resource
```
upyet resource.com:5432
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

## Examples - Module

### Basic

The `upyet` object accepts two arguments; the `resources <Array>` which is required and a `config <Object>` which is optional

```javascript
const upyet = require('upyet')
upyet(['resource.com:5432']).then((stats) => {
  // Array of resource stats
}).catch((errors) => {
  // Array of stats and errors
})
```

---

## Config

| Option  | Name (module) | Flag (CLI)        | Description                                                           |
|---------|---------------|-------------------|-----------------------------------------------------------------------|
| Timeout | `timeout`     | `-t`, `--timeout` | Designates the time (in milliseconds) at which script assumes failure |
| File    | `file`        | `-f`, `--file`    | Line-delimited file from which to load resources                      |