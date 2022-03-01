# 📇 React Web Code-editor

**A Simple and code-style Customizable web code editor with ⚛ React**

<div style="display: flex; justify-content: space-between;">
  <img src=./readmeAssets/demo_darkmode.gif style="width: 47%; border: 1px solid white; border-radius: 5px; box-sizing: border-box;"/>
  <img src=./readmeAssets/demo_lightmode.gif style="width: 47%; border: 1px solid black; border-radius: 5px; box-sizing: border-box;"/>
</div>

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
$ npm i react-web-code-editor
```

### implement & use

```tsx
import React from 'react';
import CodeEditor from 'react-web-code-editor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CodeEditor
          theme="light"
          language="javascript"
          indent={2}
          width='210px'
          height='210px'
          fontSize='14px'
          fontWeight='bold'
          className=''
          ref={null}
          interpolation={null}
        />
      </header>
    </div>
  );
}

export default App;
```

# 🙏 Contribute!

## 🎢 Comming up next! v2

## 🏋️‍♀️ Version Log

# 🗂 Document

- **Component props**
- **How to create custom theme**

## CodeEditor Component props

```typescript
interface CodeEditorProps {
  indent?: number
  theme?: themeList
  language?: lang
  width?: string
  height?: string
  fontSize?: string
  fontWeight?: FontWeight
  className?: string
  interpolation?: FlattenSimpleInterpolation
}
```

### indent

set indent count.

it affects when auto indented (like bracket and enter to new line) or 'tab' to indent some line.

### theme

set the code editor theme.

you can use **'light'**, **'dark'** theme in default.

also! you can add your own theme! check below to how to add it!

### language

set the programming language.

syntax hightlight will follow the language you setted.

### width, height

set the code editor's width & height

### fontSize, fontWeight

set the code editor's fontSize & fontWeight

### className

set the code editor's className

you can inject your css style by className!

### interpolation

inject your css created by "styled-componens"

injected styles appllied to code editor Wrapper and override a styles.

## Customize Syntax Highlight colors

you can customize syntax hightlight colors!
