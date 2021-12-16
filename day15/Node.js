export default class Node {

    constructor(weight) {
        this.weight = weight;
        this.cost = Infinity;
        this.predecessor = null;
    }
    
}