## About

vite-plugin-ejs is a Vite plugin for producing one or more files from an
EJS template. The EJS template could be a HTML document, or any type of
text file. This project was originally forked from
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 
but over time became substantially different.

## Examples

__HTML / XML__

The following example demonstrates how `index.html`, and `sitemap.xml` might
be generated with vite-plugin-ejs. The `ejs` function accepts a variable number
of objects who define a target: a source, a destination, and a set of template
variables:

```typescript
/* vite.config.js */
import { defineConfig } from "vite";
import path from "path";
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  root: path.join(process.cwd(), "src"),
  build: {
    outDir: path.join(process.cwd(), "build")
  },
  plugins: [
    ejs({targets: [{
      src: "html/index.html.ejs",
      dest: "html/index.html",
      variables: {title: "Hello world"}
    }, {
      src: "sitemap.xml.ejs",
      dest: "sitemap.xml",
      variables: {fn: () => "Hello world"}
    }]})
  ]
});
```

__Reusable__

The following example demonstrates how - given a single source file - multiple
destination files can be generated. This happens to be what I found most diffilcult
to do with
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
and is among the primary reasons I started a fork:

```typescript
/* vite.config.js */
import { defineConfig } from "vite";
import path from "path";
import ejs from "vite-plugin-ejs";

export default defineConfig({
  /* ... */
  root: path.join(process.cwd(), "src"),
  build: {
    outDir: path.join(process.cwd(), "build")
  },
  plugins: [
    ejs({targets: ["en", "ar"].map((locale) => ({
      src: "html/index.html.ejs",
      dest: `${locale}/index.html`,
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
$ npm i git+https://github.com/0x1eef/vite-plugin-ejs.git#v0.4.0
```

## Thanks

Thanks to the author, and contributors of
[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html).

## <a id="license"> License </a>

[BSD Zero Clause](https://choosealicense.com/licenses/0bsd/).
<br>
See [LICENSE](./LICENSE).
