import esbuild from 'esbuild';
import postCssPlugin from 'esbuild-style-plugin';

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

function compiler(options: {
  app?: string;
  buildKey?: string;
  mode?: 'production' | 'development';
  buildsDir: string;
}) {
  const buildKey = options.buildKey || 'develop';
  const mode = options.mode || 'production';

  const config: esbuild.BuildOptions = {
    entryPoints: [`${__dirname}/src/index.js`],
    bundle: true,
    platform: 'browser',
    plugins: [
      postCssPlugin({
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')],
        },
      }),
    ],
    outdir: `${options.buildsDir}/${buildKey}`,
    minify: false,
    loader: {
      '.ts': 'ts',
      '.tsx': 'tsx',
      '.js': 'ts',
      '.jsx': 'tsx',
      '.css': 'css',
      '.json': 'json',
    },
    treeShaking: true,
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    logLevel: 'silent',
    sourcemap: 'linked',
  };

  return {
    async run() {
      return esbuild.build(config);
    },
    async watch() {
      let buildStart = 0;
      return esbuild.build({
        ...config,
        watch: true,
        plugins: [
          ...(config.plugins || []),
          {
            name: 'watcher',
            setup: (build) => {
              build.onStart(() => {
                buildStart = Date.now();
              });
              build.onEnd((data) => {
                if (data.errors.length) {
                  console.log('BUILD ERRORS', data.errors);
                } else {
                  console.log('Build Took', Date.now() - buildStart);
                }
              });
            },
          },
        ],
      });
    },
    config,
  };
}

export default compiler;
