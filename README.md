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

## 说明

一个高阶组件，维护了多个`state`。

每一个元素是一个`Modal`，需要设置`key`，将会生成`show${key}Modal`、`${key}ModalVisible`、`hide${key}Modal`，并且除了`key`外的属性，都会在`createModalProps`对象上。

```js
@withModalState({
  modals: [
    {
      key: 'create',
    },
    {
      key: 'update',
    },
  ],
})
```
