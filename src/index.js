import React from 'react';

/**
 * @param {string} key 
 * @return {string}
 */
function createVisibleKey(key) {
    return key ? `${key}ModalVisible` : 'visible';
}

/**
 * interface MethodNames {
 *   show: string;
 *   hide: string;
 * }
 * @param {string} key 
 * @return {MethodNames}
 */
function createMethodKey(key) {
    const methodKey = key ? key[0].toUpperCase() + key.slice(1) : '';
    return {
        show: `show${methodKey}Modal`,
        hide: `hide${methodKey}Modal`,
    };
}

/**
 * interface initialState {
 *   [key: string]: false;
 * }
 * @param {Array<Key>} modals 
 * @return {InitialState}
 */
function initializeState(modals) {
    return modals.reduce((prev, key) => {
        const visibleKey = createVisibleKey(key);

        return {
            ...prev,
            [visibleKey]: false,
        };
    }, {});
}

/**
 * 
 * @param {string} key 
 * @param {function} setState 
 */
function createMethods(key, setState) {
    const visibleKey = createVisibleKey(key);
    const { show, hide } = createMethodKey(key);
    return {
        [show]: function showModal() {
            setState(
                {
                    [visibleKey]: true,
                },
                () => {},
            );
        },
        [hide]: function hideModal() {
            setState({
                [visibleKey]: false,
            });
        },
    };
}

/**
 * interface Methods {
 *   [method: string]: function;
 * }
 * @param {Array<Key>} modals 
 * @param {function} setState - 被包裹的组件实例
 * @return {Methods}
 */
function initializeMethods(modals, setState) {
    return modals.reduce((prev, key) => ({
        ...prev,
        ...createMethods(key, setState),
    }), {});
}

const componentRef = '__CONNECTED_COMPONENT_REF__';

export default function withModalState(modals = ['']) {
    return Component => class modalStateWrapper extends React.PureComponent {
        constructor(props) {
            super(props);

            this.state = initializeState(modals);
            /* eslint-disable no-param-reassign */
            Component.prototype.state = this.state;
        }

        componentDidMount() {
            function findInnerComponent(instance) {
                // recursively find inner most 'real react component'
                // allowing multiple decorators
                if (instance.refs[componentRef]) {
                    return findInnerComponent(instance.refs[componentRef]);
                }
                return instance;
            }
            /* eslint-disable react/no-string-refs */
            const componentInstance = findInnerComponent(this.refs[componentRef]);

            const setStateFunc = (...params) => {
                componentInstance.setState(...params);
            };

            const methods = initializeMethods(modals, setStateFunc);
            Object.assign(Component.prototype, methods);
            this.forceUpdate();
        }

        render() {
            return React.createElement(Component, {
                ref: componentRef,
                ...this.props,
            });
        }
    };
}
