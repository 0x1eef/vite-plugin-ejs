import { PluginOption, ResolvedConfig } from "vite";
import { render } from 'ejs';
import path from 'path';
import fs from 'fs';

type Vite = {
  root: string, build: {outDir: string}
}

type File = {
  input: string,
  output: string
  variables: Record<string, string | Function | object>
}

type Options = {
  enforce?: "pre" | "post",
  apply?: "build" | "serve",
  files: File[]
}

type ReadFile = [string, object];
const readFile = async (...args: ReadFile): Promise<string> => {
  const [path, options] = args;
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      err ? reject(err) : resolve(data.toString());
    });
  });
};

export default function(options: Options): PluginOption {
  const { files } = options
  const vite: Vite = {root: "", build: {outDir: ""}};
  const fileOpts = { encoding: 'utf-8' };
  const watched: Set<string> = new Set(...(function() {
    const inputs = []
    for (const k in Object.keys(files)) {
      inputs.push(files[k].input);
    }
    return inputs;
  })());

  return {
    name: 'ejs',
    enforce: options.enforce || "pre",
    apply: options.apply,
    buildStart() {
      watched.forEach((input) => {
        this.addWatchFile(path.join(vite.root, input))
      });
    },
    async generateBundle(_options, _bundle): Promise<void> {
      try {
        for (const k in Object.keys(files)) {
          const file = files[k]
          const input = path.join(vite.root, file.input)
          const { variables } = file
          const text = render(await readFile(input, fileOpts), variables)
          this.emitFile({type: 'asset', fileName: file.output, source: text})
        }
      } catch (error: any) {
        this.error(error)
      }
    },
    configResolved(resolvedConfig: ResolvedConfig) {
      Object.assign(vite, resolvedConfig)
    },
  }
}
