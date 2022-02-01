interface ThemeStyle {
  backgroundColor: string
  caretColor: string
  textColor: string
  keywords: string
}

interface Themes {
  [key: string]: ThemeStyle
}

const themes: Themes = {
  dark: {
    backgroundColor: '#272822',
    caretColor: 'white',
    textColor: 'white',
    keywords: `
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #8292a2;
      }

      .token.punctuation {
        color: #f8f8f2;
      }

      .token.namespace {
        opacity: .7;
      }

      .token.property,
      .token.tag,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: #f92672;
      }

      .token.boolean,
      .token.number {
        color: #ae81ff;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #a6e22e;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string,
      .token.variable {
        color: #f8f8f2;
      }

      .token.atrule,
      .token.attr-value,
      .token.function,
      .token.class-name {
        color: #e6db74;
      }

      .token.keyword {
        color: #66d9ef;
      }

      .token.regex,
      .token.important {
        color: #fd971f;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    `,
  },
  light: {
    backgroundColor: 'white',
    caretColor: 'black',
    textColor: 'black',
    keywords: `
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: slategray;
      }

      .token.punctuation {
        color: #999;
      }

      .token.namespace {
        opacity: .7;
      }

      .token.property,
      .token.tag,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: #905;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #690;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: #9a6e3a;
      }

      .token.atrule,
      .token.attr-value,
      .token.keyword {
        color: #07a;
      }

      .token.function,
      .token.class-name {
        color: #DD4A68;
      }

      .token.regex,
      .token.important,
      .token.variable {
        color: #e90;
      }

      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }
    `,
  },
};

type CssColorLiterals = 'AliceBlue' | 'AntiqueWhite' | 'Aqua' | 'Aquamarine' | 'Azure'
  | 'Beige' | 'Bisque' | 'Black' | 'BlanchedAlmond' | 'Blue' | 'BlueViolet' | 'Brown'
  | 'BurlyWood' | 'CadetBlue' | 'Chartreuse' | 'Chocolate' | 'Coral' | 'CornflowerBlue'
  | 'Cornsilk' | 'Crimson' | 'Cyan' | 'DarkBlue' | 'DarkCyan' | 'DarkGoldenRod'
  | 'DarkGray' | 'DarkGrey' | 'DarkGreen' | 'DarkKhaki' | 'DarkMagenta' | 'DarkOliveGreen'
  | 'DarkOrange' | 'DarkOrchid' | 'DarkRed' | 'DarkSalmon' | 'DarkSeaGreen' | 'DarkSlateBlue'
  | 'DarkSlateGray' | 'DarkSlateGrey' | 'DarkTurquoise' | 'DarkViolet' | 'DeepPink'
  | 'DeepSkyBlue' | 'DimGray' | 'DimGrey' | 'DodgerBlue' | 'FireBrick' | 'FloralWhite'
  | 'ForestGreen' | 'Fuchsia' | 'Gainsboro' | 'GhostWhite' | 'Gold' | 'GoldenRod'
  | 'Gray' | 'Grey' | 'Green' | 'GreenYellow' | 'HoneyDew' | 'HotPink' | 'IndianRed'
  | 'Indigo' | 'Ivory' | 'Khaki' | 'Lavender' | 'LavenderBlush' | 'LawnGreen' | 'LemonChiffon'
  | 'LightBlue' | 'LightCoral' | 'LightCyan' | 'LightGoldenRodYellow' | 'LightGray'
  | 'LightGrey' | 'LightGreen' | 'LightPink' | 'LightSalmon' | 'LightSeaGreen' | 'LightSkyBlue'
  | 'LightSlateGray' | 'LightSlateGrey' | 'LightSteelBlue' | 'LightYellow' | 'Lime'
  | 'LimeGreen' | 'Linen' | 'Magenta' | 'Maroon' | 'MediumAquaMarine' | 'MediumBlue'
  | 'MediumOrchid' | 'MediumPurple' | 'MediumSeaGreen' | 'MediumSlateBlue'
  | 'MediumSpringGreen' | 'MediumTurquoise' | 'MediumVioletRed' | 'MidnightBlue'
  | 'MintCream' | 'MistyRose' | 'Moccasin' | 'NavajoWhite' | 'Navy' | 'OldLace'
  | 'Olive' | 'OliveDrab' | 'Orange' | 'OrangeRed' | 'Orchid' | 'PaleGoldenRod'
  | 'PaleGreen' | 'PaleTurquoise' | 'PaleVioletRed' | 'PapayaWhip' | 'PeachPuff'
  | 'Peru' | 'Pink' | 'Plum' | 'PowderBlue' | 'Purple' | 'RebeccaPurple' | 'Red'
  | 'RosyBrown' | 'RoyalBlue' | 'SaddleBrown' | 'Salmon' | 'SandyBrown' | 'SeaGreen'
  | 'SeaShell' | 'Sienna' | 'Silver' | 'SkyBlue' | 'SlateBlue' | 'SlateGray' | 'SlateGrey'
  | 'Snow' | 'SpringGreen' | 'SteelBlue' | 'Tan' | 'Teal' | 'Thistle' | 'Tomato'
  | 'Turquoise' | 'Violet' | 'Wheat' | 'White' | 'WhiteSmoke' | 'Yellow' | 'YellowGreen';
