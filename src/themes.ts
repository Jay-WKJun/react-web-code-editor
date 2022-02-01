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
    `
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
    `
  },
};

interface ThemeProperties {
  backgroundColor: string
  caretColor: string
  textColor: string
  keywords: {
    comment: string
    prolog: string
    doctype: string
    cdata: string
    punctuation: string
    property: string
    tag: string
    constant: string
    symbol: string
    deleted: string
    boolean: string
    number: string
    selector: string
    ['attr-name']: string
    string: string
    char: string
    builtin: string
    inserted: string
    operator: string
    entity: string
    url: string
    ['language-css']: string
    style: string
    variable: string
    atrule: string
    ['attr-value']: string
    function: string
    ['class-name']: string
    keyword: string
    regex: string
    important: string
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
