export class Disposable {
    private destructors: Array<() => void> = [];
    record(destructor: () => void) {
        const index = this.destructors.indexOf(destructor);
        if (index === -1) {
            this.destructors.push(destructor);
        }
        return () => {
            const index = this.destructors.indexOf(destructor);
            if (index > -1) {
                this.destructors.splice(index, 1);
            }
        };
    }
    destroy() {
        this.destructors.forEach(it => {
            it();
        });
        this.destructors.length = 0;
    }
}
