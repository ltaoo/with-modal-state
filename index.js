import React from 'react';

export default function withModalState(options = {}) {
  let { modals } = options;
  function createVisibleKey(key) {
    return key ? `${key}ModalVisible` : 'visible';
  }
  function createMethodKey(key) {
    const methodKey = key ? key[0].toUpperCase() + key.slice(1) : '';
    return {
      show: `show${methodKey}Modal`,
      hide: `hide${methodKey}Modal`
    };
  }
  function createMethods(key, ref) {
    const visibleKey = createVisibleKey(key);
    const { show, hide } = createMethodKey(key);
    return {
      [show]: function showModal() {
        ref.setState(
          {
            [visibleKey]: true
          },
          () => {}
        );
      },
      [hide]: function hideModal() {
        ref.setState({
          [visibleKey]: false
        });
      }
    };
  }
  function createModalProps(key, props, ref) {
    const visibleKey = createVisibleKey(key);
    const { show, hide } = createMethodKey(key);
    return {
      [`${key}ModalProps`]: {
        get visible() {
          return ref.state[visibleKey];
        },
        onOk: ref.methods[show],
        onCancel: ref.methods[hide],
        ...props
      }
    };
  }
  return Component => {
    return class withModalComponent extends React.PureComponent {
      constructor(props) {
        super(props);
        this.methods = {};
        this.modalProps = {};
        this.state = {};
        if (!modals) {
          modals = [{ key: '' }];
        }
        let state = {};
        state = modals.reduce((prev, next) => {
          const { key, ...restProps } = next;
          const visibleKey = createVisibleKey(key);
          const res = { ...prev };
          res[visibleKey] = false;

          // 在这里创建方法
          this.methods = {
            ...this.methods,
            ...createMethods(key, this)
          };
          this.modalProps = {
            ...this.modalProps,
            ...createModalProps(key, restProps, this)
          };
          return res;
        }, {});
        this.state = state;
      }

      render() {
        return (
          <Component
            {...this.state}
            {...this.methods}
            {...this.modalProps}
            {...this.props}
          />
        );
      }
    };
  };
}