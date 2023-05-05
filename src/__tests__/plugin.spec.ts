import ejs from '../index';
import { describe, test, expect } from 'vitest';

describe('vite-plugin-ejs', () => {
  const files = [ { input: '', output: '', variables: {} } ];

  test('the plugin name', () => {
    const plugin = ejs({ files });
    expect(plugin.name).toEqual('ejs');
  });

  describe('the enforce option', () => {
    test('the option default is "pre"', () => {
      const plugin = ejs({ files });
      expect(plugin.enforce).toEqual('pre');
    });

    test('the option can be set to "post"', () => {
      const plugin = ejs({ enforce: 'post', files });
      expect(plugin.enforce).toEqual('post');
    });
  });

  describe('the apply option', () => {
    test('the option default is undefined', () => {
      const plugin = ejs({ files });
      expect(plugin.apply).toBe(undefined);
    });

    test('the option can be set to "build"', () => {
      const plugin = ejs({ apply: 'build', files });
      expect(plugin.apply).toBe('build');
    });

    test('the option canbe set to "serve"', () => {
      const plugin = ejs({ apply: 'serve', files });
      expect(plugin.apply).toBe('serve');
    });
  });
});
