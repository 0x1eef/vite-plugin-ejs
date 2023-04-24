## About

vite-plugin-ejs is a Vite plugin for building one or more files from an
EJS template. The EJS template might represent a HTML document, but has the
potential to represent any type of file. This project was originally forked
from
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
although there is little similarity left between the two projects.

## Examples

### HTML / XML

The following example demonstrates how `index.html`, and `sitemap.xml` might
be generated from `vite.config.js`:

```
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  plugins: [
    ejs({
      input: "./src/html/index.html.ejs",
      output: "./build/html/index.html",
      variables: {title: "Hello world"}
    }, {
      input: "./src/sitemap.xml.ejs",
      output: "./build/sitemap.xml",
      variables: {fn: () => "Hello world"}
    })
  ]
});
```

### One input, multiple outputs

The following example demonstrates how - given a single input file - multiple
output files can be generated:

```typescript
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  plugins: [
    ejs(...["en", "ar"].map((locale) => {
      return {
        input: "./src/html/index.html.ejs",
        output: `./build/${locale}/index.html`,
        variables: {locale}
      }
    })
  ])
});
```

## Sources

* [Source code (GitHub)](https://github.com/0x1eef/vite-plugin-ejs#readme)
* [Source code (GitLab)](https://gitlab.com/0x1eef/vite-plugin-ejs#about)

## <a id="license"> License </a>

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).
