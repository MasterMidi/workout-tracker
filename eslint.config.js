// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat';
import jsdoc from 'eslint-plugin-jsdoc';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  jsdoc.configs['flat/recommended-typescript'],
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'jsdoc/require-jsdoc': [
        'warn', // Show a warning for missing documentation
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
            FunctionExpression: true,
          },
        },
      ],
    },
  },
]);
