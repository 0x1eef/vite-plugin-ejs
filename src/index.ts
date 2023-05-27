import { Plugin, ResolvedConfig } from 'vite';
import { render } from 'ejs';
import path from 'path';
import { writeFile, readFile, mkdir } from 'fs';

type Vite = {
  root: string
  build: {outDir: string}
};

type File = {
  input: string
  output: string
  variables: Record<string, string | Function | object>
};

type Options = {
  enforce?: 'pre' | 'post'
  apply?: 'build' | 'serve'
  files: File[]
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
  const { files } = options;
  const vite: Vite = { root: '', build: { outDir: '' } };
  const fileOpts = { encoding: 'utf-8' };
  const watched: Set<string> = new Set(...(function() {
    const inputs: string[] = [];
    files.forEach((file) => {
      inputs.push(file.input);
    });
    return inputs;
  })());

  return {
    name: 'ejs',
    enforce: options.enforce || 'pre',
    apply: options.apply,
    buildStart() {
      watched.forEach((input) => {
        this.addWatchFile(path.join(vite.root, input));
      });
    },
    async generateBundle(_options, _bundle) {
      try {
        files.forEach(async (file) => {
            const input = path.join(vite.root, file.input);
            const output = path.join(vite.build.outDir, file.output)
            const { variables } = file;
            const content = render(await read(input, fileOpts), variables);
            mkdir(path.dirname(output), {recursive: true}, () => {
              /* Ideally we would use `emitFile` but it supports the */
              /* emission of a file based on basename alone. For our */
              /* case the directory should be used as well. This should */
              /* be improved. */
              writeFile(output, content, (err) => {
                if (!err) {
                  const relPath = output.replace(process.cwd()+'/', '')
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
