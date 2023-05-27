import { Plugin, ResolvedConfig } from 'vite';
import { render } from 'ejs';
import path from 'path';
import { writeFile, readFile, mkdir } from 'fs';

type Vite = {
  root: string
  build: {outDir: string}
};

type Target = {
  src: string
  dest: string
  variables: Record<string, string | Function | object>
};

type Options = {
  enforce?: 'pre' | 'post'
  apply?: 'build' | 'serve'
  targets: Target[]
};

type ReadFile = [string, object];
const read = (...args: ReadFile): Promise<string> => {
  const [path, options] = args;
  return new Promise((resolve, reject) => {
    readFile(path, options, (err, data) => {
      err ? reject(err) : resolve(data.toString());
    });
  });
};

export default function(options: Options): Plugin {
  const { targets } = options;
  const vite: Vite = { root: '', build: { outDir: '' } };
  const fileOpts = { encoding: 'utf-8' };
  const watched: Set<string> = new Set(...(function() {
    const srcs: string[] = [];
    targets.forEach((target) => {
      srcs.push(target.src);
    });
    return srcs;
  })());

  return {
    name: 'ejs',
    enforce: options.enforce || 'pre',
    apply: options.apply,
    buildStart() {
      watched.forEach((src) => {
        this.addWatchFile(path.join(vite.root, src));
      });
    },
    async generateBundle(_options, _bundle) {
      try {
        targets.forEach(async (target) => {
            const src = path.join(vite.root, target.src);
            const dest = path.join(vite.build.outDir, target.dest)
            const { variables } = target;
            const content = render(await read(src, fileOpts), variables);
            mkdir(path.dirname(dest), {recursive: true}, () => {
              /* Ideally we would use `emitFile` but it supports the */
              /* emission of a file based on basename alone. For our */
              /* case the directory should be used as well. This should */
              /* be improved. */
              writeFile(dest, content, (err) => {
                if (err) {
                  this.error(err);
                } else {
                  const relPath = dest.replace(process.cwd()+'/', '')
                  console.info(`${relPath} (vite-plugin-ejs)`)
                }
              })
            });
        });
      } catch (error: any) {
        this.error(error);
      }
    },
    configResolved(resolvedConfig: ResolvedConfig) {
      Object.assign(vite, resolvedConfig);
    },
  };
}
