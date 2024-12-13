import { prettyPrint } from "./helper.js";
import { Node } from "./Node.js";

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  rootNode(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor(start + (end - start) / 2);
    let newNode = new Node(array[mid]);

    newNode.left = this.rootNode(array, start, mid - 1);
    newNode.right = this.rootNode(array, mid + 1, end);

    return newNode;
  }

  buildTree(array) {
    // Sort array
    array.sort();
    // Remove duplicates
    array = [...new Set(array)];
    return this.rootNode(array, 0, array.length - 1);
  }
}

let newTree = new Tree([1, 4, 65, 0, 4, 2, 1, 0]);
prettyPrint(newTree.root);
