module.exports = {
  overrides: [
    {
      files: ['lib/**', 'stories/**', 'tests/**'],
      env: {
        node: false,
        browser: true,
        es2021: true,
      },
      extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
      },
      plugins: ['react'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        'react/display-name': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
};
