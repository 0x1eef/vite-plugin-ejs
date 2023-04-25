## About

vite-plugin-ejs is a Vite plugin for building one or more files from an
EJS template. The EJS template could represent a HTML document, but has the
potential to represent any type of file. This project was originally forked
from
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
although there is little similarity left between the two projects.

## Examples

### HTML / XML

The following example demonstrates how `index.html`, and `sitemap.xml` could
be generated using vite-plugin-ejs. The `ejs` function accepts a variable number 
of objects who define an input, an output, and a set of template variables:

```typescript
/* vite.config.js */
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

### Reusable input

The following example demonstrates how - given a single input file - multiple
output files can be generated. This happens to be what I found most diffilcult
to do with
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
and is among the primary reasons I started a fork:

```typescript
/* vite.config.js */
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

## Install

vite-plugin-ejs is distributed through git.
<br>
[GitHub](https://github.com/0x1eef/vite-plugin-ejs),
and
[GitLab](https://gitlab.com/0x1eef/vite-plugin-ejs)
are available as sources.

```
$ npm i git+https://github.com/0x1eef/vite-plugin-ejs.git#v0.2.0
```

## <a id="license"> License </a>

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).
