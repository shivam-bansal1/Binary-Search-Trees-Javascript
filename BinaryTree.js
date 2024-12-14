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

  insert(value) {
    let newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this.root;
    }

    let parentNode = null;
    let currentNode = this.root;

    while (currentNode !== null) {
      parentNode = currentNode;
      if (value == currentNode.data) {
        return this.root;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }
    }

    if (value > parentNode.data) {
      parentNode.right = newNode;
    } else {
      parentNode.left = newNode;
    }

    return this.root;
  }

  deleteItem(value, currentNode = this.root, parentNode = null) {
    if (currentNode === null) {
      console.log(`${value} not found in the tree.`);
      return this.root;
    }

    if (value < currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left, currentNode);
    } else if (value > currentNode.data) {
      currentNode.right = this.deleteItem(
        value,
        currentNode.right,
        currentNode
      );
    } else {
      // Handling 3 different cases
      // Node is a leaf node
      if (!currentNode.left && !currentNode.right) {
        return null;
      }
      // Node has both left and right subtree
      else if (currentNode.left && currentNode.right) {
        const successor = this.findMinValueNode(currentNode.right);
        currentNode.data = successor.data;
        currentNode.right = this.deleteItem(
          successor.data,
          currentNode.right,
          currentNode
        );
      }
      // Node has either left or right subtree
      else {
        return currentNode.left || currentNode.right;
      }
    }

    return currentNode;
  }

  findMinValueNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }
}

let newTree = new Tree([]);
newTree.insert(45);
newTree.insert(15);
newTree.insert(79);
newTree.insert(90);
newTree.insert(10);
newTree.insert(55);
newTree.insert(20);
newTree.insert(50);
newTree.insert(100);
newTree.insert(2);
prettyPrint(newTree.root);
newTree.deleteItem(100);
prettyPrint(newTree.root);
