# with-modal-state

页面中如果有许多 `Modal` 组件，为了比较好的语义，会出现 `showModal`、`hideModal` 这类模板代码，该组件将这些模板代码放到高阶组件中维护，业务代码不需要再写这些重复性非常高的代码了。

## 使用

```
yarn add with-modal-state
```

### 基本使用

```js
import React from 'react';
import {
  Modal,
  Button,
} from 'antd';
import withModalState from 'with-modal-state';

@withModalState()
class Page extends React.Component {
  render() {
    const {
      visible,
    } = this.state;
    return (
      <div>
        <Button
          onClick={this.showModal}
          style={{ marginRight: 10 }}
          type="primary"
        >
          新增
        </Button>
        <Modal
          visible={visible}
          onCancel={hideModal}
        >
          <p>新增模态框</p>
        </Modal>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <Page />;
  }
}

ReactDOM.render(<App />, document.getElementById('container'));
```

### 多个模态框

```js
@withModalState([
  'create',
  'update',
])
class Page extends React.Component {
  render() {
    const {
      createModalVisible,
      updateModalVisible,
    } = this.state;
    return (
      <div>
        <Button
          style={{ marginRight: 10 }}
          onClick={this.showCreateModal}
          type="primary"
        >
          新增
        </Button>
        <Button
          type="primary"
          onClick={this.showUpdateModal}
        >
          更新
        </Button>
        <Modal
          visible={createModalVisible}
          onCancel={this.hideCreateModal}
        >
          <p>新增模态框</p>
        </Modal>
        <Modal
          visible={updateModalVisible}
          onCancel={this.hideUpdateModal}
        >
          <p>更新模态框</p>
        </Modal>
      </div>
    );
  }
}
```

### 支持回调

```js
@withModalState()
class Page extends React.Component {
  prepareAdd = () => {
    this.showModal(() => {
      // 打开模态框后做一些事情
    });
  }
  render() {
    const {
      visible,
    } = this.state;
    return (
      <div>
        <Button
          onClick={this.prepareAdd}
          style={{ marginRight: 10 }}
          type="primary"
        >
          新增
        </Button>
        <Modal
          visible={visible}
          onCancel={hideModal}
        >
          <p>新增模态框</p>
        </Modal>
      </div>
    );
  }
}
```

## 注意事项
如果有多个装饰器，`withModal` 装饰器必须放在最后面。

## 说明
代码其实非常简单，直接拷贝到项目中使用也可以，但需要有如下 `babel` 插件

```js
"@babel/plugin-transform-template-literals",
"@babel/plugin-transform-arrow-functions",
"@babel/plugin-transform-classes",
"@babel/plugin-transform-shorthand-properties",
"@babel/plugin-transform-computed-properties",
"@babel/plugin-transform-parameters",
"@babel/plugin-transform-destructuring",
"@babel/plugin-proposal-object-rest-spread",
"@babel/plugin-transform-block-scoping",
"@babel/plugin-transform-spread",
```
