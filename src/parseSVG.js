// src/utils/parseSVG.js

/**
 * Parses the provided SVG JSX string to extract path data.
 * @param {string} svgString - The SVG content as a JSX string.
 * @returns {Array<Object>} An array of objects, where each object contains the path 'd' attribute, 'style', and 'transform'.
 */
const parseSVG = (svgString) => {
  const paths = [];

  // This is a simple regex to find all <path ... /> elements.
  // It captures the d, style, and transform attributes.
  const pathRegex =
    /<path\s+[^>]*d="([^"]+)"[^>]*style="([^"]+)"[^>]*transform="([^"]+)"[^>]*\/>/g;
  let match;

  while ((match = pathRegex.exec(svgString)) !== null) {
    const [, d, style, transform] = match;

    // Parse the style string into a JavaScript object
    const styleObj = {};
    style.split(";").forEach((stylePart) => {
      const [key, value] = stylePart.split(":");
      if (key && value) {
        // Convert camelCase for JSX
        const camelCaseKey = key
          .trim()
          .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styleObj[camelCaseKey] = value.trim();
      }
    });

    paths.push({
      d,
      style: styleObj,
      transform,
    });
  }

  return svgString;
};

export default parseSVG;
