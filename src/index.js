import React from 'react';

function createVisibleKey(key) {
    return key ? `${key}ModalVisible` : 'visible';
}

function createMethodKey(key) {
    const methodKey = key ? key[0].toUpperCase() + key.slice(1) : '';
    return {
        show: `show${methodKey}Modal`,
        hide: `hide${methodKey}Modal`,
    };
}

function createMethods(key, setState) {
    const visibleKey = createVisibleKey(key);
    const { show, hide } = createMethodKey(key);
    return {
        [show]: function showModal() {
            console.log('show modal', visibleKey);
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

function initializeState(modals) {
    return modals.reduce((prev, key) => {
        const visibleKey = createVisibleKey(key);

        return {
            ...prev,
            [visibleKey]: false,
        };
    }, {});
}

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

