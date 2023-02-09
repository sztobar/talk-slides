export const transform: Transform = (fileInfo, api, options) => {
  const { jscodeshift: j } = api;

  return j(fileInfo.source)
    .find(styledSystemImportWithThemeGet)
    .replaceWith(styledSystemImportWithoutThemeGet)
    .insertAfter(styledSystemThemeGetImport)
    .toSource();
};
