export default class Node {

    constructor(weight, nodeI, nodeJ) {
        this.weight = weight;
        this.cost = Infinity;
        this.predecessor = null;
        this.i = nodeI;
        this.j = nodeJ;
    }
    
}