type HexColorCode = `#${number}`;
type RGBColorCode = `rgb(${number},${number},${number})`;

interface ThemeProperties {
  backgroundColor: HexColorCode | RGBColorCode | CssColorLiterals
  caretColor: HexColorCode | RGBColorCode | CssColorLiterals
  textColor: HexColorCode | RGBColorCode | CssColorLiterals
  keywords: {
    comment: HexColorCode | RGBColorCode | CssColorLiterals
    prolog: HexColorCode | RGBColorCode | CssColorLiterals
    doctype: HexColorCode | RGBColorCode | CssColorLiterals
    cdata: HexColorCode | RGBColorCode | CssColorLiterals
    punctuation: HexColorCode | RGBColorCode | CssColorLiterals
    property: HexColorCode | RGBColorCode | CssColorLiterals
    tag: HexColorCode | RGBColorCode | CssColorLiterals
    constant: HexColorCode | RGBColorCode | CssColorLiterals
    symbol: HexColorCode | RGBColorCode | CssColorLiterals
    deleted: HexColorCode | RGBColorCode | CssColorLiterals
    boolean: HexColorCode | RGBColorCode | CssColorLiterals
    number: HexColorCode | RGBColorCode | CssColorLiterals
    selector: HexColorCode | RGBColorCode | CssColorLiterals
    ['attr-name']: HexColorCode | RGBColorCode | CssColorLiterals
    string: HexColorCode | RGBColorCode | CssColorLiterals
    char: HexColorCode | RGBColorCode | CssColorLiterals
    builtin: HexColorCode | RGBColorCode | CssColorLiterals
    inserted: HexColorCode | RGBColorCode | CssColorLiterals
    operator: HexColorCode | RGBColorCode | CssColorLiterals
    entity: HexColorCode | RGBColorCode | CssColorLiterals
    url: HexColorCode | RGBColorCode | CssColorLiterals
    ['language-css']: HexColorCode | RGBColorCode | CssColorLiterals
    style: HexColorCode | RGBColorCode | CssColorLiterals
    variable: HexColorCode | RGBColorCode | CssColorLiterals
    atrule: HexColorCode | RGBColorCode | CssColorLiterals
    ['attr-value']: HexColorCode | RGBColorCode | CssColorLiterals
    function: HexColorCode | RGBColorCode | CssColorLiterals
    ['class-name']: HexColorCode | RGBColorCode | CssColorLiterals
    keyword: HexColorCode | RGBColorCode | CssColorLiterals
    regex: HexColorCode | RGBColorCode | CssColorLiterals
    important: HexColorCode | RGBColorCode | CssColorLiterals
  }
}

function createThemeStyle(themeProperties: ThemeProperties): ThemeStyle {
  const newTheme: ThemeStyle = {
    backgroundColor: 'white',
    caretColor: 'black',
    textColor: 'black',
    keywords: '',
  };

  newTheme.backgroundColor = themeProperties.backgroundColor;
  newTheme.caretColor = themeProperties.caretColor;
  newTheme.textColor = themeProperties.textColor;
  let keywords = '';

  Object.entries(themeProperties.keywords).forEach(([key, value]) => {
    keywords = keywords.concat(`.token.${key} { color: ${value} }`);
  });

  keywords = keywords.concat(`
    .language-css .token.string,
    .style .token.string {
      ${themeProperties.keywords['language-css']
      || themeProperties.keywords.style}
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }
  `);

  newTheme.keywords = keywords;

  return newTheme;
}

export function addTheme(themeName: string, themeProperties: ThemeProperties) {
  themes[themeName] = createThemeStyle(themeProperties);
}

export default themes;
