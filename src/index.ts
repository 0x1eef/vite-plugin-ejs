import { PluginOption, ResolvedConfig } from "vite";
import { render } from 'ejs';
import path from 'path';
import fs from 'fs';

type ReadFile = [string, object];
const readFile = async (...args: ReadFile) => {
  const [path, options] = args;
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

type WriteFile = [string, string,  object];
const writeFile = async (...args: WriteFile): Promise<void> => {
  const [path, text, options] = args;
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, options || {}, (err: Error) => {
      err ? reject(err) : resolve();
    });
  });
};

type File = {
  input: string,
  output: string
  variables: Record<string, string | Function | object>
}

type Vite = {
  root: string, build: {outDir: string}
}

export default function(...files: File[]): PluginOption {
  const vite: Vite = {root: "", build: {outDir: ""}};
  const fileOpts = { encoding: 'utf-8' };

  return {
    name: 'ejs',
    enforce: 'pre',
    async generateBundle(_options, _bundle): Promise<void> {
      try {
        for (const k in Object.keys(files)) {
          const file = files[k]
          const input = path.join(vite.root, file.input)
          const { variables } = file
          const text = await render(await readFile(input, fileOpts), variables)
          const output = path.join(vite.root, vite.build.outDir, file.output)
          await writeFile(output, text, fileOpts);
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
