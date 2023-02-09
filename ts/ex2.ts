import {
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Transform,
} from 'jscodeshift';

const transform: Transform = (fileInfo, api) => {
  const { jscodeshift: j } = api;

  return j(fileInfo.source)
    .find(j.ImportDeclaration, {
      source: { value: 'styled-system' },
      specifiers: (specifiers) =>
        specifiers?.some(isThemeGetImportSpecifier) ?? false,
    })
    .replaceWith(({ node }) => {
      const specifiersExceptThemeGet =
        node.specifiers?.filter(
          (specifier) => !isThemeGetImportSpecifier(specifier)
        ) ?? [];

      return specifiersExceptThemeGet.length > 0
        ? j.importDeclaration(
            specifiersExceptThemeGet,
            node.source,
            node.importKind
          )
        : null;
    })
    .insertAfter(
      j.template.statement`import { theme-get } from '@styled-system/theme-get'`
    )
    .toSource();
};

const isThemeGetImportSpecifier = (
  specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
) => {
  if (specifier.type === 'ImportSpecifier') {
    return specifier.imported.name === 'themeGet';
  }
  return false;
};

export default transform;
