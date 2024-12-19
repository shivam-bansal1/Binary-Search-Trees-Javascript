import { Node } from "./Node.js";

export class Tree {
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
    let copiedArray = [...array];
    // arrow function required so that it does not sort lexographically
    copiedArray.sort((a, b) => a - b);
    copiedArray = [...new Set(copiedArray)];
    return this.rootNode(copiedArray, 0, copiedArray.length - 1);
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

  find(value) {
    if (!this.root) return null;
    let node = this.root;

    while (node) {
      if (value == node.data) return node;
      else if (value < node.data) node = node.left;
      else node = node.right;
    }

    console.log(`${value} does not exists.`);
    return null;
  }

  levelOrderIterative(callback) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }

    if (typeof callback !== "function") {
      throw new Error("Callback is not a function!");
    }
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
      callback(currentNode.data);
    }
  }

  levelOrderRecursive(callback, queue = [this.root]) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }

    if (typeof callback !== "function") {
      throw new Error("Callback is not a function!");
    }
    // Base Case
    if (queue.length === 0) {
      return;
    }

    let currentNode = queue.shift();
    callback(currentNode.data);

    if (currentNode.left) queue.push(currentNode.left);
    if (currentNode.right) queue.push(currentNode.right);

    this.levelOrderRecursive(callback, queue);
  }

  inOrder(callback, node = this.root) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }
    if (typeof callback !== "function") {
      throw new Error("Callback is not a function!!");
    }

    if (!node) return;

    if (node.left) this.inOrder(callback, node.left);
    callback(node.data);
    if (node.right) this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }
    if (typeof callback !== "function") {
      throw new Error("Callback is not a function!!");
    }

    if (!node) return;

    callback(node.data);
    if (node.left) this.preOrder(callback, node.left);
    if (node.right) this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }
    if (typeof callback !== "function") {
      throw new Error("Callback is not a function!!");
    }
    if (!node) return;

    if (node.left) this.postOrder(callback, node.left);
    if (node.right) this.postOrder(callback, node.right);
    callback(node.data);
  }

  height(node = this.root) {
    if (!node) return -1;

    let lHeight = this.height(node.left);
    let rHeight = this.height(node.right);

    return 1 + Math.max(lHeight, rHeight);
  }

  depth(node, currentNode = this.root) {
    if (!node || !currentNode) return -1;
    if (currentNode === node) return 0;

    if (node.data > currentNode.data) {
      let rightDepth = this.depth(node, currentNode.right);
      return rightDepth === -1 ? -1 : 1 + rightDepth;
    } else {
      let leftDepth = this.depth(node, currentNode.left);
      return leftDepth === -1 ? -1 : 1 + leftDepth;
    }
  }

  isBalanced(node = this.root) {
    if (!this.root) {
      console.log("Tree is empty!");
      return;
    }
    if (!node) {
      return true;
    }

    let leftSubtreeHeight = this.height(node.left);
    let rightSubtreeHeight = this.height(node.right);
    let heightDifference = Math.abs(leftSubtreeHeight - rightSubtreeHeight);

    return (
      heightDifference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    if (!this.root) {
      console.log("Tree is empty !");
      return;
    }

    let newSortedArray = [];
    this.inOrder((value) => {
      newSortedArray.push(value);
    });
    console.log("Calling buildTree function now");
    this.root = this.buildTree(newSortedArray);
  }
}
