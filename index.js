import { Tree } from "./BinaryTree.js";
import { prettyPrint } from "./helper.js";

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function callback(value) {
  process.stdout.write(`${value} -> `);
}

const tree = new Tree(generateArray(20));
console.log(tree.isBalanced());

console.log(tree.levelOrderIterative(callback));
console.log(tree.levelOrderRecursive(callback));
console.log(tree.inOrder(callback));
console.log(tree.preOrder(callback));
console.log(tree.postOrder(callback));

tree.insert(300);
tree.insert(400);
tree.insert(500);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.levelOrderIterative(callback));
console.log(tree.levelOrderRecursive(callback));
console.log(tree.inOrder(callback));
console.log(tree.preOrder(callback));
console.log(tree.postOrder(callback));

prettyPrint(tree.root);
