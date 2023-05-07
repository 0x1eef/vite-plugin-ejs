## About

vite-plugin-ejs is a Vite plugin for building one or more files from an
EJS template. The EJS template could be a HTML document, or any type of
text file. This project was originally forked from
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
although there is little similarity left between the two projects.

## Examples

__HTML / XML__

The following example demonstrates how `index.html`, and `sitemap.xml` might
be generated using vite-plugin-ejs. The `ejs` function accepts a variable number
of objects who define an input, an output, and a set of template variables:

```typescript
/* vite.config.js */
import { defineConfig } from "vite";
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  plugins: [
    ejs({files: [{
      input: "./src/html/index.html.ejs",
      output: "./build/html/index.html",
      variables: {title: "Hello world"}
    }, {
      input: "./src/sitemap.xml.ejs",
      output: "./build/sitemap.xml",
      variables: {fn: () => "Hello world"}
    }]})
  ]
});
```

__Reusable__

The following example demonstrates how - given a single input file - multiple
output files can be generated. This happens to be what I found most diffilcult
to do with
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
and is among the primary reasons I started a fork:

```typescript
/* vite.config.js */
import { defineConfig } from "vite";
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  plugins: [
    ejs({files: ["en", "ar"].map((locale) => ({
      input: "./src/html/index.html.ejs",
      output: `./build/${locale}/index.html`,
      variables: {locale}
    }))
  })]
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
$ npm i git+https://github.com/0x1eef/vite-plugin-ejs.git#v0.3.0
```

## Thanks

Thanks to the author, and contributors of
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html).

## <a id="license"> License </a>

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).
