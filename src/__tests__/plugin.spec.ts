import ejs from '../index';
import { describe, test, expect } from 'vitest';

describe('vite-plugin-ejs', () => {
  const targets = [ { src: '', dest: '', variables: {} } ];

  test('the plugin name', () => {
    const plugin = ejs({ targets });
    expect(plugin.name).toEqual('ejs');
  });

  describe('the enforce option', () => {
    test('the option default is "pre"', () => {
      const plugin = ejs({ targets });
      expect(plugin.enforce).toEqual('pre');
    });

    test('the option can be set to "post"', () => {
      const plugin = ejs({ enforce: 'post', targets });
      expect(plugin.enforce).toEqual('post');
    });
  });

  describe('the apply option', () => {
    test('the option default is undefined', () => {
      const plugin = ejs({ targets });
      expect(plugin.apply).toBe(undefined);
    });

    test('the option can be set to "build"', () => {
      const plugin = ejs({ apply: 'build', targets });
      expect(plugin.apply).toBe('build');
    });

    test('the option can be set to "serve"', () => {
      const plugin = ejs({ apply: 'serve', targets });
      expect(plugin.apply).toBe('serve');
    });
  });
});
