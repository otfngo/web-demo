import Observer from './observer.js';
import Compile from './compile.js';

export default class MVVM {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;

        if (this.$el) {
            new Observer(this.$data);
            this.proxyData(this.$data);
            new Compile(this.$el, this);
        }
    }

    proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key];
                },
                set(newValue) {
                    data[key] = newValue;
                }
            })
        })
    }
}