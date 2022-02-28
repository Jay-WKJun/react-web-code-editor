# 📇 Simple code editor

**A Simple and code-style Customizable web code editor with ⚛ React**

![example](./readmeAssets/TextareaExample.gif)

<h3>Try this Code Editor now! in CodeSandBox!</h3>

# ⚙️ Features

**🎉 Type the code just like VSCode**

- 🎨 Automatic Syntax highlighting
- 🌃 Dark-mode & You can customize your own syntax hightlight colors!
- 🗜 Indent line automatically, and also customizable!
- 🔒 Automatic parenthesis closing
- 🗞 Wrap selected text in parens

# 🏃 Let's get it Started!

### install

```
$ npm i react-code-editor
```

# 🙏 Contribute!

## 🎢 Comming up next! v2

## 🏋️‍♀️ Version Log

# 🗂 Document

Components designed to be customizable! (and it's keep upgrade to be more customizable and comfortable!)

## CodeEditor Component props

```typescript
interface CodeEditorProps {
  indent?: number
  mode?: themeList
  language?: lang
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: FontWeight
  className?: string
  interpolation?: FlattenSimpleInterpolation
}
```

- indent

set indent count.

it affects when auto indented (like bracket and enter to new line) or 'tab' to indent some line.

- mode

set the code editor theme.

you can use **'light'**, **'dark'** theme in default.

also! you can add your own theme! check below to how to add it!

-language

set the programming language.

syntax hightlight will follow the language you setted.

- width, height

set the code editor's width & height

- fontSize, fontWeight

set the code editor's fontSize & fontWeight

- className

set the code editor's className

you can inject your css style by className!

- interpolation

inject your css created by "styled-componens"

injected styles appllied to code editor Wrapper and override a styles.

## Customize Syntax Highlight colors

you can customize syntax hightlight colors!
