import { remove } from '../util/index';

let uid = 0;

export default class Dep {
    static target;

    constructor () {
        this.id = uid++;
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    removeSub (sub) {
        remove(this.subs, sub);
    }

    depend () {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    }

    notify () {
        const subs = this.subs.slice();
        for (let i = 0, len = subs.length; i < len; i++) {
            subs[i].update();
        }
    }
}