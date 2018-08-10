# with-modal-state

简化使用`Modal`的代码。

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
      showModal,
      hideModal
    } = this.props;
    console.log(this.props);
    return (
      <div>
        <Button onClick={showModal} style={{ marginRight: 10 }} type="primary">
          新增
        </Button>
        <Modal visible={visible} onCancel={hideModal}>
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
class Page extends React.Component {
  render() {
    const {
      createModalProps,
      showCreateModal,
      updateModalProps,
      showUpdateModal,
    } = this.props;
    return (
      <div>
        <Button style={{ marginRight: 10 }} onClick={showCreateModal} type="primary">
          新增
        </Button>
        <Button type="primary" onClick={showUpdateModal}>
          更新
        </Button>
        <Modal {...createModalProps}>
          <p>新增模态框</p>
        </Modal>
        <Modal {...updateModalProps}>
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
