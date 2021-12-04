export class ActivationContextManager {
    private readonly collection: string[] = [];
    push(context: string) {
        const activatedIndex = this.indexOf(context);
        const index = this.size();
        if (activatedIndex === -1) {
            this.collection.push(context);
        } else {
            const current = this.peak();
            if (context === current) {
                this.collection.push(context);
            } else {
                this.collection.splice(activatedIndex + 1, Infinity);
            }
        }
        const remove = () => {
            if (index >= this.size()) {
                return;
            }
            this.collection.splice(index, Infinity);
        };
        return remove;
    }
    indexOf(context: string) {
        return this.collection.indexOf(context);
    }
    pop() {
        return this.collection.pop();
    }
    peak(): string | undefined {
        return this.collection[this.collection.length - 1];
    }
    clear() {
        this.collection.length = 0;
    }
    size() {
        return this.collection.length;
    }
}
