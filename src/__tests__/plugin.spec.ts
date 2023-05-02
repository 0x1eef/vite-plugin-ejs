import type { Plugin } from "vite";
import ejs from "../index";
import { describe, test, expect } from "vitest";

describe('vite-plugin-ejs', () => {
  const files = [ {input: "", output: "", variables: {} } ]

  test('the plugin name', () => {
    const plugin = ejs({files})
    expect(plugin.name).toEqual('ejs')
  })

  describe('the enforce option', () => {
    test('the default is "pre"', () => {
      const plugin = ejs({files})
      expect(plugin.enforce).toEqual('pre')
    })

    test('the option can be set to "post"', () => {
      const plugin = ejs({enforce: 'post', files})
      expect(plugin.enforce).toEqual('post')
    })
  })
})
