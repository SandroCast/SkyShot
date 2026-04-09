import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'src/lib/codegenNativeComponent.js'),
        'react-native/Libraries/Renderer/shims/ReactNative': 'react-native-web/dist/index',
        'react-native/Libraries/Image/AssetRegistry': 'react-native-web/dist/modules/AssetRegistry',
        'react-native': 'react-native-web',
      },
      extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
